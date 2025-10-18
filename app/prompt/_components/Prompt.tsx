"use client";

import { useState, useMemo, useRef, useEffect } from "react";

interface PlaceholderSegment {
  type: "text" | "placeholder";
  content: string;
  id?: string;
  placeholder?: string;
}

interface PromptProps {
  content: string;
  onChange: (value: string) => void;
}

export default function Prompt({ content, onChange }: PromptProps) {
  // --- Parse prompt content into segments ---
  const segments = useMemo(() => {
    const regex = /\{\{(.*?)\}\}/g;
    const result: PlaceholderSegment[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        result.push({
          type: "text",
          content: content.slice(lastIndex, match.index),
        });
      }

      const id = match[1].trim();
      result.push({
        type: "placeholder",
        id,
        placeholder: id,
        content: "",
      });

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      result.push({
        type: "text",
        content: content.slice(lastIndex),
      });
    }

    return result;
  }, [content]);

  // --- Manage state for all placeholders ---
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(
      segments.filter((s) => s.type === "placeholder").map((s) => [s.id!, ""])
    )
  );

  const [focusedId, setFocusedId] = useState<string | null>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    if (focusedId && inputRefs.current[focusedId]) {
      inputRefs.current[focusedId]?.focus();
    }
  }, [focusedId]);

  const handleChange = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const calculateInputWidth = (text: string, placeholder: string): string => {
    const displayText = text || placeholder;
    const charWidth = 8.5;
    return displayText.length * charWidth + 8 + "px";
  };

  // --- Generate filled prompt (for clipboard or preview) ---
  const filledPrompt = segments
    .map((segment) =>
      segment.type === "text"
        ? segment.content
        : values[segment.id!] || `{{${segment.id}}}`
    )
    .join("");

  useEffect(() => {
    if (onChange) {
      onChange(filledPrompt);
    }
  }, [filledPrompt, onChange]);

  return (
    <div>
      <div className="leading-relaxed text-gray-700 flex flex-wrap gap-y-1">
        {segments.map((segment, idx) => {
          if (segment.type === "text") {
            return (
              <span key={idx} className="text-gray-700">
                {segment.content}
              </span>
            );
          }

          const inputWidth = calculateInputWidth(
            values[segment.id || ""],
            segment.placeholder || ""
          );

          return (
            <span
              key={idx}
              className={`inline-block mx-1 px-1 py-0.5 font-mono cursor-text bg-blue-50`}
              onClick={() => setFocusedId(segment.id || null)}
            >
              <input
                ref={(el) => {
                  if (el) inputRefs.current[segment.id || ""] = el;
                }}
                type="text"
                value={values[segment.id || ""]}
                placeholder={segment.placeholder}
                onChange={(e) => handleChange(segment.id || "", e.target.value)}
                onFocus={() => setFocusedId(segment.id || null)}
                onBlur={() => setFocusedId(null)}
                className="bg-transparent outline-none font-medium text-blue-500 placeholder-blue-300 caret-blue text-sm"
                style={{
                  width: inputWidth,
                  border: "none",
                }}
              />
            </span>
          );
        })}
      </div>
    </div>
  );
}
