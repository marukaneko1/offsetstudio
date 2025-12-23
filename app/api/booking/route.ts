import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, companyName, email, phoneNumber, website, services } = body;

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
      submittedAt: new Date().toISOString(),
    };

    // Log the submission
    console.log("=== NEW BOOKING SUBMISSION ===");
    console.log(JSON.stringify(submissionData, null, 2));
    console.log("=============================");

    // Send via Web3Forms
    const web3formsAccessKey = process.env.WEB3FORMS_ACCESS_KEY;
    const notificationEmail = process.env.NOTIFICATION_EMAIL || email; // Fallback to submitter's email

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

Submitted at: ${new Date().toLocaleString()}
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

