"use server";

import { updateChatVisiblityById } from "@/lib/db/queries";
import { VisibilityType } from "@/components/visibility-selector";

export async function updateChatVisibilityAction({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: VisibilityType;
}) {
  await updateChatVisiblityById({ chatId, visibility });
}
