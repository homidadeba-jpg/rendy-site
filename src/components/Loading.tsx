import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n";

/** Images that must be decoded before we reveal the page. */
const CRITICAL = [
  "/brand/renty-beach-logo.jpg",
  "/fotos/hero-costanera-1600.webp",
  "/fotos/hero-costanera-720.webp",
  "/fotos/sunset-palmeiras-1600.webp",
  "/fotos/quarto-vista-1600.webp",
  "/fotos/cafe-prato-720.webp",
];

function preload(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

export default function Loading({ onDone }: { onDone: () => void }) {
  const { t } = useI18n();
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    let done = 0;
    const total = CRITICAL.length;
    const bump = () => {
      done += 1;
      setProgress(Math.round((done / total) * 100));
    };

    const minDelay = new Promise<void>((r) => setTimeout(r, 900));
    const safety = new Promise<void>((r) => setTimeout(r, 6000)); // never hang

    Promise.race([
      Promise.all([...CRITICAL.map((s) => preload(s).then(bump)), minDelay]),
      safety,
    ]).then(() => {
      setProgress(100);
      setLeaving(true);
      setTimeout(onDone, 720);
    });
  }, [onDone]);

  return (
    <div className={`loader ${leaving ? "loader-out" : ""}`} aria-hidden={leaving}>
      <div className="loader-inner">
        <img className="loader-logo" src="/brand/renty-beach-logo.jpg" alt="Renty Beach" width={168} height={168} />
        <div className="loader-track">
          <span className="loader-fill" style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
        <p className="loader-caption">{t.loading}</p>
      </div>
    </div>
  );
}
