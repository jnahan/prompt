// Runtime constants and utility values
import type { ColorType } from "../types";

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
