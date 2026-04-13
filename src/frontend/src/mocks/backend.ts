import type { Snippet, backendInterface } from "../backend";

// In-memory store — mutations are reflected immediately via React Query invalidation
let nextId = BigInt(6);

const store: Snippet[] = [
  {
    id: BigInt(1),
    title: "React useDebounce Hook",
    code: `import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}`,
    language: "TypeScript",
    tags: "react,hooks,typescript,debounce",
    createdAt: BigInt((Date.now() - 3_600_000) * 1_000_000),
  },
  {
    id: BigInt(2),
    title: "Python HTTP GET Request",
    code: `import requests

def fetch_data(url: str) -> dict:
    response = requests.get(url, timeout=10)
    response.raise_for_status()
    return response.json()

data = fetch_data("https://api.example.com/users")
print(data)`,
    language: "Python",
    tags: "python,requests,api,http",
    createdAt: BigInt((Date.now() - 7_200_000) * 1_000_000),
  },
  {
    id: BigInt(3),
    title: "Express.js REST API Setup",
    code: `import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/users", async (req, res) => {
  const users = await db.query("SELECT * FROM users");
  res.json(users);
});

app.listen(3000, () => console.log("Server running on :3000"));`,
    language: "JavaScript",
    tags: "nodejs,express,api,rest",
    createdAt: BigInt((Date.now() - 10_800_000) * 1_000_000),
  },
  {
    id: BigInt(4),
    title: "Tailwind CSS Dark Mode Config",
    code: `// tailwind.config.js
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "oklch(var(--primary) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};`,
    language: "JavaScript",
    tags: "tailwind,config,dark-mode,css",
    createdAt: BigInt((Date.now() - 14_400_000) * 1_000_000),
  },
  {
    id: BigInt(5),
    title: "Git Useful Aliases",
    code: `# Add to ~/.gitconfig

[alias]
  st = status
  co = checkout
  br = branch
  lg = log --oneline --graph --decorate --all
  undo = reset --soft HEAD~1
  aliases = config --get-regexp alias`,
    language: "Bash",
    tags: "git,aliases,productivity,cli",
    createdAt: BigInt((Date.now() - 18_000_000) * 1_000_000),
  },
];

export const mockBackend: backendInterface = {
  getSnippets: async () => [...store],

  addSnippet: async (title, code, language, tags) => {
    const id = nextId;
    nextId = nextId + BigInt(1);
    store.unshift({
      id,
      title,
      code,
      language,
      tags,
      createdAt: BigInt(Date.now() * 1_000_000),
    });
    return id;
  },

  deleteSnippet: async (id) => {
    const idx = store.findIndex((s) => s.id === id);
    if (idx === -1) return false;
    store.splice(idx, 1);
    return true;
  },
};
