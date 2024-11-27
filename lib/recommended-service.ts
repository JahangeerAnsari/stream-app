import { db } from "./db"

// all the login user and logout user that can be reccomended
export const getRecommended = async () => {
    const users = await db.user.findMany({
        orderBy: {
            createdAt:"desc"
        }
    })
    return users;
}