import { NextRequest, NextResponse } from "next/server";
import { saveSubmission } from "./save-submission";

// ClickUp API configuration
// NOTE: For production, use environment variables. Personal API Token is recommended over OAuth2 for server-to-server.
const CLICKUP_API_TOKEN = process.env.CLICKUP_API_TOKEN;
const CLICKUP_CLIENT_ID = process.env.CLICKUP_CLIENT_ID;
const CLICKUP_CLIENT_SECRET = process.env.CLICKUP_CLIENT_SECRET;
const CLICKUP_FOLDER_ID = process.env.CLICKUP_FOLDER_ID || "90174958415";

/**
 * Get ClickUp access token
 * Priority: Personal API Token (recommended for server-to-server)
 * 
 * To get a Personal API Token:
 * 1. Go to ClickUp Settings > Apps > API
 * 2. Generate a Personal Token
 * 3. Add it to your .env file as CLICKUP_API_TOKEN
 */
async function getClickUpAccessToken(): Promise<string> {
  // Personal API Token is the recommended approach for server-to-server
  if (CLICKUP_API_TOKEN) {
    return CLICKUP_API_TOKEN;
  }

  // If no token, check if client credentials are provided (for OAuth2)
  if (!CLICKUP_CLIENT_ID || !CLICKUP_CLIENT_SECRET) {
    throw new Error(
      "ClickUp API Token or Client ID/Secret not configured. " +
      "Please set CLICKUP_API_TOKEN in your environment variables. " +
      "Get your token from: ClickUp Settings > Apps > API"
    );
  }

  // Note: ClickUp OAuth2 typically requires user authorization flow, not client credentials
  // This is a fallback attempt, but Personal API Token is strongly recommended
  try {
    const response = await fetch("https://api.clickup.com/api/v2/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: CLICKUP_CLIENT_ID,
        client_secret: CLICKUP_CLIENT_SECRET,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `OAuth2 failed. Please use a Personal API Token instead. ` +
        `Error: ${JSON.stringify(errorData)}`
      );
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error getting ClickUp access token:", error);
    throw error;
  }
}

/**
 * Create a document in ClickUp folder
 */
async function createClickUpDocument(
  accessToken: string,
  formData: {
    fullName: string;
    companyName: string;
    email: string;
    phoneNumber: string;
    website: string;
    services: string[];
    serviceDescription?: string;
    budget?: string;
  }
): Promise<any> {
  // Format services as a readable list
  const servicesList = Array.isArray(formData.services)
    ? formData.services.join("\n- ")
    : formData.services;

  // Format the document content
  let documentContent = `**New Call Request - ${formData.fullName}**

**Contact Information:**
- **Name:** ${formData.fullName}
- **Company:** ${formData.companyName}
- **Email:** ${formData.email}
- **Phone:** ${formData.phoneNumber}
- **Website:** ${formData.website || "Not provided"}

**Selected Services:**
- ${servicesList}
`;

  // Add service description if provided
  if (formData.serviceDescription && formData.serviceDescription.trim()) {
    documentContent += `\n**Service Description:**\n${formData.serviceDescription}\n`;
  }

  // Add budget if provided
  if (formData.budget && formData.budget.trim()) {
    documentContent += `\n**Budget:** ${formData.budget}\n`;
  }

  documentContent += `\n**Submitted At:** ${new Date().toLocaleString()}`;

  const documentName = `New Call Request - ${formData.fullName} - ${formData.companyName}`;

  try {
    const response = await fetch(
      `https://api.clickup.com/api/v2/folder/${CLICKUP_FOLDER_ID}/doc`,
      {
        method: "POST",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: documentName,
          content: documentContent,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to create ClickUp document: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating ClickUp document:", error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, companyName, email, phoneNumber, website, services, serviceDescription, budget } = body;

    // Validate required fields
    if (!fullName || !companyName || !email || !phoneNumber) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!services || services.length === 0) {
      return NextResponse.json(
        { error: "At least one service must be selected" },
        { status: 400 }
      );
    }

    // Format the submission data
    const submissionData = {
      fullName,
      companyName,
      email,
      phoneNumber,
      website: website || "Not provided",
      services: Array.isArray(services) ? services : [services],
      serviceDescription: serviceDescription || "",
      budget: budget || "",
      submittedAt: new Date().toISOString(),
    };

    // Log the submission
    console.log("=== NEW BOOKING SUBMISSION ===");
    console.log(JSON.stringify(submissionData, null, 2));
    console.log("=============================");

    // Save submission to local storage for admin panel
    try {
      await saveSubmission({
        fullName: submissionData.fullName,
        companyName: submissionData.companyName,
        email: submissionData.email,
        phoneNumber: submissionData.phoneNumber,
        website: submissionData.website,
        services: submissionData.services,
        serviceDescription: submissionData.serviceDescription,
        budget: submissionData.budget,
        submittedAt: submissionData.submittedAt,
      });
      console.log("Submission saved to local storage");
    } catch (saveError) {
      console.error("Error saving submission to local storage:", saveError);
      // Don't fail the request if local save fails
    }

    // Create document in ClickUp
    try {
      const accessToken = await getClickUpAccessToken();
      const clickUpDoc = await createClickUpDocument(accessToken, submissionData);
      console.log("ClickUp document created successfully:", clickUpDoc.id);
    } catch (clickUpError) {
      console.error("Error creating ClickUp document:", clickUpError);
      // Don't fail the request if ClickUp fails, but log it
      // You might want to send an alert/notification here
    }

    // Send via Web3Forms (keep existing email functionality)
    const web3formsAccessKey = process.env.WEB3FORMS_ACCESS_KEY;
    const notificationEmail = process.env.NOTIFICATION_EMAIL || email;

    if (!web3formsAccessKey) {
      console.warn("WEB3FORMS_ACCESS_KEY not set, skipping email notification");
    } else {
      try {
        // Format services as a readable list
        const servicesList = Array.isArray(services) 
          ? services.join(", ") 
          : services;

        // Send email via Web3Forms
        const web3formsResponse = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_key: web3formsAccessKey,
            subject: `New Booking Request from ${fullName} - ${companyName}`,
            from_name: "Offset Studio Booking Form",
            email: notificationEmail,
            message: `
New booking request received:

Full Name: ${fullName}
Company: ${companyName}
Email: ${email}
Phone: ${phoneNumber}
Website: ${website || "Not provided"}

Selected Services:
${servicesList}

${serviceDescription ? `Service Description:\n${serviceDescription}\n\n` : ""}${budget ? `Budget: ${budget}\n\n` : ""}Submitted at: ${new Date().toLocaleString()}
            `.trim(),
          }),
        });

        const web3formsData = await web3formsResponse.json();

        if (!web3formsResponse.ok || !web3formsData.success) {
          console.error("Web3Forms error:", web3formsData);
          // Don't fail the request if email fails, just log it
        } else {
          console.log("Email notification sent successfully via Web3Forms");
        }
      } catch (emailError) {
        console.error("Error sending email via Web3Forms:", emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Booking request submitted successfully" 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing booking submission:", error);
    return NextResponse.json(
      { error: "Failed to process booking request" },
      { status: 500 }
    );
  }
}

