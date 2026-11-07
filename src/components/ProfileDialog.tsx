import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { copy, type Language } from "../data";
import type { Profile } from "../profile";

interface Props {
  lang: Language;
  profile: Profile;
  onSave: (profile: Profile) => void;
  onClose: () => void;
}

export default function ProfileDialog({
  lang,
  profile,
  onSave,
  onClose,
}: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState(profile);
  const [error, setError] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    dialog.current?.showModal();
    return () => dialog.current?.close();
  }, []);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const clean = Object.fromEntries(
      Object.entries(draft).map(([key, value]) => [key, value.trim()]),
    ) as unknown as Profile;
    const validLink = (value: string) => {
      if (!value) return true;
      try {
        return new URL(value).protocol === "https:";
      } catch {
        return false;
      }
    };
    if (
      (clean.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email)) ||
      !validLink(clean.github) ||
      !validLink(clean.linkedin)
    ) {
      setError(true);
      return;
    }
    onSave(clean);
    onClose();
  }

  return (
    <dialog
      ref={dialog}
      className="profile-dialog"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      aria-labelledby="profile-title"
    >
      <div className="dialog-head">
        <span className="eyebrow">{t.settingsLabel}</span>
        <button className="icon-button" onClick={onClose} aria-label={t.close}>
          <X size={20} />
        </button>
      </div>
      <h2 id="profile-title">{t.settingsTitle}</h2>
      <p>{t.settingsIntro}</p>
      <form onSubmit={submit}>
        {(["name", "email", "github", "linkedin"] as const).map((key) => (
          <label key={key}>
            {t[key]}
            <input
              autoFocus={key === "name"}
              type={key === "email" ? "email" : key === "name" ? "text" : "url"}
              value={draft[key]}
              maxLength={key === "name" ? 80 : 300}
              autoComplete={
                key === "email" ? "email" : key === "name" ? "name" : "url"
              }
              placeholder={
                key === "github" || key === "linkedin" ? "https://" : ""
              }
              onChange={(event) =>
                setDraft({ ...draft, [key]: event.target.value })
              }
            />
          </label>
        ))}
        {error && (
          <p role="alert" className="form-error">
            {t.invalid}
          </p>
        )}
        <button className="button button-primary" type="submit">
          {t.save}
          <ArrowUpRight size={18} />
        </button>
      </form>
    </dialog>
  );
}
