import Types "../types/snippets";
import SnippetsLib "../lib/snippets";
import List "mo:core/List";

mixin (snippets : List.List<Types.Snippet>, counter : { var nextId : Nat }) {
  public func addSnippet(
    title : Text,
    code : Text,
    language : Text,
    tags : Text,
  ) : async Nat {
    let (snippet, newId) = SnippetsLib.add(snippets, counter.nextId, title, code, language, tags);
    counter.nextId := newId;
    snippet.id;
  };

  public query func getSnippets() : async [Types.Snippet] {
    SnippetsLib.getAll(snippets);
  };

  public func deleteSnippet(id : Nat) : async Bool {
    SnippetsLib.delete(snippets, id);
  };
};
