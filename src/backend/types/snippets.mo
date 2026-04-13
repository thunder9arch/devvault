module {
  public type SnippetId = Nat;

  public type Snippet = {
    id : SnippetId;
    title : Text;
    code : Text;
    language : Text;
    tags : Text;
    createdAt : Int;
  };
};
