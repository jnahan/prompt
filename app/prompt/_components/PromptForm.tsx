"use client";

import PromptDialog from "./PromptDialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { useState, useEffect } from "react";

import { createPrompt } from "@/lib/actions/prompt.actions";
import { readFolders } from "@/lib/actions/folder.actions";

import { redirect, RedirectType } from "next/navigation";
import { Folder } from "@/types";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  folder_id: z.string().optional(),
  content: z.string().min(1, { message: "Content is required." }),
});

type PromptFormValues = z.infer<typeof formSchema>;

interface PromptFormProps {
  initialValues?: Partial<PromptFormValues>;
  onSubmit?: (values: PromptFormValues) => Promise<void>;
}

function PromptForm({ initialValues, onSubmit }: PromptFormProps) {
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    const fetchFolders = async () => {
      const folders = await readFolders();
      setFolders(folders);
    };
    fetchFolders();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialValues?.title ?? "",
      folder_id: initialValues?.folder_id ?? "",
      content: initialValues?.content ?? "",
    },
  });

  useEffect(() => {
    if (!initialValues) return;
    form.reset({
      title: initialValues.title ?? "",
      folder_id: initialValues.folder_id ?? "",
      content: initialValues.content ?? "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues?.title, initialValues?.folder_id, initialValues?.content]);

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    if (onSubmit) {
      await onSubmit(values);
      return;
    }
    await createPrompt(values);
    redirect("/", RedirectType.replace);
  }

  const insertVariable = (variable: string) => {
    const textarea = document.getElementById(
      "prompt-content"
    ) as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;

    const newValue =
      value.slice(0, start) + `{{${variable}}}` + value.slice(end);

    // Update form value
    form.setValue("content", newValue);

    // Move cursor between braces
    setTimeout(() => {
      textarea.focus();
      if (variable === "") {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }
    }, 0);
  };

  const variables = [
    "",
    "name",
    "email",
    "date",
    "time",
    "city",
    "company",
    "product",
    "amount",
    "goal",
    "topic",
    "username",
    "language",
  ];

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {initialValues ? "Edit prompt" : "Create prompt"}
        </h1>
        <PromptDialog
          title={form.watch("title")}
          content={form.watch("content")}
        />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="folder_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Folder</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="input capitalize">
                      <SelectValue placeholder="Select folder" />
                    </SelectTrigger>
                    <SelectContent>
                      {folders.map((folder) => (
                        <SelectItem value={folder.id} key={folder.id}>
                          {folder.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prompt</FormLabel>
                <FormControl>
                  <div className="border border-gray-200 rounded-lg">
                    <Textarea
                      id="prompt-content"
                      placeholder="Ex. Derivates & Integrals"
                      {...field}
                      className="input h-32"
                    />
                    <div className="border border-gray-200 p-2">
                      <p className="text-sm font-medium mb-1">
                        Add variable with &#123;&#123;&#125;&#125;
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Variables are like placeholders that can be assigned
                        values. Use variables to set fields you want to control
                        like Name
                      </p>
                      <ul className="flex flex-wrap gap-2">
                        {variables.map((variable) => (
                          <li
                            key={variable}
                            className="text-sm font-medium p-1 bg-gray-100 text-gray-500 cursor-pointer"
                            onClick={() => insertVariable(variable)}
                          >
                            {`{{${variable}}}`}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row items-center gap-2">
            <Button type="submit">Save</Button>
            <Button variant="ghost">Cancel</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default PromptForm;
