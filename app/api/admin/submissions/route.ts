import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-server";
import { promises as fs } from "fs";
import path from "path";

const SUBMISSIONS_FILE = path.join(process.cwd(), "data", "submissions.json");

export interface Submission {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  website: string;
  services: string[];
  serviceDescription: string;
  budget: string;
  submittedAt: string;
}

// Fallback: Get from file (for local dev)
async function getSubmissionsFromFile(): Promise<Submission[]> {
  try {
    const data = await fs.readFile(SUBMISSIONS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading submissions from file:", error);
    return [];
  }
}

// Get submissions from Supabase (primary source)
async function getSubmissionsFromSupabase(): Promise<Submission[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("submissions")
      .select("*")
      .order("submitted_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return [];
    }

    // Transform database format to our interface format
    return (data || []).map((row: any) => ({
      id: row.id,
      fullName: row.full_name,
      companyName: row.company_name,
      email: row.email,
      phoneNumber: row.phone_number,
      website: row.website || "",
      services: Array.isArray(row.services) ? row.services : [],
      serviceDescription: row.service_description || "",
      budget: row.budget || "",
      submittedAt: row.submitted_at,
    }));
  } catch (error) {
    console.error("Error fetching from Supabase:", error);
    return [];
  }
}

async function getSubmissions(): Promise<Submission[]> {
  // Try Supabase first
  const supabaseSubmissions = await getSubmissionsFromSupabase();
  
  if (supabaseSubmissions.length > 0) {
    return supabaseSubmissions;
  }

  // Fallback to file if Supabase is empty or unavailable
  console.warn("No submissions from Supabase, trying file fallback");
  return await getSubmissionsFromFile();
}

export async function GET(request: NextRequest) {
  try {
    // Simple auth check via header (in production, use proper JWT)
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const submissions = await getSubmissions();
    
    // Sort by most recent first
    submissions.sort((a, b) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );

    return NextResponse.json(
      { 
        success: true, 
        submissions,
        count: submissions.length 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}

