// Shared type definitions for the application

export type VariableType = "text" | "textarea" | "select" | "date";

export type SubscriptionLevel = "free" | "lifetime";

export interface Profile {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  subscriptionLevel: SubscriptionLevel;
}

export interface CreateProfile {
  username: string;
  firstName: string;
  lastName: string;
}

export interface PromptVariable {
  id: string;
  createdAt?: string;
  promptId: string;
  name: string;
  type: VariableType;
  defaultValue?: string;
  selectOptions?: string[];
}

export interface Prompt {
  id: string;
  createdAt?: string;
  userId: string;
  folderId?: string;
  title: string;
  content: string;
}

export interface Folder {
  id: string;
  userId: string;
  name: string;
  description?: string;
  createdAt?: string;
}
