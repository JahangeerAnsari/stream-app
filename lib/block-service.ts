import { getSelf } from "./auth-service";
import { db } from "./db";

export const isBlockedByUser = async (id: string) => {
  try {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!otherUser) {
      throw new Error("User not found");
    }
    if (otherUser.id === self.id) {
      // we cannot block ourself
      return false;
    }
    const existingBlock = await db.block.findUnique({
      // where: {
      //     blockerId:otherUser.id,
      //     blockedId:self.id
      // }
      // we can use findUnique to find the indx bases
      where: {
        blockedId_blockerId: {
          blockerId: otherUser.id,
          blockedId: self.id,
        },
      },
    });
    // return boolean result type
    return !!existingBlock;
  } catch (error) {
    console.log("error on isBlocked user", error);
    return false;
  }
};

// blocked user
export const blockUser = async (id: string) => {
  try {
    const self = await getSelf();
    if (self.id === id) {
      throw new Error("Cannot block yourself");
    }
    const otherUser = await db.user.findUnique({
      where: { id },
    });
    if (!otherUser) {
      throw new Error("user not found");
    }
    const existingBlock = await db.block.findUnique({
      where: {
        blockedId_blockerId: {
          blockerId: self.id,
          blockedId: otherUser.id,
        },
      },
    });
    if (existingBlock) {
      throw new Error("User already blocked..");
    }
    const block = await db.block.create({
      data: {
        blockerId: self.id,
        blockedId: otherUser.id,
        },
        include: {
            blocked:true
        }
    });
    return block;
  } catch (error) {
    console.log("block user", error);
  }
};

// unblock user
export const unBlockUser = async (id: string) => {
  try {
    const self = await getSelf();
    if (self.id === id) {
      throw new Error("Cannot unblock yourself");
    }
    const otherUser = await db.user.findUnique({
      where: { id },
    });
    if (!otherUser) {
      throw new Error("user not found");
    }
    const existingBlock = await db.block.findUnique({
      where: {
        blockedId_blockerId: {
          blockerId: self.id,
          blockedId: otherUser.id,
        },
      },
    });
    if (!existingBlock) {
      throw new Error("User not blocked.");
    }
      const unblock = await db.block.delete({
        where:{
           id:existingBlock.id 
          },
          include: {
              blocked:true
          }
    })
    return unblock;
  } catch (error) {
    console.log("unblock user", error);
  }
};

