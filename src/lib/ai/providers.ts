import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { openai } from "@ai-sdk/openai";

export const myProvider = customProvider({
  languageModels: {
    "chat-model": openai("gpt-4.1-nano"),
    "chat-model-reasoning": wrapLanguageModel({
      model: openai("o1-mini"),
      middleware: extractReasoningMiddleware({ tagName: "think" }),
    }),
    "title-model": openai("gpt-4.1-nano"),
    "artifact-model": openai("gpt-4.1-nano"),
  },
});
