import 'server-only';
import { createClient } from '@/utils/supabase/client';
import type { Database } from '@/types/supabase';
import type { ArtifactKind } from '@/components/artifact';
import {
  user,
  chat,
  type User,
  document,
  suggestion,
  message,
  vote,
  type DBMessage,
  type Chat,
} from './schema';
const supabase = createClient();

// Types from the schema
type ChatType = Database['public']['Tables']['Chat']['Row'];
type MessageType = Database['public']['Tables']['Message_v2']['Row'];
type Suggestion = Database['public']['Tables']['Suggestion']['Row'];
type DocumentType = Database['public']['Tables']['Document']['Row'];

export async function saveChat({
  id,
  userId,
  title,
}: {
  id: ChatType['id'];
  userId: ChatType['user_id'];
  title: ChatType['title'];
}) {
  try {
    const { error } = await supabase.from('Chat').insert({
      id,
      user_id: userId,
      title,
      createdAt: new Date().toISOString(),
    });

    if (error) throw error;
  } catch (error) {
    console.error('Failed to save chat in database');
    throw error;
  }
}

export async function deleteChatById({ id }: { id: ChatType['id'] }) {
  try {
    // First delete related votes
    const { error: voteError } = await supabase.from('Vote_v2').delete().eq('chatId', id);

    if (voteError) throw voteError;

    // Then delete messages
    const { error: messageError } = await supabase.from('Message_v2').delete().eq('chatId', id);

    if (messageError) throw messageError;

    // Finally delete the chat
    const { error: chatError } = await supabase.from('Chat').delete().eq('id', id);

    if (chatError) throw chatError;
  } catch (error) {
    console.error('Failed to delete chat by id from database');
    throw error;
  }
}

export async function getChatsByUserId({
  id,
  limit,
  startingAfter,
  endingBefore,
}: {
  id: ChatType['user_id'];
  limit: number;
  startingAfter: string | null;
  endingBefore: string | null;
}) {
  try {
    let query = supabase
      .from('Chat')
      .select('*')
      .eq('user_id', id)
      .order('createdAt', { ascending: false })
      .limit(limit + 1);

    if (startingAfter) {
      const { data: selectedChat } = await supabase
        .from('Chat')
        .select('createdAt')
        .eq('id', startingAfter)
        .single();

      if (!selectedChat) {
        throw new Error(`Chat with id ${startingAfter} not found`);
      }

      query = query.gt('createdAt', selectedChat.createdAt);
    } else if (endingBefore) {
      const { data: selectedChat } = await supabase
        .from('Chat')
        .select('createdAt')
        .eq('id', endingBefore)
        .single();

      if (!selectedChat) {
        throw new Error(`Chat with id ${endingBefore} not found`);
      }

      query = query.lt('createdAt', selectedChat.createdAt);
    }

    const { data: filteredChats, error } = await query;

    if (error) throw error;

    const hasMore = (filteredChats?.length || 0) > limit;
    const chats = hasMore ? filteredChats!.slice(0, limit) : filteredChats;

    return {
      chats: chats || [],
      hasMore,
    };
  } catch (error) {
    console.error('Failed to get chats by user from database');
    throw error;
  }
}

export async function getChatById({ id }: { id: string }) {
  try {
    const { data, error } = await supabase.from('Chat').select('*').eq('id', id).single();

    // if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to get chat by id from database');
    throw error;
  }
}

export async function saveMessages({ messages }: { messages: Array<DBMessage> }) {
  try {
    const { error } = await supabase.from('Message_v2').insert(messages);

    if (error) throw error;
  } catch (error) {
    console.error('Failed to save messages in database', error);
    throw error;
  }
}

