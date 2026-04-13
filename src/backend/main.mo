import Types "types/snippets";
import SnippetsMixin "mixins/snippets-api";
import List "mo:core/List";

actor {
  let snippets = List.empty<Types.Snippet>();
  let counter = { var nextId : Nat = 0 };

  include SnippetsMixin(snippets, counter);
};
