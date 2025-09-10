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

export interface Variable {
  id: string;
  prompt_id: string;
  name: string;
  color: ColorType;
  type: VariableType;
  default_value?: string;
  select_options?: string[];
  order_index: number;
  created_at?: string;
}

export interface Prompt {
  id: string;
  user_id: string;
  folder_id?: string;
  title: string;
  description?: string;
  content: string;
  generation_type: GenerationType;
  is_public: boolean;
  variables?: Variable[];
  created_at?: string;
  updated_at?: string;
}

export interface Folder {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  color: ColorType;
  order_index: number;
  prompts: Prompt[];
  created_at?: string;
  updated_at?: string;
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
  full_name?: string;
  avatar_url?: string;
  subscription_level: SubscriptionLevel;
  updated_at?: string;
}
