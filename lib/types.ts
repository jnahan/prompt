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
  email?: string;
  password?: string;
}

export type ColorType = Variable["color"];

// Color utility constants
export const AVAILABLE_COLORS: ColorType[] = [
  "gray",
  "red",
  "yellow",
  "green",
  "blue",
  "purple",
  "orange",
  "pink",
];

export const COLOR_CLASSES = {
  gray: "bg-gray-100 text-gray-800",
  red: "bg-red-100 text-red-800",
  yellow: "bg-yellow-100 text-yellow-800",
  green: "bg-green-100 text-green-800",
  blue: "bg-blue-100 text-blue-800",
  purple: "bg-purple-100 text-purple-800",
  orange: "bg-orange-100 text-orange-800",
  pink: "bg-pink-100 text-pink-800",
} as const;
