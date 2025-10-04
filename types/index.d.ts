// Shared type definitions for the application

export type VariableType = "text" | "textarea" | "select" | "date";

export type SubscriptionLevel = "free" | "lifetime";

export interface Profile {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  subscription_level: SubscriptionLevel;
}

export interface CreateProfile {
  username: string;
  first_name: string;
  last_name: string;
}

export interface Folder {
  id: string;
  user_id: string;
  name: string;
  created_at?: string;
}

export interface CreateFolder {
  name: string;
}
