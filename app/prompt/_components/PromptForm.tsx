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

const formSchema = z.object({
  title: z.string().min(1, { message: "Companion is required." }),
  description: z.string().min(1, { message: "Subject is required." }),
  folder_id: z.string().min(1, { message: "Topic is required." }),
  prompt: z.string().min(1, { message: "Voice is required." }),
  variable: z.string().min(1, { message: "Style is required." }),
});

function PromptForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      folder_id: "",
      prompt: "",
      variable: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const folders = ["Folder 1", "Folder 2", "Folder 3"];

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create prompt</h1>
        <PromptDialog />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="description" {...field} />
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
                      <SelectValue placeholder="Select the subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {folders.map((folder) => (
                        <SelectItem
                          value={folder}
                          key={folder}
                          className="capitalize"
                        >
                          {folder}
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
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prompt</FormLabel>
                <FormControl>
                  <div className="border border-gray-200 rounded-lg">
                    <Textarea
                      placeholder="Ex. Derivates & Integrals"
                      {...field}
                      className="input h-32"
                    />
                    <div className="border border-gray-200 p-2">
                      <p className="text-sm font-medium mb-1">
                        Insert variable with &#123;&#123;&#125;&#125;
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Variables are like placeholders that can be assigned
                        values. Use variables to set fields you want to control
                        like Name
                      </p>
                      <button className="text-sm font-medium p-1 bg-gray-100 text-gray-500">
                        &#123;&#123;Insert variable&#125;&#125;
                      </button>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row items-center gap-2">
            <Button type="submit">Submit</Button>
            <Button variant="ghost">Cancel</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default PromptForm;
