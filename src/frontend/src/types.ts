export interface Snippet {
  id: bigint;
  title: string;
  code: string;
  language: string;
  tags: string;
  createdAt: bigint;
}

export interface NewSnippetForm {
  title: string;
  code: string;
  language: string;
  tags: string;
}
