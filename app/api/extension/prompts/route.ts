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

    // Fetch saved prompts - using the same approach as readSavedPrompts
    const { data: savedPromptIds, error: savedPromptsError } = await supabase
      .from("saved_prompts")
      .select("prompt_id, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (savedPromptsError) {
      console.error("Error fetching saved prompts:", savedPromptsError);
    }

    let formattedSavedPrompts = [];
    
    if (savedPromptIds && savedPromptIds.length > 0) {
      const promptIds = savedPromptIds.map((sp) => sp.prompt_id);
      
      // Fetch the actual prompts
      const { data: savedPromptsData, error: promptsError } = await supabase
        .from("prompts")
        .select("*")
        .in("id", promptIds);

      if (promptsError) {
        console.error("Error fetching saved prompt details:", promptsError);
      }

      if (savedPromptsData) {
        // Sort prompts by the order they were saved (most recent first)
        const savedMap = new Map(
          savedPromptIds.map((sp) => [sp.prompt_id, sp.created_at])
        );

        formattedSavedPrompts = savedPromptsData
          .map((prompt) => ({
            ...prompt,
            is_saved: true,
          }))
          .sort((a, b) => {
            const aSavedAt = savedMap.get(a.id) || "";
            const bSavedAt = savedMap.get(b.id) || "";
            return bSavedAt.localeCompare(aSavedAt);
          });
      }
    }

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


