// Shared type definitions for the application

export type ColorType =
  | "gray"
  | "red"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "orange"
  | "pink";

export type VariableType = "text" | "textarea" | "select" | "date";

export type GenerationType = "text" | "image" | "code";

export type SubscriptionLevel = "free" | "pro" | "lifetime";

export interface PromptVariable {
  id: string;
  created_at?: string;
  prompt_id: string;
  name: string;
  color: ColorType;
  type: VariableType;
  default_value?: string;
  select_options?: string[];
}

// TODO: should variables be in prompts or should each variable reference prompt
export interface Prompt {
  id: string;
  created_at?: string;
  user_id: string;
  folder_id?: string;
  title: string;
  content: string;
  generation_type: GenerationType;
  variables?: Variable[];
}

export interface Folder {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  color: ColorType;
  created_at?: string;
}

export interface OnboardingData {
  firstName: string;
  lastName: string;
  username: string;
}

export interface Profile {
  id: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  subscription_level: SubscriptionLevel;
}
