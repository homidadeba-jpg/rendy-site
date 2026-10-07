import { LANGS, useI18n } from "../i18n";

export default function LangSwitcher({ variant = "light" }: { variant?: "light" | "dark" }) {
  const { lang, setLang } = useI18n();
  return (
    <div className={`lang lang-${variant}`} role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          className={`lang-btn ${lang === l.code ? "is-active" : ""}`}
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          lang={l.code}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
