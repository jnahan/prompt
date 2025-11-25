import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * API endpoint for the Chrome extension to fetch user's prompts and folders
 */
export async function GET() {
  try {
    const supabase = await createClient();
    
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Unauthorized", authenticated: false },
        { status: 401 }
      );
    }

    // Fetch user's folders
    const { data: folders, error: foldersError } = await supabase
      .from("folders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (foldersError) {
      console.error("Error fetching folders:", foldersError);
    }

    // Fetch user's prompts
    const { data: prompts, error: promptsError } = await supabase
      .from("prompts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (promptsError) {
      console.error("Error fetching prompts:", promptsError);
    }

    // Fetch saved prompts
    const { data: savedPrompts, error: savedPromptsError } = await supabase
      .from("saved_prompts")
      .select(`
        prompt_id,
        prompts (
          id,
          title,
          content,
          user_id,
          folder_id,
          created_at,
          updated_at
        )
      `)
      .eq("user_id", user.id);

    if (savedPromptsError) {
      console.error("Error fetching saved prompts:", savedPromptsError);
    }

    // Format saved prompts
    const formattedSavedPrompts = savedPrompts?.map(sp => ({
      ...sp.prompts,
      is_saved: true
    })) || [];

    return NextResponse.json({
      authenticated: true,
      folders: folders || [],
      prompts: prompts || [],
      savedPrompts: formattedSavedPrompts,
    });
  } catch (error) {
    console.error("Extension prompts error:", error);
    return NextResponse.json(
      { error: "Internal server error", authenticated: false },
      { status: 500 }
    );
  }
}

