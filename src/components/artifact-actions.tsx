import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { artifactDefinitions, UIArtifact } from "./artifact";
import { Dispatch, memo, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { TextArtifactMetadata } from "@/artifacts/text/client";
import { Metadata as CodeMetadata } from "@/artifacts/code/client";

interface ArtifactActionsProps {
  artifact: UIArtifact;
  handleVersionChange: (type: "next" | "prev" | "toggle" | "latest") => void;
  currentVersionIndex: number;
  isCurrentVersion: boolean;
  mode: "edit" | "diff";
  metadata: TextArtifactMetadata | CodeMetadata;
  setMetadata: Dispatch<SetStateAction<TextArtifactMetadata | CodeMetadata>>;
}

function PureArtifactActions({
  artifact,
  handleVersionChange,
  currentVersionIndex,
  isCurrentVersion,
  mode,
  metadata,
  setMetadata,
}: ArtifactActionsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const artifactDefinition = artifactDefinitions.find(
    (definition) => definition.kind === artifact.kind
  );

  if (!artifactDefinition) {
    throw new Error("Artifact definition not found!");
  }

  // Create a type-safe action context based on the artifact kind
  const actionContext = (() => {
    if (artifact.kind === "text") {
      return {
        content: artifact.content,
        handleVersionChange,
        currentVersionIndex,
        isCurrentVersion,
        mode,
        metadata: metadata as TextArtifactMetadata,
        setMetadata: setMetadata as Dispatch<SetStateAction<TextArtifactMetadata>>,
      };
    } else {
      return {
        content: artifact.content,
        handleVersionChange,
        currentVersionIndex,
        isCurrentVersion,
        mode,
        metadata: metadata as CodeMetadata,
        setMetadata: setMetadata as Dispatch<SetStateAction<CodeMetadata>>,
      };
    }
  })();

  return (
    <div className="flex flex-row gap-1">
      {artifactDefinition.actions.map((action) => (
        <Tooltip key={action.description}>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className={cn("h-fit dark:hover:bg-zinc-700", {
                "p-2": !action.label,
                "py-1.5 px-2": action.label,
              })}
              onClick={async () => {
                setIsLoading(true);
                try {
                  if (artifact.kind === "text") {
                    await Promise.resolve((action as any).onClick(actionContext));
                  } else {
                    await Promise.resolve((action as any).onClick(actionContext));
                  }
                } catch {
                  toast.error("Failed to execute action");
                } finally {
                  setIsLoading(false);
                }
              }}
              disabled={
                isLoading || artifact.status === "streaming"
                  ? true
                  : action.isDisabled
                  ? (action as any).isDisabled(actionContext)
                  : false
              }
            >
              {action.icon}
              {action.label}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{action.description}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}

export const ArtifactActions = memo(
  PureArtifactActions,
  (prevProps, nextProps) => {
    if (prevProps.artifact.status !== nextProps.artifact.status) return false;
    if (prevProps.currentVersionIndex !== nextProps.currentVersionIndex)
      return false;
    if (prevProps.isCurrentVersion !== nextProps.isCurrentVersion) return false;
    if (prevProps.artifact.content !== nextProps.artifact.content) return false;
    return true;
  }
);
