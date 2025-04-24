import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { artifactDefinitions, UIArtifact } from "./artifact";
import { Dispatch, memo, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { TextArtifactMetadata } from "@/artifacts/text/client";
import { ArtifactActionContext } from "./create-artifact";

interface ArtifactActionsProps {
  artifact: UIArtifact;
  handleVersionChange: (type: "next" | "prev" | "toggle" | "latest") => void;
  currentVersionIndex: number;
  isCurrentVersion: boolean;
  mode: "edit" | "diff";
  metadata: TextArtifactMetadata;
  setMetadata: Dispatch<SetStateAction<TextArtifactMetadata>>;
}

// Text action context type - using the generic ArtifactActionContext from create-artifact.tsx
type TextActionContext = ArtifactActionContext<TextArtifactMetadata>;

// Define the type for the action's onClick function
type TextActionOnClick = (context: TextActionContext) => Promise<void> | void;

// Define a type for the artifact action with the specific TextActionContext
interface TextArtifactAction {
  icon: React.ReactNode;
  label?: string;
  description: string;
  onClick: TextActionOnClick;
  isDisabled?: (context: TextActionContext) => boolean;
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

  // Get the text artifact definition directly since we only handle text
  const artifactDefinition = artifactDefinitions.find(
    (definition) => definition.kind === "text"
  );

  if (!artifactDefinition) {
    throw new Error("Artifact definition not found!");
  }

  // Create a type-safe action context
  const actionContext: TextActionContext = {
    content: artifact.content,
    handleVersionChange,
    currentVersionIndex,
    isCurrentVersion,
    mode,
    metadata,
    setMetadata,
  };

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
                  // Cast the action to our specific TextArtifactAction type
                  const typedAction = action as TextArtifactAction;
                  await typedAction.onClick(actionContext);
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
                  ? action.isDisabled(actionContext)
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
