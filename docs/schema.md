# Prompt Management System Schema Documentation

## Overview

This document defines the database schema and data models for the QuickPrompt application, a system for creating, managing, and organizing AI prompts with variable support.

## Core Entities

### 1. Users

```typescript
interface User {
  id: string; // UUID primary key
  email: string; // Unique email address
  username: string; // Unique username
  first_name: string; // User's first name
  last_name: string; // User's last name
  name: string; // Display name (computed from first_name + last_name)
  plan: "free" | "lifetime"; // Subscription plan
  created_at: timestamp; // Account creation date
  updated_at: timestamp; // Last profile update
}
```

### 2. Prompts

```typescript
interface Prompt {
  id: string; // UUID primary key
  user_id: string; // Foreign key to Users
  folder_id?: string; // Optional foreign key to Folders
  title: string; // Prompt title
  description: string; // Prompt description
  content: string; // The actual prompt text
  generation_type: "text" | "image" | "code"; // Type of generation
  attachments?: string[]; // Array of attachment URLs/paths
  variables: PromptVariable[]; // Associated variables
  is_public: boolean; // Whether prompt is shareable
  created_at: timestamp; // Creation date
  updated_at: timestamp; // Last modification date
}
```

### 3. Prompt Variables

```typescript
interface PromptVariable {
  id: string; // UUID primary key
  prompt_id: string; // Foreign key to Prompts
  name: string; // Variable name (e.g., "Variable1")
  color: VariableColor; // Visual color identifier
  type: VariableType; // Data type
  default_value?: string; // Optional default value
  select_options?: string[]; // Options for select type variables
  order: number; // Display order
  created_at: timestamp; // Creation date
}

type VariableColor =
  | "gray"
  | "red"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "orange"
  | "pink";

type VariableType = "text" | "date" | "select" | "textarea";
```

### 4. Folders

```typescript
interface Folder {
  id: string; // UUID primary key
  user_id: string; // Foreign key to Users
  name: string; // Folder name
  description?: string; // Optional folder description
  color?: string; // Optional folder color
  order: number; // Display order
  created_at: timestamp; // Creation date
  updated_at: timestamp; // Last modification date
}
```

### 5. Prompt Executions (Optional - for analytics)

```typescript
interface PromptExecution {
  id: string; // UUID primary key
  prompt_id: string; // Foreign key to Prompts
  user_id: string; // Foreign key to Users
  variables_used: Record<string, string>; // Variable values used
  execution_time: timestamp; // When prompt was executed
  success: boolean; // Whether execution was successful
  response_length?: number; // Length of AI response
}
```

## Database Schema (SQL)

### Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  name VARCHAR(255) NOT NULL, -- Computed field: first_name + ' ' + last_name
  plan VARCHAR(20) DEFAULT 'free' CHECK (plan IN ('free', 'lifetime')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Folders Table

```sql
CREATE TABLE folders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  color VARCHAR(50),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Prompts Table

```sql
CREATE TABLE prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  folder_id UUID REFERENCES folders(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  generation_type VARCHAR(20) DEFAULT 'text' CHECK (generation_type IN ('text', 'image', 'code')),
  attachments TEXT[], -- Array of attachment URLs
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Prompt Variables Table

```sql
CREATE TABLE prompt_variables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  color VARCHAR(20) NOT NULL CHECK (color IN ('gray', 'red', 'yellow', 'green', 'blue', 'purple', 'orange', 'pink')),
  type VARCHAR(20) NOT NULL CHECK (type IN ('text', 'date', 'select', 'textarea')),
  default_value TEXT,
  select_options TEXT[], -- Array of options for select type
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Prompt Executions Table (Optional)

```sql
CREATE TABLE prompt_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  variables_used JSONB NOT NULL, -- Store variable values as JSON
  execution_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  success BOOLEAN NOT NULL,
  response_length INTEGER
);
```

## Indexes

```sql
-- Performance indexes
CREATE INDEX idx_prompts_user_id ON prompts(user_id);
CREATE INDEX idx_prompts_folder_id ON prompts(folder_id);
CREATE INDEX idx_prompt_variables_prompt_id ON prompt_variables(prompt_id);
CREATE INDEX idx_folders_user_id ON folders(user_id);
CREATE INDEX idx_prompt_executions_prompt_id ON prompt_executions(prompt_id);
CREATE INDEX idx_prompt_executions_user_id ON prompt_executions(user_id);
```

## Business Rules

### Plan Limitations

- **Free Plan**: Maximum 15 prompts per user
- **Lifetime Plan**: Unlimited prompts

### Variable Rules

- Variable names must be unique within a prompt
- Variable colors are assigned automatically from the available palette
- Select type variables must have at least 2 options
- Default values are optional for all variable types

### Folder Rules

- Users can create unlimited folders (regardless of plan)
- Folders can contain unlimited prompts
- Deleting a folder moves prompts to "Uncategorized" (no folder)

### Prompt Rules

- Prompts must have a title and content
- Description is optional
- Variables are automatically extracted from prompt content using `{{variable}}` syntax
- Public prompts can be shared with other users

## API Endpoints (Proposed)

### Prompts

- `GET /api/prompts` - List user's prompts
- `POST /api/prompts` - Create new prompt
- `GET /api/prompts/:id` - Get specific prompt
- `PUT /api/prompts/:id` - Update prompt
- `DELETE /api/prompts/:id` - Delete prompt

### Folders

- `GET /api/folders` - List user's folders
- `POST /api/folders` - Create new folder
- `PUT /api/folders/:id` - Update folder
- `DELETE /api/folders/:id` - Delete folder

### Variables

- `GET /api/prompts/:id/variables` - Get prompt variables
- `POST /api/prompts/:id/variables` - Add variable to prompt
- `PUT /api/variables/:id` - Update variable
- `DELETE /api/variables/:id` - Delete variable

## Data Validation

### Prompt Validation

- Title: Required, max 255 characters
- Content: Required, max 10,000 characters
- Description: Optional, max 1,000 characters
- Generation type: Must be one of the allowed values

### Variable Validation

- Name: Required, max 100 characters, alphanumeric + underscores
- Color: Must be one of the predefined colors
- Type: Must be one of the allowed types
- Select options: Required for select type, min 2 options

### Folder Validation

- Name: Required, max 255 characters
- Description: Optional, max 1,000 characters

### User Validation

- Email: Required, valid email format, max 255 characters, unique
- Username: Required, alphanumeric + underscores, max 50 characters, unique
- First Name: Required, max 100 characters
- Last Name: Required, max 100 characters
- Name: Computed field (first_name + ' ' + last_name)

## Security Considerations

1. **User Isolation**: All queries must include user_id to prevent cross-user data access
2. **Input Sanitization**: All text inputs should be sanitized to prevent XSS
3. **Rate Limiting**: Implement rate limiting for prompt creation and execution
4. **File Uploads**: Secure handling of attachment uploads with size limits
5. **Public Prompts**: Implement proper access controls for shared prompts

## Migration Strategy

1. **Phase 1**: Core tables (users, prompts, folders)
2. **Phase 2**: Variables system
3. **Phase 3**: Analytics and execution tracking
4. **Phase 4**: Advanced features (sharing, templates)

## Future Enhancements

- Prompt templates
- Prompt sharing and collaboration
- Version history for prompts
- Advanced analytics and usage tracking
- Integration with AI services
- Prompt marketplace