export async function getMessagesByChatId({ ChatId }: { ChatId: ChatType['id'] }) {
  try {
    const { data, error } = await supabase
      .from('Message_v2')
      .select('*')
      .eq('chatId', ChatId)
      .order('createdAt', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Failed to get messages by chat id from database', error);
    throw error;
  }
}

export async function voteMessage({
  chatId,
  messageId,
  type,
}: {
  chatId: ChatType['id'];
  messageId: MessageType['id'];
  type: 'up' | 'down';
}) {
  try {
    // Check for existing vote
    const { data: existingVote, error: selectError } = await supabase
      .from('Vote_v2')
      .select('*')
      .eq('messageId', messageId)
      .single();

    if (selectError && selectError.code !== 'PGRST116') throw selectError;

    if (existingVote) {
      const { error: updateError } = await supabase
        .from('Vote_v2')
        .update({ isUpvoted: type === 'up' })
        .eq('messageId', messageId)
        .eq('chatId', chatId);

      if (updateError) throw updateError;
    } else {
      const { error: insertError } = await supabase.from('Vote_v2').insert({
        chatId,
        messageId,
        isUpvoted: type === 'up',
      });

      if (insertError) throw insertError;
    }
  } catch (error) {
    console.error('Failed to vote message in database', error);
    throw error;
  }
}

export async function getVotesByChatId({ ChatId }: { ChatId: ChatType['id'] }) {
  try {
    const { data, error } = await supabase.from('Vote_v2').select('*').eq('chatId', ChatId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Failed to get votes by chat id from database');
    throw error;
  }
}

export async function saveDocument({
  id,
  title,
  kind,
  content,
  userId,
}: {
  id: DocumentType['id'];
  title: DocumentType['title'];
  kind: ArtifactKind;
  content: DocumentType['content'];
  userId: DocumentType['userId'];
}) {
  try {
    const { error } = await supabase.from('Document').insert({
      id,
      title,
      kind,
      content,
      user_id: userId,
      createdAt: new Date().toISOString(),
    });

    if (error) throw error;
  } catch (error) {
    console.error('Failed to save document in database');
    throw error;
  }
}

export async function getDocumentsById({ id }: { id: string }) {
  try {
    const { data, error } = await supabase
      .from('Document')
      .select('*')
      .eq('id', id)
      .order('createdAt', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Failed to get document by id from database');
    throw error;
  }
}

export async function getDocumentById({ id }: { id: string }) {
  try {
    const { data, error } = await supabase
      .from('Document')
      .select('*')
      .eq('id', id)
      .order('createdAt', { ascending: false })
      .limit(1)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to get document by id from database');
    throw error;
  }
}

export async function deleteDocumentsByIdAfterTimestamp({
  id,
  timestamp,
}: {
  id: string;
  timestamp: Date;
}) {
  try {
    // First delete related suggestions
    const { error: suggestionError } = await supabase
      .from('Suggestion')
      .delete()
      .eq('documentId', id)
      .gt('documentCreatedAt', timestamp.toISOString());

    if (suggestionError) throw suggestionError;

    // Then delete documents
    const { data, error: documentError } = await supabase
      .from('Document')
      .delete()
      .eq('id', id)
      .gt('createdAt', timestamp.toISOString())
      .select();

    if (documentError) throw documentError;
    return data;
  } catch (error) {
    console.error('Failed to delete documents by id after timestamp from database');
    throw error;
  }
}

export async function saveSuggestions({ suggestions }: { suggestions: Array<Suggestion> }) {
  try {
    const { error } = await supabase.from('Suggestion').insert(suggestions);

    if (error) throw error;
  } catch (error) {
    console.error('Failed to save suggestions in database');
    throw error;
  }
}

export async function getSuggestionsByDocumentId({ documentId }: { documentId: string }) {
  try {
    const { data, error } = await supabase
      .from('Suggestion')
      .select('*')
      .eq('documentId', documentId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Failed to get suggestions by document version from database');
    throw error;
  }
}

export async function getMessageById({ id }: { id: string }) {
  try {
    const { data, error } = await supabase.from('Message_v2').select('*').eq('id', id);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Failed to get message by id from database');
    throw error;
  }
}

export async function deleteMessagesByChatIdAfterTimestamp({
  chatId,
  timestamp,
}: {
  chatId: string;
  timestamp: Date;
}) {
  try {
    const { data: messagesToDelete, error: selectError } = await supabase
      .from('Message_v2')
      .select('id')
      .eq('chatId', chatId)
      .gte('createdAt', timestamp.toISOString());

    if (selectError) throw selectError;

    const messageIds = messagesToDelete?.map(message => message.id) || [];

    if (messageIds.length > 0) {
      // First delete related votes
      const { error: voteDeleteError } = await supabase
        .from('Vote_v2')
        .delete()
        .eq('chatId', chatId)
        .in('messageId', messageIds);

      if (voteDeleteError) throw voteDeleteError;

      // Then delete messages
      const { error: messageDeleteError } = await supabase
        .from('Message_v2')
        .delete()
        .eq('chatId', chatId)
        .in('id', messageIds);

      if (messageDeleteError) throw messageDeleteError;
    }
  } catch (error) {
    console.error('Failed to delete messages by id after timestamp from database');
    throw error;
  }
}

export async function updateChatVisiblityById({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: 'private' | 'public';
}) {
  try {
    const { error } = await supabase.from('Chat').update({ visibility }).eq('id', chatId);

    if (error) throw error;
  } catch (error) {
    console.error('Failed to update chat visibility in database');
    throw error;
  }
}
