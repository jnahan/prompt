// Shared type definitions for the application

export interface Variable {
  id: string;
  name: string;
  color:
    | "gray"
    | "red"
    | "yellow"
    | "green"
    | "blue"
    | "purple"
    | "orange"
    | "pink";
  type: "text" | "textarea" | "select";
  defaultValue?: string;
  selectOptions?: string[];
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  content?: string;
  variables?: Variable[];
}

export interface Folder {
  id: string;
  name: string;
  prompts: Prompt[];
}

export interface OnboardingData {
  firstName: string;
  lastName: string;
  username: string;
}

export interface Profile {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  full_name: string;
  avatar_url?: string;
  subscription_level: "free" | "pro" | "lifetime";
  updated_at?: string;
}

export type ColorType = Variable["color"];
