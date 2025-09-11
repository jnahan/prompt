import { Prompt } from "@/types";

export const createPrompt = async (prompt: Prompt): Promise<Prompt> => {};

export const readPrompt = async (id: string): Promise<Prompt> => {};

export const updatePrompt = async (
  id: string,
  prompt: Prompt
): Promise<Prompt> => {};

export const deletePrompt = async (id: string): Promise<void> => {};
