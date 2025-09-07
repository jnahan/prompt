-- Add privacy field to users table
ALTER TABLE users ADD COLUMN is_public BOOLEAN DEFAULT TRUE;

-- Update RLS policy to allow public access to public users
CREATE POLICY "Public users can be viewed by anyone" ON users FOR SELECT USING (is_public = TRUE);

-- Update prompts RLS policy to allow public access to public prompts from public users
CREATE POLICY "Public prompts from public users can be viewed by anyone" ON prompts FOR SELECT USING (
  is_public = TRUE AND 
  EXISTS (SELECT 1 FROM users WHERE users.id = prompts.user_id AND users.is_public = TRUE)
);
