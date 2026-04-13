import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Snippet {
    id: SnippetId;
    title: string;
    code: string;
    createdAt: bigint;
    tags: string;
    language: string;
}
export type SnippetId = bigint;
export interface backendInterface {
    addSnippet(title: string, code: string, language: string, tags: string): Promise<bigint>;
    deleteSnippet(id: bigint): Promise<boolean>;
    getSnippets(): Promise<Array<Snippet>>;
}
