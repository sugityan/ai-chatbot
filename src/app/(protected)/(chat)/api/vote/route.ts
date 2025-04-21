import { getChatById, getVotesByChatId, voteMessage } from "@/lib/db/queries";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chatId = searchParams.get("chatId");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!chatId) {
    return new Response("chatId is required", { status: 400 });
  }

  if (user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const chat = await getChatById({ id: chatId });

  if (!chat) {
    return new Response("Chat not found", { status: 404 });
  }

  if (chat.userId !== user!.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const votes = await getVotesByChatId({ ChatId: chatId });

  return Response.json(votes, { status: 200 });
}

export async function PATCH(request: Request) {
  const {
    chatId,
    messageId,
    type,
  }: { chatId: string; messageId: string; type: "up" | "down" } =
    await request.json();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!chatId || !messageId || !type) {
    return new Response("messageId and type are required", { status: 400 });
  }

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const chat = await getChatById({ id: chatId });

  if (!chat) {
    return new Response("Chat not found", { status: 404 });
  }

  if (chat.userId !== user.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  await voteMessage({
    chatId,
    messageId,
    type: type,
  });

  return new Response("Message voted", { status: 200 });
}
