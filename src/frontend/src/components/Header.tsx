import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Code2, Moon, Plus, Search, Sun } from "lucide-react";

interface HeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
  onNewSnippet: () => void;
}

export function Header({
  search,
  onSearchChange,
  theme,
  onToggleTheme,
  onNewSnippet,
}: HeaderProps) {
  return (
    <header
      className="fixed top-0 inset-x-0 z-40 h-14 bg-card border-b border-border shadow-sm"
      data-ocid="header"
    >
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <Code2 className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-foreground text-lg tracking-tight">
            DevVault
          </span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md relative" data-ocid="search-input">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Search snippets…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-9 bg-muted/40 border-border/60 placeholder:text-muted-foreground focus-visible:ring-ring"
            aria-label="Search snippets"
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted/40"
            onClick={onToggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            data-ocid="theme-toggle"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>

          {/* New snippet */}
          <Button
            size="sm"
            className="h-9 gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
            onClick={onNewSnippet}
            data-ocid="new-snippet-btn"
          >
            <Plus className="w-4 h-4" />
            New Snippet
          </Button>
        </div>
      </div>
    </header>
  );
}
