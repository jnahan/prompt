import { Button } from "@/components/ui/button";

interface VariableButtonProps {
  variable: string;
  color:
    | "gray"
    | "red"
    | "yellow"
    | "green"
    | "blue"
    | "purple"
    | "orange"
    | "pink";
  onClick: () => void;
}

export function VariableButton({
  variable,
  color,
  onClick,
}: VariableButtonProps) {
  const colorClasses = {
    gray: "bg-gray-100 hover:bg-gray-200",
    red: "bg-red-100 hover:bg-red-200",
    yellow: "bg-yellow-100 hover:bg-yellow-200",
    green: "bg-green-100 hover:bg-green-200",
    blue: "bg-blue-100 hover:bg-blue-200",
    purple: "bg-purple-100 hover:bg-purple-200",
    orange: "bg-orange-100 hover:bg-orange-200",
    pink: "bg-pink-100 hover:bg-pink-200",
  };

  return (
    <Button
      onClick={onClick}
      variant="outline"
      className={`${colorClasses[color]} border-0 text-black font-mono text-sm`}
    >
      {`{{${variable}}}`}
    </Button>
  );
}
