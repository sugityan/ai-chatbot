'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { memo } from 'react';
import { UseChatHelpers } from '@ai-sdk/react';

interface SuggestedActionsProps {
  chatId: string;
  append: UseChatHelpers['append'];
}

function PureSuggestedActions({ chatId, append }: SuggestedActionsProps) {
  const suggestedActions = [
    {
      title: 'コードの説明',
      label: 'コードの具体的な説明をお願いします',
      action:
        'このコードについて詳しく説明してください。特に重要な部分や実装の意図を教えてください。',
    },
    {
      title: 'コードレビュー',
      label: '改善点を見つけてください',
      action:
        'このコードをレビューして、改善点や最適化できる箇所を指摘してください。セキュリティ、パフォーマンス、可読性の観点から助言をお願いします。',
    },
    {
      title: 'テストケース',
      label: 'テストケースを提案してください',
      action:
        'このコードのためのテストケースを提案してください。主要な機能、エッジケース、エラーケースを考慮したテストシナリオを教えてください。',
    },
    {
      title: 'What is the weather',
      label: 'in San Francisco?',
      action: 'What is the weather in San Francisco?',
    },
  ];

  return (
    <div data-testid="suggested-actions" className="grid sm:grid-cols-2 gap-2 w-full">
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? 'hidden sm:block' : 'block'}
        >
          <Button
            variant="ghost"
            onClick={async () => {
              window.history.replaceState({}, '', `/chat/${chatId}`);

              append({
                role: 'user',
                content: suggestedAction.action,
              });
            }}
            className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
          >
            <span className="font-medium">{suggestedAction.title}</span>
            <span className="text-muted-foreground">{suggestedAction.label}</span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(PureSuggestedActions, () => true);
