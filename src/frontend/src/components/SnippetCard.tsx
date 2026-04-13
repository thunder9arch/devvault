import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Copy, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDeleteSnippet } from "../hooks/useSnippets";
import type { Snippet } from "../types";

const LANG_COLORS: Record<string, string> = {
  javascript: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  typescript: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  python: "bg-green-500/15 text-green-400 border-green-500/30",
  rust: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  go: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  css: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  html: "bg-red-500/15 text-red-400 border-red-500/30",
  sql: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
  bash: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  other: "bg-muted text-muted-foreground border-border",
};

function getLangColor(language: string): string {
  return LANG_COLORS[language.toLowerCase()] ?? LANG_COLORS.other;
}

function formatDate(createdAt: bigint): string {
  const ms = Number(createdAt / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface SnippetCardProps {
  snippet: Snippet;
}

export function SnippetCard({ snippet }: SnippetCardProps) {
  const [copied, setCopied] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const deleteSnippet = useDeleteSnippet();

  const previewLines = snippet.code.split("\n").slice(0, 5).join("\n");
  const tags = snippet.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDelete = () => {
    if (confirmDelete) {
      deleteSnippet.mutate(snippet.id);
      setConfirmDelete(false);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  return (
    <article
      className="elevated-card flex flex-col gap-3 p-4 transition-smooth hover:shadow-xl hover:-translate-y-0.5 group"
      data-ocid={`snippet-card-${snippet.id}`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2 min-w-0">
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-semibold text-sm text-foreground truncate leading-tight">
            {snippet.title}
          </h3>
          <time className="text-xs text-muted-foreground mt-0.5 block">
            {formatDate(snippet.createdAt)}
          </time>
        </div>
        <span
          className={`shrink-0 text-xs px-2 py-0.5 rounded-full border font-mono font-medium ${getLangColor(snippet.language)}`}
        >
          {snippet.language}
        </span>
      </div>

      {/* Code preview */}
      <div className="code-block text-xs leading-relaxed whitespace-pre overflow-hidden max-h-[110px] relative">
        {previewLines}
        {snippet.code.split("\n").length > 5 && (
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-muted/80 to-transparent pointer-events-none" />
        )}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 min-w-0">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs px-2 py-0 font-mono"
              data-ocid={`snippet-tag-${tag}`}
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 mt-auto pt-1 border-t border-border/50">
        <Button
          size="sm"
          variant="ghost"
          className="flex-1 h-7 gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
          onClick={handleCopy}
          data-ocid="snippet-copy-btn"
          aria-label={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-accent" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </Button>

        <Button
          size="sm"
          variant="ghost"
          className={`h-7 gap-1.5 text-xs font-medium transition-smooth ${
            confirmDelete
              ? "text-destructive hover:text-destructive hover:bg-destructive/10"
              : "text-muted-foreground hover:text-destructive"
          }`}
          onClick={handleDelete}
          disabled={deleteSnippet.isPending}
          data-ocid="snippet-delete-btn"
          aria-label={confirmDelete ? "Confirm delete" : "Delete snippet"}
        >
          <Trash2 className="w-3.5 h-3.5" />
          {confirmDelete ? "Confirm?" : "Delete"}
        </Button>
      </div>
    </article>
  );
}
