import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  MapPin,
  ArrowRight,
  Instagram,
  Star,
  Quote,
  Wifi,
  Coffee,
  Car,
  Wine,
  Bike,
  Waves,
} from "lucide-react";
import { LangProvider, useI18n } from "../i18n";
import LangSwitcher from "../components/LangSwitcher";
import BookingWidget from "../components/BookingWidget";
import RoomCarousel from "../components/RoomCarousel";
import Loading from "../components/Loading";

export const Route = createFileRoute("/")({
  component: Page,
});

const WA = "https://wa.me/595991653249";
const IG = "https://www.instagram.com/renty_encarnacion/";

const ROOM_IMG: string[][] = [
  ["quarto-individual", "corredor", "banho"],
  ["quarto-doble", "quarto-doble-elegante", "banho2"],
  ["quarto-doble-baho", "banho", "banho2"],
  ["quarto-triple", "quarto-navy", "banho"],
  ["quarto-triple-confort", "quarto-vista", "banho2"],
  ["quarto-doble-grande", "quarto-familia", "quarto-vista"],
];
const AMENITY_ICONS = [Coffee, Wifi, Car, Wine, Bike, Waves];

function Page() {
  return (
    <LangProvider>
      <Site />
    </LangProvider>
  );
}

function Site() {
  const { t } = useI18n();
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // GSAP motion — runs after the page is revealed.
  useEffect(() => {
    if (!loaded) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      // Ignore the mobile URL-bar show/hide resize so the parallax triggers
      // don't recompute mid-scroll.
      ScrollTrigger.config({ ignoreMobileResize: true });

      ctx = gsap.context(() => {
        // Hero entrance — the one authored moment.
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(".hero-photo", { scale: 1.12, duration: 1.8, ease: "power2.out" }, 0)
          .from(".hero-line > *", { yPercent: 115, duration: 1.1, stagger: 0.09 }, 0.25)
          .from(".hero-place", { opacity: 0, y: 14, duration: 0.8 }, 0.5)
          .from(".hero-lead", { opacity: 0, y: 20, duration: 0.9 }, 0.7)
          .from(".hero-cta", { opacity: 0, y: 18, duration: 0.8 }, 0.85)
          .from(".scroll-cue", { opacity: 0, duration: 0.8 }, 1.0)
          .from(".bw", { opacity: 0, y: 40, duration: 0.9 }, 0.95);

        // Gentle parallax on the large feature photos.
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.to(el, {
            yPercent: -9,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });

        requestAnimationFrame(() => ScrollTrigger.refresh());
        window.addEventListener("load", () => ScrollTrigger.refresh());
      }, rootRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [loaded]);

  // Scroll reveals — geometry-based. An element reveals once its top crosses
  // 86% of the viewport height. getBoundingClientRect is always accurate (unlike
  // GSAP ScrollTrigger / IntersectionObserver here, which mismeasured on mobile
  // and froze reveals), and a safety timeout guarantees nothing stays hidden.
  useEffect(() => {
    if (!loaded) return;
    const root = rootRef.current;
    if (!root) return;

    const els = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-group] > *")
    );
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // CSS leaves them visible

    els.forEach((el) => el.classList.add("rv"));
    let pending = els;

    const reveal = () => {
      const line = window.innerHeight * 0.86;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top < line) {
          el.classList.add("rv-in");
          return false;
        }
        return true;
      });
      if (pending.length === 0) stop();
    };
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        reveal();
      });
    };
    const stop = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(safety);
    };
    // Absolute safety net: reveal anything still hidden, so a reveal can never
    // leave content permanently invisible.
    const safety = window.setTimeout(() => {
      pending.forEach((el) => el.classList.add("rv-in"));
      pending = [];
      stop();
    }, 4000);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    reveal(); // reveal what's already on screen
    return stop;
  }, [loaded]);

  const go = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {!loaded && <Loading onDone={() => setLoaded(true)} />}

      <div ref={rootRef} className={`site ${loaded ? "site-ready" : ""}`}>
        <header className={`header ${scrolled ? "header-solid" : ""}`}>
          <a href="#top" className="brand" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <img className="brand-mark" src="/brand/renty-mark.png" alt="" aria-hidden="true" />
            <span className="brand-words">
              <span className="brand-name">Renty</span>
              <span className="brand-sub">Beach</span>
            </span>
          </a>

          <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
            <button className="nav-link" onClick={() => go("rooms")}>{t.nav.rooms}</button>
            <button className="nav-link" onClick={() => go("experience")}>{t.nav.experience}</button>
            <button className="nav-link" onClick={() => go("gallery")}>{t.nav.gallery}</button>
            <button className="nav-link" onClick={() => go("location")}>{t.nav.location}</button>
            <a className="nav-book" href={WA} target="_blank" rel="noopener noreferrer">
              {t.nav.book} <ArrowRight size={14} strokeWidth={2} />
            </a>
            <div className="nav-lang"><LangSwitcher variant="dark" /></div>
          </nav>

          <div className="header-right">
            <LangSwitcher variant={scrolled ? "dark" : "light"} />
            <button
              className="menu-button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </header>

        {/* HERO */}
        <section className="hero" id="top">
          <div
            className="hero-photo"
            data-parallax
            style={{ backgroundImage: "image-set(url(/fotos/hero-costanera-1600.webp) 1x)" }}
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="hero-place">{t.hero.place}</p>
            <h1 className="hero-title">
              <span className="hero-line"><span>{t.hero.title1}</span></span>
              <span className="hero-line"><em>{t.hero.titleItalic}</em></span>
              <span className="hero-line"><span>{t.hero.title2}</span></span>
            </h1>
            <p className="hero-lead">{t.hero.lead}</p>
            <a className="hero-cta" href={WA} target="_blank" rel="noopener noreferrer">
              {t.hero.cta} <ArrowRight size={16} strokeWidth={2} />
            </a>
          </div>
          <div className="scroll-cue">
            <span>{t.hero.scroll}</span>
            <i />
          </div>
        </section>

        {/* BOOKING WIDGET */}
        <div className="bw-wrap">
          <BookingWidget />
        </div>

        {/* ABOUT */}
        <section className="about">
          <div className="about-grid">
            <h2 className="section-title" data-reveal>
              {t.about.title1} <em>{t.about.titleItalic}</em>
            </h2>
            <div data-reveal>
              <p className="lead-copy">{t.about.lead}</p>
              <p className="body-copy">{t.about.body}</p>
            </div>
          </div>
        </section>

        {/* VISUAL STORY */}
        <section className="story">
          <div className="story-large" data-parallax style={{ backgroundImage: "url(/fotos/sunset-palmeiras-1600.webp)" }} />
          <div className="story-small" style={{ backgroundImage: "url(/fotos/patio-720.webp)" }} />
          <div className="story-note" data-reveal>
            <strong>{t.story.line}</strong>
            <span>{t.story.tag}</span>
          </div>
        </section>

        {/* ROOMS */}
        <section className="rooms" id="rooms">
          <div className="rooms-intro">
            <h2 className="section-title" data-reveal>
              {t.rooms.title1} <em>{t.rooms.titleItalic}</em>
            </h2>
            <p className="body-copy" data-reveal>{t.rooms.intro}</p>
          </div>

          <div className="room-grid" data-reveal-group>
            {t.rooms.list.map((room, i) => (
              <article className="room-card" key={room.name}>
                <RoomCarousel images={ROOM_IMG[i]} alt={room.name} />
                <div className="room-body">
                  <h3 className="room-name">{room.name}</h3>
                  <p className="room-beds">{room.beds}</p>
                  <p className="room-desc">{room.desc}</p>
                  <div className="room-chips">
                    {room.chips.map((c) => (
                      <span key={c}>{c}</span>
                    ))}
                  </div>
                  <a className="room-link" href={WA} target="_blank" rel="noopener noreferrer">
                    {t.rooms.cta} <ArrowRight size={13} strokeWidth={2} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="experience" id="experience">
          <div className="experience-head">
            <h2 className="section-title light" data-reveal>
              {t.experience.title1} <em>{t.experience.titleItalic}</em>
            </h2>
            <p className="experience-intro" data-reveal>{t.experience.intro}</p>
          </div>

          <div className="amenities" data-reveal-group>
            {t.experience.amenities.map((a, i) => {
              const Icon = AMENITY_ICONS[i] ?? Waves;
              return (
                <article className="amenity" key={a.title}>
                  <Icon className="amenity-icon" size={26} strokeWidth={1.4} />
                  <h3>{a.title}</h3>
                  <p>{a.desc}</p>
                </article>
              );
            })}
          </div>

          <div className="experience-photos" data-reveal-group>
            <div className="xp-photo xp-photo-main" data-parallax style={{ backgroundImage: "url(/fotos/cafe-prato-1600.webp)" }} />
            <div className="xp-photo" style={{ backgroundImage: "url(/fotos/recepcao-720.webp)" }} />
            <div className="xp-photo" style={{ backgroundImage: "url(/fotos/lounge-bienvenidos-720.webp)" }} />
          </div>
        </section>

        {/* GALLERY */}
        <section className="gallery" id="gallery">
          <div className="gallery-head">
            <h2 className="section-title" data-reveal>
              {t.gallery.title1} <em>{t.gallery.titleItalic}</em>
            </h2>
            <p className="body-copy" data-reveal>{t.gallery.intro}</p>
          </div>
          <div className="gallery-grid" data-reveal-group>
            <div className="g-item g-1" style={{ backgroundImage: "url(/fotos/quarto-vista-1600.webp)" }} />
            <div className="g-item g-2" style={{ backgroundImage: "url(/fotos/exterior-crepusculo-1600.webp)" }} />
            <div className="g-item g-3" style={{ backgroundImage: "url(/fotos/cafe-frutas-720.webp)" }} />
            <div className="g-item g-4" style={{ backgroundImage: "url(/fotos/lounge-mapa-720.webp)" }} />
            <div className="g-item g-5" style={{ backgroundImage: "url(/fotos/quarto-navy-720.webp)" }} />
            <div className="g-item g-6" style={{ backgroundImage: "url(/fotos/fachada-renty-720.webp)" }} />
          </div>
        </section>

        {/* REVIEWS */}
        <section className="reviews" id="reviews-section">
          <div className="reviews-head">
            <div data-reveal>
              <h2 className="section-title">
                {t.reviews.title1} <em>{t.reviews.titleItalic}</em>
              </h2>
              <p className="body-copy reviews-intro">{t.reviews.intro}</p>
            </div>
            <div className="score" data-reveal>
              <span className="score-num">{t.reviews.score}</span>
              <span className="score-stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={15} strokeWidth={0} fill="currentColor" />
                ))}
              </span>
              <span className="score-label">{t.reviews.scoreLabel}</span>
              <span className="score-count">{t.reviews.count}</span>
            </div>
          </div>

          <div className="reviews-grid" data-reveal-group>
            {t.reviews.items.map((r) => (
              <figure className="review" key={r.name}>
                <Quote className="review-mark" size={30} strokeWidth={1.4} aria-hidden="true" />
                <blockquote>{r.quote}</blockquote>
                <figcaption>
                  <span className="review-name">{r.name}</span>
                  <span className="review-country">{r.country}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* LOCATION */}
        <section className="location" id="location">
          <div className="location-copy" data-reveal>
            <h2 className="section-title">
              {t.location.title1} <em>{t.location.titleItalic}</em>
            </h2>
            <p className="body-copy">{t.location.body}</p>
            <p className="address">
              <MapPin size={18} strokeWidth={1.6} />
              {t.location.address}
            </p>
            <a
              className="text-link"
              href="https://www.google.com/maps/search/?api=1&query=Renty+Beach+Encarnacion"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.location.directions} <ArrowRight size={13} strokeWidth={2} />
            </a>
          </div>
          <a
            className="map"
            data-reveal
            href="https://www.google.com/maps/search/?api=1&query=Renty+Beach+Encarnacion"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.location.directions}
          >
            <img
              className="map-img"
              src="/fotos/mapa-renty.webp"
              alt={t.location.address}
              loading="lazy"
              width={1200}
              height={620}
            />
            <span className="map-cta">
              <MapPin size={15} strokeWidth={2} /> {t.location.directions}
            </span>
            <span className="map-credit">© OpenStreetMap</span>
          </a>
        </section>

        {/* CTA */}
        <section className="cta">
          <div className="cta-photo" style={{ backgroundImage: "url(/fotos/hero-costanera-1600.webp)" }} />
          <div className="cta-content" data-reveal>
            <h2 className="section-title light">
              {t.cta.title1} <em>{t.cta.titleItalic}</em>
            </h2>
            <p className="cta-body">{t.cta.body}</p>
            <div className="cta-actions">
              <a className="btn-primary" href={WA} target="_blank" rel="noopener noreferrer">
                {t.cta.book} <ArrowRight size={16} strokeWidth={2} />
              </a>
              <a className="btn-ghost" href={IG} target="_blank" rel="noopener noreferrer">
                <Instagram size={16} strokeWidth={1.7} /> {t.cta.instagram}
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-brand">
            <span className="brand-name">Renty</span>
            <span className="brand-sub">Beach</span>
            <p>{t.footer.tagline}</p>
          </div>
          <div className="footer-contact">
            <a href={WA} target="_blank" rel="noopener noreferrer">WhatsApp +595 991 653 249</a>
            <a href={IG} target="_blank" rel="noopener noreferrer">@renty_encarnacion</a>
            <span>{t.location.address}</span>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Renty Beach — {t.footer.rights}</span>
            <span>{t.footer.senatur}</span>
          </div>
        </footer>
      </div>
    </>
  );
}
