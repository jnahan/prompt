import { Prompt, Folder } from "./types";

export const mockPrompts: Prompt[] = [
  {
    id: "1",
    title: "Business Pitch Deck Generator",
    description:
      "Generate a comprehensive business pitch deck for your startup idea",
    content:
      "Create a business pitch deck for {{company}} that focuses on {{industry}}. The deck should highlight our {{unique_value_prop}} and target {{target_audience}}. Include financial projections showing {{revenue_goal}} in revenue by year 3.",
    variables: [
      {
        id: "1",
        name: "company",
        color: "blue",
        type: "text",
        defaultValue: "",
        selectOptions: [],
      },
      {
        id: "2",
        name: "industry",
        color: "green",
        type: "select",
        defaultValue: "",
        selectOptions: [
          "Technology",
          "Healthcare",
          "Finance",
          "E-commerce",
          "Education",
          "Other",
        ],
      },
      {
        id: "3",
        name: "unique_value_prop",
        color: "purple",
        type: "textarea",
        defaultValue: "",
        selectOptions: [],
      },
      {
        id: "4",
        name: "target_audience",
        color: "red",
        type: "text",
        defaultValue: "",
        selectOptions: [],
      },
      {
        id: "5",
        name: "revenue_goal",
        color: "orange",
        type: "select",
        defaultValue: "",
        selectOptions: ["$100K", "$500K", "$1M", "$5M", "$10M", "$50M+"],
      },
    ],
  },
];

export const mockFolders: Folder[] = [
  {
    id: "1",
    name: "Folder",
    prompts: [
      {
        id: "2",
        title: "Prompt title",
        description: "Prompt description",
      },
      {
        id: "3",
        title: "Prompt title",
        description: "Prompt description",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        id: "4",
        title: "Prompt title",
        description: "Prompt description",
      },
    ],
  },
  {
    id: "2",
    name: "Folder",
    prompts: [],
  },
];

