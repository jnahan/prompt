import { createClient } from "../supabase/client";
import { Folder } from "@/types";

export const createFolder = async (
  id: string,
  name: string,
  description: string,
  color: string,
  order_index: number
): Promise<Folder> => {};

export const readFolder = async (id: string): Promise<Folder> => {};

export const updateFolder = async (
  id: string,
  name: string,
  description: string,
  color: string
): Promise<Folder> => {};

export const deleteFolder = async (id: string): Promise<void> => {};
