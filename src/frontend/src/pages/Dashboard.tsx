import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Code2, PlusCircle, SearchX } from "lucide-react";
import { useMemo } from "react";
import { SnippetCard } from "../components/SnippetCard";
import { useSnippets } from "../hooks/useSnippets";

interface DashboardProps {
  searchQuery: string;
  onNewSnippet: () => void;
}

function SkeletonCard() {
  return (
    <div className="elevated-card flex flex-col gap-3 p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 space-y-1.5">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-[110px] w-full rounded-md" />
      <div className="flex gap-1.5">
        <Skeleton className="h-5 w-12 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <div className="flex gap-2 pt-1 border-t border-border/50">
        <Skeleton className="h-7 flex-1 rounded-md" />
        <Skeleton className="h-7 w-20 rounded-md" />
      </div>
    </div>
  );
}

export function Dashboard({ searchQuery, onNewSnippet }: DashboardProps) {
  const { data: snippets, isLoading, isError } = useSnippets();

  const filtered = useMemo(() => {
    if (!snippets) return [];
    const q = searchQuery.toLowerCase().trim();
    if (!q) return snippets;
    return snippets.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q) ||
        s.language.toLowerCase().includes(q) ||
        s.tags.toLowerCase().includes(q),
    );
  }, [snippets, searchQuery]);

  if (isError) {
    return (
      <div
        className="flex flex-col items-center justify-center py-24 text-center gap-4"
        data-ocid="error-state"
      >
        <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center">
          <Code2 className="w-7 h-7 text-destructive" />
        </div>
        <div>
          <p className="font-display font-semibold text-foreground text-lg">
            Something went wrong
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            Could not load snippets. Please try refreshing.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        data-ocid="snippets-skeleton"
      >
        {(["a", "b", "c", "d", "e", "f"] as const).map((k) => (
          <SkeletonCard key={k} />
        ))}
      </div>
    );
  }

  // No snippets at all (empty vault)
  if (!filtered.length && !searchQuery) {
    return (
      <div
        className="flex flex-col items-center justify-center py-28 text-center gap-5"
        data-ocid="empty-state"
      >
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shadow-sm">
          <Code2 className="w-8 h-8 text-primary" />
        </div>
        <div className="max-w-xs">
          <p className="font-display font-bold text-foreground text-xl">
            Your vault is empty
          </p>
          <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
            Save your first code snippet to get started. All your snippets will
            appear here.
          </p>
        </div>
        <Button
          onClick={onNewSnippet}
          className="gap-2 button-primary"
          data-ocid="empty-state-cta"
        >
          <PlusCircle className="w-4 h-4" />
          Add your first snippet
        </Button>
      </div>
    );
  }

  // No results for search
  if (!filtered.length) {
    return (
      <div
        className="flex flex-col items-center justify-center py-24 text-center gap-4"
        data-ocid="no-results-state"
      >
        <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
          <SearchX className="w-7 h-7 text-muted-foreground" />
        </div>
        <div>
          <p className="font-display font-semibold text-foreground text-lg">
            No results found
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            No snippets match{" "}
            <span className="text-foreground font-mono">"{searchQuery}"</span>.
            Try a different query.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      data-ocid="snippets-grid"
    >
      {filtered.map((snippet) => (
        <SnippetCard key={String(snippet.id)} snippet={snippet} />
      ))}
    </div>
  );
}
