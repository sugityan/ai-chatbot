export const DEFAULT_CHAT_MODEL: string = 'chat-model';

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'chat-model',
    name: 'Chat model',
    description: '最も高性能な GPT-4 モデル',
  },
  {
    id: 'chat-model-reasoning',
    name: 'Reasoning model',
    description: '最もパワフルな o1 モデル',
  },
];
