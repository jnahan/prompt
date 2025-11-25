-- ============================================
-- SAVED PROMPTS TABLE SCHEMA
-- ============================================
-- This table creates a many-to-many relationship between users and prompts
-- allowing users to save/bookmark prompts created by other users.

-- ============================================
-- TABLE CREATION
-- ============================================

CREATE TABLE IF NOT EXISTS saved_prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Prevent duplicate saves: a user can only save the same prompt once
  CONSTRAINT unique_user_prompt UNIQUE (user_id, prompt_id)
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Index for quickly finding all prompts saved by a user
CREATE INDEX IF NOT EXISTS idx_saved_prompts_user_id ON saved_prompts(user_id);

-- Index for quickly finding all users who saved a specific prompt
CREATE INDEX IF NOT EXISTS idx_saved_prompts_prompt_id ON saved_prompts(prompt_id);

-- Index for sorting by creation date (most recent saves first)
CREATE INDEX IF NOT EXISTS idx_saved_prompts_created_at ON saved_prompts(created_at DESC);

-- Composite index for common query pattern: user's saved prompts ordered by date
CREATE INDEX IF NOT EXISTS idx_saved_prompts_user_created ON saved_prompts(user_id, created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on the table
ALTER TABLE saved_prompts ENABLE ROW LEVEL SECURITY;

-- Policy 1: Users can view their own saved prompts
CREATE POLICY "Users can view their own saved prompts"
  ON saved_prompts
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy 2: Users can insert (save) prompts for themselves
CREATE POLICY "Users can save prompts"
  ON saved_prompts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy 3: Users can delete (unsave) their own saved prompts
CREATE POLICY "Users can unsave prompts"
  ON saved_prompts
  FOR DELETE
  USING (auth.uid() = user_id);

-- Note: No UPDATE policy needed since we don't allow updating saved prompts
-- (users can only save/unsave, not modify the relationship)

-- ============================================
-- OPTIONAL: FUNCTION TO GET SAVE COUNT
-- ============================================
-- This function can be used to get the number of times a prompt has been saved
-- Useful for displaying "saved by X users" or popularity metrics

CREATE OR REPLACE FUNCTION get_prompt_save_count(prompt_uuid UUID)
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER
  FROM saved_prompts
  WHERE prompt_id = prompt_uuid;
$$ LANGUAGE SQL STABLE;

-- ============================================
-- NOTES & CONSIDERATIONS
-- ============================================

-- 1. CASCADE BEHAVIOR:
--    - ON DELETE CASCADE on user_id: If a user is deleted, all their saved prompts are deleted
--    - ON DELETE CASCADE on prompt_id: If a prompt is deleted, all saves of that prompt are deleted
--
-- 2. UNIQUE CONSTRAINT:
--    - Prevents duplicate saves (same user saving same prompt twice)
--    - Database will throw error if attempted, handle in application code
--
-- 3. AUTHENTICATION:
--    - RLS policies use auth.uid() which requires Supabase Auth
--    - Unauthenticated users cannot save prompts (enforced by RLS)
--
-- 4. PERFORMANCE:
--    - Indexes are optimized for common queries:
--      * "Get all prompts saved by user X" (user_id index)
--      * "Get all users who saved prompt Y" (prompt_id index)
--      * "Get user's saved prompts ordered by date" (composite index)
--
-- 5. FUTURE ENHANCEMENTS:
--    - Could add a "notes" column if users want to add personal notes to saved prompts
--    - Could add a "tags" or "collections" feature for organizing saved prompts
--    - Could add analytics: track when prompts are saved most often

