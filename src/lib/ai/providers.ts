import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { openai } from "@ai-sdk/openai";
import { isTestEnvironment } from "../constants";
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from "./models.test";

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        "chat-model": chatModel,
        "chat-model-reasoning": reasoningModel,
        "title-model": titleModel,
        "artifact-model": artifactModel,
      },
    })
  : customProvider({
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
