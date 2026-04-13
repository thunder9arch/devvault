import { useState } from "react";
import { AddSnippetModal } from "./components/AddSnippetModal";
import { Header } from "./components/Header";
import { useTheme } from "./hooks/useTheme";
import { Dashboard } from "./pages/Dashboard";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [search, setSearch] = useState("");
  const [showNewSnippet, setShowNewSnippet] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header
        search={search}
        onSearchChange={setSearch}
        theme={theme}
        onToggleTheme={toggleTheme}
        onNewSnippet={() => setShowNewSnippet(true)}
      />

      <main className="flex-1 pt-14 bg-background" data-ocid="main-content">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Dashboard
            searchQuery={search}
            onNewSnippet={() => setShowNewSnippet(true)}
          />
        </div>
      </main>

      <footer className="border-t border-border bg-card/60 py-4 px-4">
        <div className="max-w-7xl mx-auto text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            caffeine.ai
          </a>
        </div>
      </footer>

      <AddSnippetModal
        open={showNewSnippet}
        onClose={() => setShowNewSnippet(false)}
      />
    </div>
  );
}
