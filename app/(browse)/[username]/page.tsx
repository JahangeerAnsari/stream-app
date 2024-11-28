import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";


interface UserNameProps{
    params: {
        username: string;
 }
}
const UserPage = async ({ params }: UserNameProps) => {
    
    const user = await getUserByUsername(params.username);
    if (!user) {
        notFound()
    }
    const isfollowing = await isFollowingUser(user?.id);
    
    
    return (
      <div>
        User Page {params.username} {user?.id}
        following {JSON.stringify(isfollowing)}
      </div>
    );
};
export default UserPage;