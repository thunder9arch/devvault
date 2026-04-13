import Types "../types/snippets";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";

module {
  public type Snippet = Types.Snippet;
  public type SnippetId = Types.SnippetId;

  func trim(t : Text) : Text {
    t.trim(#predicate(func(c) { c == ' ' or c == '\t' or c == '\n' or c == '\r' }))
  };

  public func add(
    snippets : List.List<Snippet>,
    nextId : Nat,
    title : Text,
    code : Text,
    language : Text,
    tags : Text,
  ) : (Snippet, Nat) {
    let snippet : Snippet = {
      id = nextId;
      title = trim(title);
      code = code;
      language = trim(language);
      tags = trim(tags);
      createdAt = Time.now();
    };
    snippets.add(snippet);
    (snippet, nextId + 1);
  };

  public func getAll(snippets : List.List<Snippet>) : [Snippet] {
    let arr = snippets.toArray();
    arr.reverse();
  };

  public func delete(snippets : List.List<Snippet>, id : SnippetId) : Bool {
    let sizeBefore = snippets.size();
    let kept = snippets.filter(func(s) { s.id != id });
    snippets.clear();
    snippets.append(kept);
    snippets.size() < sizeBefore;
  };
};
