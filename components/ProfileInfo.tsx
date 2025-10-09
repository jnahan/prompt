import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

function ProfileInfo({ username }: { username: string }) {
  return (
    <div className="flex flex-col items-center">
      <Avatar className="h-20 w-20 mb-4">
        <AvatarImage src={undefined} alt={`${username} avatar`} />
        <AvatarFallback className="bg-blue-100 text-blue-700 font-medium text-2xl">
          {username.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <h1 className="text-2xl font-semibold">{username}</h1>
    </div>
  );
}

export default ProfileInfo;
