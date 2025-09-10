import { Prompt, Folder } from "@/types";

export const mockPrompts: Prompt[] = [
  {
    id: "1",
    user_id: "user-1",
    title: "Business Pitch Deck Generator",
    description:
      "Generate a comprehensive business pitch deck for your startup idea",
    content:
      "Create a business pitch deck for {{company}} that focuses on {{industry}}. The deck should highlight our {{unique_value_prop}} and target {{target_audience}}. Include financial projections showing {{revenue_goal}} in revenue by year 3.",
    generation_type: "text",
    is_public: false,
    variables: [
      {
        id: "1",
        prompt_id: "1",
        name: "company",
        color: "blue",
        type: "text",
        default_value: "",
        select_options: [],
        order_index: 0,
      },
      {
        id: "2",
        prompt_id: "1",
        name: "industry",
        color: "green",
        type: "select",
        default_value: "",
        select_options: [
          "Technology",
          "Healthcare",
          "Finance",
          "E-commerce",
          "Education",
          "Other",
        ],
        order_index: 1,
      },
      {
        id: "3",
        prompt_id: "1",
        name: "unique_value_prop",
        color: "purple",
        type: "textarea",
        default_value: "",
        select_options: [],
        order_index: 2,
      },
      {
        id: "4",
        prompt_id: "1",
        name: "target_audience",
        color: "red",
        type: "text",
        default_value: "",
        select_options: [],
        order_index: 3,
      },
      {
        id: "5",
        prompt_id: "1",
        name: "revenue_goal",
        color: "orange",
        type: "select",
        default_value: "",
        select_options: ["$100K", "$500K", "$1M", "$5M", "$10M", "$50M+"],
        order_index: 4,
      },
    ],
  },
];

export const mockFolders: Folder[] = [
  {
    id: "1",
    user_id: "user-1",
    name: "Work Projects",
    description: "Professional prompts for work",
    color: "blue",
    order_index: 0,
    prompts: [
      {
        id: "2",
        user_id: "user-1",
        folder_id: "1",
        title: "Email Templates",
        description: "Professional email templates",
        content: "Write a professional email about {{topic}} to {{recipient}}.",
        generation_type: "text",
        is_public: false,
      },
      {
        id: "3",
        user_id: "user-1",
        folder_id: "1",
        title: "Meeting Notes",
        description: "Meeting summary template",
        content:
          "Summarize the key points from today's meeting about {{meeting_topic}}. Include action items for {{attendees}} and next steps.",
        generation_type: "text",
        is_public: false,
      },
      {
        id: "4",
        user_id: "user-1",
        folder_id: "1",
        title: "Project Proposal",
        description: "Project proposal template",
        content:
          "Create a project proposal for {{project_name}} with budget {{budget}} and timeline {{timeline}}.",
        generation_type: "text",
        is_public: false,
      },
    ],
  },
  {
    id: "2",
    user_id: "user-1",
    name: "Personal",
    description: "Personal prompts and ideas",
    color: "green",
    order_index: 1,
    prompts: [],
  },
];
