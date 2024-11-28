import { getSelf } from "./auth-service";
import { db } from "./db";

export const isFollowingUser = async (id: string) => {
  try {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });
      if (!otherUser) {
        throw new Error("User not found!")
      }
    //   we always follow ourself
      if (otherUser.id === self.id) {
        return true
      }  
      const existingFollow = await db.follow.findFirst({
          where: {
              followerId: self.id,
              followingId:otherUser.id
          }
      })
    //   return boolean value by two !! as output
      return !!existingFollow;
  } catch {
    return false;
  }
};
