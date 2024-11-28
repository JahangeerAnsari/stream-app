"use server";

import { followUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";

// its just behave like api route 
export const onFollow = async (id:string) => {
    try {
        const followedUser = await followUser(id);
        revalidatePath("/");
        if (followedUser) {
            revalidatePath(`/${followedUser.following.username}`)
        }
        return followedUser
    } catch {
    throw new Error("Internal Error")
    }
}