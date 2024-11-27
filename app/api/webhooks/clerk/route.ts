import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
export async function POST(req:Request) {
  const WEBHOOK_SOCKET = process.env.CLERK_WEBHOOK_SOCKET;

  if (!WEBHOOK_SOCKET) {
    throw new Error(
      "Error: Please add CLERK_WEBHOOK_SOCKET from Clerk Dashboard to .env or .env.local"
    );
  }
  // Get headers
  const headerPayload = headers();
  const svix_id = (await headerPayload).get("svix-id");
  const svix_timestamp = (await headerPayload).get("svix-timestamp");
  const svix_signature = (await headerPayload).get("svix-signature");
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }
  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create new Svix instance with secret
  const wh = new Webhook(WEBHOOK_SOCKET);
  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }
  const eventType = evt.type;
  if (eventType === 'user.created') {
   await db.user.create({
      data: {
         externalUserId: payload.data.id,
        username: payload.data.username,
        imageUrl: payload.data.image_url,
      },
    });
  }
  
  if (eventType === 'user.updated') {
   await db.user.update({
      where: {
        externalUserId: payload.data.id,
      },
      data: {
        username: payload.data.username,
        imageUrl: payload.data.image_url,
      },
    });
    
  }

  // delete user
  if (eventType === "user.deleted") {
    await db.user.delete({
      where: {
        externalUserId:payload.data.id
      }
    })
  }
  return new Response('Webhook received', { status: 200 })

}