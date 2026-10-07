import { useState } from "react";
import { CalendarDays, Users, ArrowRight } from "lucide-react";
import { useI18n } from "../i18n";

const WA_NUMBER = "595991653249"; // +595 991 653 249

function todayISO(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

function fmt(iso: string, lang: string) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  const locale = lang === "pt" ? "pt-BR" : lang === "en" ? "en-US" : "es-PY";
  return d.toLocaleDateString(locale, { day: "2-digit", month: "short", year: "numeric" });
}

export default function BookingWidget() {
  const { t, lang } = useI18n();
  const [checkin, setCheckin] = useState(todayISO(1));
  const [checkout, setCheckout] = useState(todayISO(3));
  const [guests, setGuests] = useState(2);
  const [error, setError] = useState("");

  const minOut = checkin ? todayISO(0) : todayISO(1);

  const submit = () => {
    if (!checkin || !checkout) {
      setError(t.booking.checkin + " / " + t.booking.checkout);
      return;
    }
    if (checkout <= checkin) {
      setError(
        lang === "pt"
          ? "A saída deve ser após a entrada."
          : lang === "en"
            ? "Check-out must be after check-in."
            : "La salida debe ser posterior a la entrada."
      );
      return;
    }
    setError("");
    const msg = t.booking.waMessage(fmt(checkin, lang), fmt(checkout, lang), guests);
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bw">
      <span className="bw-label">{t.booking.label}</span>
      <div className="bw-row">
        <label className="bw-field">
          <span className="bw-field-label">
            <CalendarDays size={14} strokeWidth={1.75} /> {t.booking.checkin}
          </span>
          <input
            type="date"
            value={checkin}
            min={todayISO(0)}
            onChange={(e) => {
              setCheckin(e.target.value);
              if (checkout <= e.target.value) {
                const d = new Date(e.target.value + "T00:00:00");
                d.setDate(d.getDate() + 2);
                setCheckout(d.toISOString().slice(0, 10));
              }
            }}
          />
        </label>

        <span className="bw-sep" aria-hidden="true" />

        <label className="bw-field">
          <span className="bw-field-label">
            <CalendarDays size={14} strokeWidth={1.75} /> {t.booking.checkout}
          </span>
          <input
            type="date"
            value={checkout}
            min={minOut}
            onChange={(e) => setCheckout(e.target.value)}
          />
        </label>

        <span className="bw-sep" aria-hidden="true" />

        <label className="bw-field">
          <span className="bw-field-label">
            <Users size={14} strokeWidth={1.75} /> {t.booking.guests}
          </span>
          <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? t.booking.guest : t.booking.guestsPlural}
              </option>
            ))}
          </select>
        </label>

        <button type="button" className="bw-submit" onClick={submit}>
          {t.booking.submit}
          <ArrowRight size={16} strokeWidth={2} />
        </button>
      </div>
      {error ? (
        <p className="bw-error" role="alert">
          {error}
        </p>
      ) : (
        <p className="bw-note">{t.booking.note}</p>
      )}
    </div>
  );
}
