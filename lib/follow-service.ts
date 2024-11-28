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
      throw new Error("User not found!");
    }
    //   we always follow ourself
    if (otherUser.id === self.id) {
      throw new Error("Cannot follow yourself");
    }
    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });
    //   return boolean value by two !! as output
    return !!existingFollow;
  } catch {
    return false;
  }
};
export const followUser = async (id: string) => {
  const self = await getSelf();
  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });
  if (!otherUser) {
    throw new Error("User not found!");
  }
  //   we always follow ourself
  if (otherUser.id === self.id) {
    throw new Error("Cannot follow yourself");
  }
  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });
  //   return boolean value by two !! as output
  //   return !!existingFollow;
  if (existingFollow) {
    throw new Error("Already following");
  }
  const follow = await db.follow.create({
    data: {
      followerId: self.id,
      followingId: otherUser.id,
    },
    include: {
      follower: true,
      following: true,
    },
  });
  return follow;
};
