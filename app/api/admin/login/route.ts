import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Simple authentication - username and password both "admin"
    if (username === "admin" && password === "admin") {
      // Create a simple session token (in production, use proper JWT or session management)
      const token = Buffer.from("admin:" + Date.now()).toString("base64");
      
      return NextResponse.json(
        { 
          success: true, 
          token,
          message: "Login successful" 
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}

