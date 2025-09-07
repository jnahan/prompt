import { Button } from "@/components/ui/button";
import { ColorType } from "@/lib/types";

interface VariableComponentProps {
  variable: string;
  color: ColorType;
  onClick: () => void;
  disabled?: boolean;
}

export function VariableComponent({
  variable,
  color,
  onClick,
  disabled = false,
}: VariableComponentProps) {
  const colorClasses = {
    gray: "bg-gray-100 hover:bg-gray-200 text-gray-800",
    red: "bg-red-100 hover:bg-red-200 text-red-800",
    yellow: "bg-yellow-100 hover:bg-yellow-200 text-yellow-800",
    green: "bg-green-100 hover:bg-green-200 text-green-800",
    blue: "bg-blue-100 hover:bg-blue-200 text-blue-800",
    purple: "bg-purple-100 hover:bg-purple-200 text-purple-800",
    orange: "bg-orange-100 hover:bg-orange-200 text-orange-800",
    pink: "bg-pink-100 hover:bg-pink-200 text-pink-800",
  };

  return (
    <Button
      onClick={onClick}
      variant="outline"
      disabled={disabled}
      className={`${colorClasses[color]} border-0 font-mono text-sm w-auto px-1 py-1`}
      style={{ fontSize: "14px", fontWeight: "500" }}
    >
      {`{{${variable}}}`}
    </Button>
  );
}
