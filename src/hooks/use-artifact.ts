"use client";

import { TextArtifactMetadata } from "@/artifacts/text/client";
import { Metadata as CodeMetadata } from "@/artifacts/code/client";
import useSWR from "swr";
import { UIArtifact } from "@/components/artifact";
import { useCallback, useMemo } from "react";
import { Dispatch, SetStateAction } from "react";

export const initialArtifactData: UIArtifact = {
  documentId: "init",
  content: "",
  kind: "text",
  title: "",
  status: "idle",
  isVisible: false,
  boundingBox: {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
};

type ArtifactMetadata = TextArtifactMetadata | CodeMetadata;

type Selector<T> = (state: UIArtifact) => T;

export function useArtifactSelector<Selected>(selector: Selector<Selected>) {
  const { data: localArtifact } = useSWR<UIArtifact>("artifact", null, {
    fallbackData: initialArtifactData,
  });

  const selectedValue = useMemo(() => {
    if (!localArtifact) return selector(initialArtifactData);
    return selector(localArtifact);
  }, [localArtifact, selector]);

  return selectedValue;
}

export function useArtifact() {
  const { data: localArtifact, mutate: setLocalArtifact } = useSWR<UIArtifact>(
    "artifact",
    null,
    {
      fallbackData: initialArtifactData,
    }
  );

  const artifact = useMemo(() => {
    if (!localArtifact) return initialArtifactData;
    return localArtifact;
  }, [localArtifact]);

  const setArtifact = useCallback(
    (updaterFn: UIArtifact | ((currentArtifact: UIArtifact) => UIArtifact)) => {
      setLocalArtifact((currentArtifact) => {
        const artifactToUpdate = currentArtifact || initialArtifactData;

        if (typeof updaterFn === "function") {
          return updaterFn(artifactToUpdate);
        }

        return updaterFn;
      });
    },
    [setLocalArtifact]
  );

  const { data: localArtifactMetadata, mutate: setLocalArtifactMetadata } =
    useSWR<ArtifactMetadata | null>(
      () =>
        artifact.documentId ? `artifact-metadata-${artifact.documentId}` : null,
      null,
      {
        fallbackData: null,
      }
    );

  // Transform the SWR mutator into a React setState-style function
  const setMetadata = useCallback<Dispatch<SetStateAction<ArtifactMetadata>>>(
    (update) => {
      setLocalArtifactMetadata((current) => {
        const nextState =
          typeof update === "function"
            ? update(current as ArtifactMetadata)
            : update;
        return nextState;
      });
    },
    [setLocalArtifactMetadata]
  );

  return useMemo(
    () => ({
      artifact,
      setArtifact,
      metadata: localArtifactMetadata as ArtifactMetadata,
      setMetadata,
    }),
    [artifact, setArtifact, localArtifactMetadata, setMetadata]
  );
}
