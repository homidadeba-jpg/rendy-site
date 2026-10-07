import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function RoomCarousel({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const go = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = (i + images.length) % images.length;
    track.scrollTo({ left: track.clientWidth * clamped, behavior: "smooth" });
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (i !== active) setActive(i);
  };

  return (
    <div className="rc">
      <div className="rc-track" ref={trackRef} onScroll={onScroll}>
        {images.map((src, i) => (
          <div
            key={src}
            className="rc-slide"
            style={{ backgroundImage: `url(/fotos/${src}-720.webp)` }}
            role="img"
            aria-label={`${alt} — ${i + 1}/${images.length}`}
          />
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            className="rc-arrow rc-prev"
            onClick={() => go(active - 1)}
            aria-label="Anterior"
          >
            <ChevronLeft size={18} strokeWidth={2.2} />
          </button>
          <button
            type="button"
            className="rc-arrow rc-next"
            onClick={() => go(active + 1)}
            aria-label="Siguiente"
          >
            <ChevronRight size={18} strokeWidth={2.2} />
          </button>
          <div className="rc-dots" aria-hidden="true">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                className={`rc-dot ${i === active ? "is-active" : ""}`}
                onClick={() => go(i)}
                tabIndex={-1}
              />
            ))}
          </div>
          <span className="rc-count">
            {active + 1} / {images.length}
          </span>
        </>
      )}
    </div>
  );
}
