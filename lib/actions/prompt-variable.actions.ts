import { PromptVariable } from "@/types";

export const createPromptVariable = async (
  promptVariable: PromptVariable
): Promise<PromptVariable> => {};

export const readPromptVariable = async (
  id: string
): Promise<PromptVariable> => {};

export const updatePromptVariable = async (
  id: string,
  promptVariable: PromptVariable
): Promise<PromptVariable> => {};

export const deletePromptVariable = async (id: string): Promise<void> => {};
