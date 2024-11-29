import { getSelf } from "./auth-service";
import { db } from "./db";

// get all the follow users by login user
export const getAllFollowedUsers = async () => {
  try {
    const self = await getSelf();
    const myFollowers = await db.follow.findMany({
      where: {
        followerId: self.id
      }, include: {
        following: true
      }
    }); 
    return myFollowers;
  } catch (error) {
    console.log(" error on get my followers", error);
    return []
  }
}
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

export const unFollowUser = async (id: string) => {
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
    throw new Error("Cannot un-follow yourself");
  }
  const existingFollow = await db.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: otherUser.id,
    },
  });
  //   return boolean value by two !! as output
  //   return !!existingFollow;
  if (!existingFollow) {
    throw new Error("Not Folllowing");
  }
  const follow = await db.follow.delete({
    where: {
      id:existingFollow.id
    },
    include: {
      following: true,
    },
  });
  return follow;
};