import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * API endpoint for the Chrome extension to verify authentication
 * and get current user data
 */
export async function GET() {
  try {
    const supabase = await createClient();
    
    // Get the current user from Supabase
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json(
        { error: "Unauthorized", authenticated: false },
        { status: 401 }
      );
    }

    // Return user data that the extension needs
    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        // Add any other user fields from your profiles table if needed
      },
    });
  } catch (error) {
    console.error("Extension auth error:", error);
    return NextResponse.json(
      { error: "Internal server error", authenticated: false },
      { status: 500 }
    );
  }
}


