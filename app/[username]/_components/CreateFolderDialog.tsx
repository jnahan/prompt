"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FolderPlus } from "lucide-react";
import { createFolder, updateFolder } from "@/lib/actions/folder.actions";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

interface CreateFolderDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialName?: string;
  folderId?: string; // if provided -> edit mode
  onAfterSubmit?: () => void;
}

export default function CreateFolderDialog({
  open,
  onOpenChange,
  initialName,
  folderId,
  onAfterSubmit,
}: CreateFolderDialogProps) {
  const [isOpen, setIsOpen] = useState(open ?? false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialName ?? "",
    },
  });

  // Keep form in sync when initialName changes (edit flow)
  if (initialName !== undefined && form.getValues("name") !== initialName) {
    form.setValue("name", initialName);
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (folderId) {
      await updateFolder(folderId, values);
    } else {
      await createFolder(values);
    }
    if (onOpenChange) {
      onOpenChange(false);
    } else {
      setIsOpen(false);
    }
    if (onAfterSubmit) {
      onAfterSubmit();
    }
  };

  return (
    <Dialog
      open={onOpenChange ? open : isOpen}
      onOpenChange={onOpenChange ?? setIsOpen}
    >
      {!folderId && (
        <DialogTrigger asChild>
          <Button
            onClick={() =>
              onOpenChange ? onOpenChange(true) : setIsOpen(true)
            }
            size="default"
            variant="outline"
          >
            <FolderPlus className="h-4 w-4" />
            New folder
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{folderId ? "Edit folder" : "New folder"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Folder name</FormLabel>
                  <FormControl>
                    <Input placeholder="Folder name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
