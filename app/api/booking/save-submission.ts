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

// Fallback: Initialize submissions file if it doesn't exist (for local dev)
async function ensureSubmissionsFile() {
  const dataDir = path.dirname(SUBMISSIONS_FILE);
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
  
  try {
    await fs.access(SUBMISSIONS_FILE);
  } catch {
    // File doesn't exist, create it with empty array
    await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify([], null, 2));
  }
}

// Save to Supabase (primary storage)
async function saveToSupabase(data: Omit<Submission, "id">): Promise<string | null> {
  try {
    const { data: result, error } = await supabaseAdmin
      .from("submissions")
      .insert({
        full_name: data.fullName,
        company_name: data.companyName,
        email: data.email,
        phone_number: data.phoneNumber,
        website: data.website || null,
        services: data.services,
        service_description: data.serviceDescription || null,
        budget: data.budget || null,
        submitted_at: data.submittedAt,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return null;
    }

    return result?.id || null;
  } catch (error) {
    console.error("Error saving to Supabase:", error);
    return null;
  }
}

// Fallback: Save to local file (for local dev or if Supabase fails)
async function saveToFile(data: Omit<Submission, "id">): Promise<void> {
  await ensureSubmissionsFile();
  
  try {
    const fileData = await fs.readFile(SUBMISSIONS_FILE, "utf-8");
    const submissions: Submission[] = JSON.parse(fileData);
    
    const newSubmission: Submission = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...data,
    };
    
    submissions.push(newSubmission);
    
    await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
  } catch (error) {
    console.error("Error saving to file:", error);
    throw error;
  }
}

/**
 * Save submission to database (Supabase) with file fallback
 * This ensures data is never lost - Supabase is primary, file is backup
 */
export async function saveSubmission(data: Omit<Submission, "id">): Promise<void> {
  // Try Supabase first (production storage)
  const supabaseId = await saveToSupabase(data);
  
  if (supabaseId) {
    console.log("Submission saved to Supabase:", supabaseId);
  } else {
    console.warn("Failed to save to Supabase, using file fallback");
    // Fallback to file storage (for local dev or if Supabase is unavailable)
    await saveToFile(data);
  }
}

