'use server';

import { cookies } from 'next/headers';

export async function saveChatModelAsCookieAction(model: string) {
  const cookieStore = await cookies();
  cookieStore.set('chat-model', model);
}
