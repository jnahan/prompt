import { MyAccountMenu } from "./my-account-menu";

interface NavigationProps {
  userName: string;
  onLogout: () => void;
}

export function Navigation({ userName, onLogout }: NavigationProps) {
  return (
    <div className="border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">QuickPrompt</span>
        </div>
        <div className="flex items-center gap-6">
          <MyAccountMenu userName={userName} onLogout={onLogout} />
        </div>
      </div>
    </div>
  );
}
