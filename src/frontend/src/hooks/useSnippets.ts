import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { NewSnippetForm, Snippet } from "../types";

const QUERY_KEY = ["snippets"] as const;

export function useSnippets() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Snippet[]>({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getSnippets();
      // Map backend Snippet to frontend Snippet (field names match)
      return result as Snippet[];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddSnippet() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: NewSnippetForm) => {
      if (!actor)
        throw new Error(
          "Actor not ready — please wait a moment and try again.",
        );
      return actor.addSnippet(form.title, form.code, form.language, form.tags);
    },
    onSuccess: () => {
      // Invalidate and immediately refetch so the new snippet appears
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      queryClient.refetchQueries({ queryKey: QUERY_KEY });
    },
    onError: (err) => {
      console.error("Failed to add snippet:", err);
    },
  });
}

export function useDeleteSnippet() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor)
        throw new Error(
          "Actor not ready — please wait a moment and try again.",
        );
      return actor.deleteSnippet(id);
    },
    onSuccess: () => {
      // Invalidate and immediately refetch so deleted snippet disappears
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      queryClient.refetchQueries({ queryKey: QUERY_KEY });
    },
    onError: (err) => {
      console.error("Failed to delete snippet:", err);
    },
  });
}
