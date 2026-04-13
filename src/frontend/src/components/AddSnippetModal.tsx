import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAddSnippet } from "../hooks/useSnippets";
import type { NewSnippetForm } from "../types";

const LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Rust",
  "Go",
  "CSS",
  "HTML",
  "SQL",
  "Bash",
  "Other",
];

const EMPTY_FORM: NewSnippetForm = {
  title: "",
  code: "",
  language: "JavaScript",
  tags: "",
};

interface AddSnippetModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddSnippetModal({ open, onClose }: AddSnippetModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [form, setForm] = useState<NewSnippetForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof NewSnippetForm, string>>
  >({});
  const addSnippet = useAddSnippet();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [open]);

  const handleClose = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const rect = dialogRef.current?.getBoundingClientRect();
    if (!rect) return;
    const { clientX, clientY } = e;
    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      handleClose();
    }
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof NewSnippetForm, string>> = {};
    if (!form.title.trim()) next.title = "Title is required";
    if (!form.code.trim()) next.code = "Code is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await addSnippet.mutateAsync(form);
      handleClose();
    } catch {
      // mutation errors surface via addSnippet.isError
    }
  };

  const field = <K extends keyof NewSnippetForm>(key: K) => ({
    value: form[key],
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
  });

  return (
    <dialog
      ref={dialogRef}
      className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-lg mx-auto p-0 backdrop:bg-black/60 backdrop:backdrop-blur-sm open:animate-slide-up focus:outline-none"
      onClose={handleClose}
      onClick={handleBackdropClick}
      onKeyDown={(e) => e.key === "Escape" && handleClose()}
      aria-labelledby="add-snippet-title"
      data-ocid="add-snippet-modal"
    >
      {/* Stop inner clicks from bubbling to backdrop handler */}
      <div
        className="p-6"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2
              id="add-snippet-title"
              className="font-display font-bold text-lg text-foreground leading-tight"
            >
              New Snippet
            </h2>
            <p className="text-muted-foreground text-sm mt-0.5">
              Save a reusable code snippet to your vault.
            </p>
          </div>
          <button
            type="button"
            className="button-icon text-muted-foreground hover:text-foreground -mt-1 -mr-2"
            onClick={handleClose}
            aria-label="Close modal"
            data-ocid="modal-close-btn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          noValidate
        >
          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="snippet-title">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="snippet-title"
              placeholder="e.g. React useDebounce hook"
              {...field("title")}
              aria-invalid={!!errors.title}
              data-ocid="snippet-title-input"
            />
            {errors.title && (
              <p className="text-destructive text-xs">{errors.title}</p>
            )}
          </div>

          {/* Language */}
          <div className="space-y-1.5">
            <Label id="language-label">Language</Label>
            <Select
              value={form.language}
              onValueChange={(val) =>
                setForm((prev) => ({ ...prev, language: val }))
              }
            >
              <SelectTrigger
                aria-label="Snippet language"
                aria-labelledby="language-label"
                data-ocid="snippet-language-select"
              >
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Code */}
          <div className="space-y-1.5">
            <Label htmlFor="snippet-code">
              Code <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="snippet-code"
              placeholder="Paste your code here..."
              className="font-mono text-sm min-h-[180px] resize-y"
              {...field("code")}
              aria-invalid={!!errors.code}
              data-ocid="snippet-code-input"
            />
            {errors.code && (
              <p className="text-destructive text-xs">{errors.code}</p>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <Label htmlFor="snippet-tags">
              Tags{" "}
              <span className="text-muted-foreground font-normal text-xs">
                (comma-separated)
              </span>
            </Label>
            <Input
              id="snippet-tags"
              placeholder="e.g. react, hooks, typescript"
              {...field("tags")}
              data-ocid="snippet-tags-input"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              type="submit"
              className="flex-1 button-primary"
              disabled={addSnippet.isPending}
              data-ocid="snippet-submit-btn"
            >
              {addSnippet.isPending ? "Saving…" : "Save Snippet"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="button-secondary"
              onClick={handleClose}
              data-ocid="snippet-cancel-btn"
            >
              Cancel
            </Button>
          </div>

          {addSnippet.isError && (
            <p className="text-destructive text-xs text-center">
              Failed to save snippet. Please try again.
            </p>
          )}
        </form>
      </div>
    </dialog>
  );
}
