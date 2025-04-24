"use client";

import { useChat } from "@ai-sdk/react";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { artifactDefinitions, ArtifactKind, UIArtifact } from "./artifact";
import { Suggestion } from "@/lib/db/schema";
import { initialArtifactData, useArtifact } from "@/hooks/use-artifact";

// Define a union type for the content based on the delta type
type DeltaContent<T extends DataStreamDeltaType> = T extends "suggestion"
  ? Suggestion
  : T extends "kind"
  ? ArtifactKind
  : string;

// Define the delta type as a string literal union
export type DataStreamDeltaType =
  | "text-delta"
  | "code-delta"
  | "sheet-delta"
  | "image-delta"
  | "title"
  | "id"
  | "suggestion"
  | "clear"
  | "finish"
  | "kind";

// Define a generic DataStreamDelta type that ensures content type matches the delta type
export type TypedDataStreamDelta<
  T extends DataStreamDeltaType = DataStreamDeltaType
> = {
  type: T;
  content: DeltaContent<T>;
};

// Union of all possible typed deltas
export type DataStreamDelta = TypedDataStreamDelta;

export function DataStreamHandler({ id }: { id: string }) {
  const { data: dataStream } = useChat({ id });
  const { artifact, setArtifact, setMetadata } = useArtifact();
  const lastProcessedIndex = useRef(-1);

  useEffect(() => {
    if (!dataStream?.length) return;

    const newDeltas = dataStream.slice(
      lastProcessedIndex.current + 1
    ) as DataStreamDelta[];
    lastProcessedIndex.current = dataStream.length - 1;

    newDeltas.forEach((delta) => {
      const artifactDefinition = artifactDefinitions.find(
        (artifactDefinition) => artifactDefinition.kind === artifact.kind
      );

      if (artifactDefinition?.onStreamPart) {
        // Use a type assertion to tell TypeScript that this function call is safe
        // We know that the artifact definition's onStreamPart method is compatible with our setMetadata function
        // because the artifact definition is specific to the current artifact kind

        // Define a union type for all possible metadata types
        type ArtifactMetadata =
          | import("@/artifacts/text/client").TextArtifactMetadata
          | import("@/artifacts/code/client").Metadata;

        const onStreamPartFn = artifactDefinition.onStreamPart as (args: {
          streamPart: DataStreamDelta;
          setArtifact: Dispatch<SetStateAction<UIArtifact>>;
          setMetadata: Dispatch<SetStateAction<ArtifactMetadata>>;
        }) => void;

        onStreamPartFn({
          streamPart: delta,
          setArtifact,
          setMetadata,
        });
      }

      setArtifact((draftArtifact) => {
        if (!draftArtifact) {
          return { ...initialArtifactData, status: "streaming" };
        }

        switch (delta.type) {
          case "id": {
            const typedDelta = delta as TypedDataStreamDelta<"id">;
            return {
              ...draftArtifact,
              documentId: typedDelta.content,
              status: "streaming",
            };
          }

          case "title": {
            const typedDelta = delta as TypedDataStreamDelta<"title">;
            return {
              ...draftArtifact,
              title: typedDelta.content,
              status: "streaming",
            };
          }

          case "kind": {
            const typedDelta = delta as TypedDataStreamDelta<"kind">;
            return {
              ...draftArtifact,
              kind: typedDelta.content,
              status: "streaming",
            };
          }

          case "clear":
            return {
              ...draftArtifact,
              content: "",
              status: "streaming",
            };

          case "finish":
            return {
              ...draftArtifact,
              status: "idle",
            };

          default:
            return draftArtifact;
        }
      });
    });
  }, [dataStream, setArtifact, setMetadata, artifact]);

  return null;
}
