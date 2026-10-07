import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "pt" | "es" | "en";
export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "es", label: "ES", flag: "🇵🇾" },
  { code: "pt", label: "PT", flag: "🇧🇷" },
  { code: "en", label: "EN", flag: "🇺🇸" },
];

type Room = { name: string; beds: string; desc: string; chips: string[] };
type Amenity = { title: string; desc: string };

export type Dict = {
  nav: { rooms: string; experience: string; gallery: string; location: string; book: string };
  loading: string;
  hero: {
    place: string;
    title1: string;
    titleItalic: string;
    title2: string;
    lead: string;
    cta: string;
    scroll: string;
  };
  booking: {
    label: string;
    checkin: string;
    checkout: string;
    guests: string;
    guest: string;
    guestsPlural: string;
    submit: string;
    note: string;
    waMessage: (ci: string, co: string, g: number) => string;
  };
  about: { title1: string; titleItalic: string; lead: string; body: string };
  story: { tag: string; line: string };
  rooms: { title1: string; titleItalic: string; intro: string; cta: string; list: Room[] };
  experience: { title1: string; titleItalic: string; intro: string; amenities: Amenity[] };
  reviews: {
    title1: string;
    titleItalic: string;
    intro: string;
    score: string;
    scoreLabel: string;
    count: string;
    items: { quote: string; name: string; country: string }[];
  };
  gallery: { title1: string; titleItalic: string; intro: string };
  location: {
    title1: string;
    titleItalic: string;
    body: string;
    address: string;
    directions: string;
  };
  cta: { title1: string; titleItalic: string; body: string; book: string; instagram: string };
  footer: { tagline: string; rights: string; senatur: string };
};

const rich = (ci: string, co: string, g: number, intro: string, inLbl: string, outLbl: string, gLbl: string) =>
  `${intro}\n\n${inLbl}: ${ci || "—"}\n${outLbl}: ${co || "—"}\n${gLbl}: ${g}`;

export const DICT: Record<Lang, Dict> = {
  es: {
    nav: { rooms: "Habitaciones", experience: "Experiencia", gallery: "Galería", location: "Ubicación", book: "Reservar" },
    loading: "Preparando tu estadía",
    hero: {
      place: "Encarnación · Paraguay",
      title1: "Despertá",
      titleItalic: "frente",
      title2: "a la playa",
      lead: "A 300 metros de Playa San José y frente al Sambódromo. El punto exacto de Encarnación para vivir la costa, el sol y las noches de carnaval.",
      cta: "Reservar ahora",
      scroll: "Deslizá",
    },
    booking: {
      label: "Consultá disponibilidad",
      checkin: "Entrada",
      checkout: "Salida",
      guests: "Huéspedes",
      guest: "huésped",
      guestsPlural: "huéspedes",
      submit: "Reservar ahora",
      note: "Te respondemos al instante. Sin intermediarios.",
      waMessage: (ci, co, g) =>
        rich(ci, co, g, "¡Hola Renty Beach! Quiero reservar una habitación.", "Entrada", "Salida", "Huéspedes"),
    },
    about: {
      title1: "La costa de Encarnación,",
      titleItalic: "a tu puerta",
      lead: "Renty Beach nace en el corazón de la zona mejor valorada de la ciudad: a pasos de la playa, de la Costanera y del Sambódromo.",
      body: "Habitaciones cómodas y luminosas, desayuno abundante y un equipo que te recibe con mate, café y la calidez paraguaya. Puntuación 9,6 en atención: la gente vuelve por cómo la tratamos.",
    },
    story: { tag: "Playa San José · 300 m", line: "A cinco minutos caminando del agua." },
    rooms: {
      title1: "Habitaciones para",
      titleItalic: "cada viaje",
      intro: "Seis tipos de habitación, todas con baño privado, aire acondicionado, TV de pantalla plana y WiFi gratis.",
      cta: "Consultar",
      list: [
        { name: "Individual", beds: "1 cama individual", desc: "Ideal para quien viaja solo. Práctica, silenciosa y con todo lo necesario a mano.", chips: ["1 persona", "Baño privado", "WiFi gratis"] },
        { name: "Doble Estándar", beds: "1 cama doble grande", desc: "El clásico de Renty: amplia, cómoda y a pasos de la playa.", chips: ["2 personas", "Cama doble", "Aire acond."] },
        { name: "Doble con baño privado", beds: "1 cama doble grande", desc: "Más espacio y privacidad, con baño propio y amenities incluidos.", chips: ["2 personas", "Baño privado", "Amenities"] },
        { name: "Triple Estándar", beds: "2 individuales + 1 doble", desc: "Pensada para grupos de amigos o familias pequeñas.", chips: ["3 personas", "3 camas", "Familiar"] },
        { name: "Triple Confort", beds: "2 individuales + 1 doble", desc: "La triple con un plus de confort y detalles cuidados.", chips: ["3 personas", "Confort", "TV smart"] },
        { name: "Doble Grande", beds: "1 individual + 1 doble", desc: "Nuestra habitación más amplia, perfecta para familias.", chips: ["Hasta 4", "Amplia", "Familiar"] },
      ],
    },
    experience: {
      title1: "Todo incluido para",
      titleItalic: "quedarte",
      intro: "Lo que hace que la gente puntúe Renty con un 9,5 en ubicación y un 9,6 en atención.",
      amenities: [
        { title: "Desayuno buffet", desc: "Continental y americano, abundante, con frutas, panes y café." },
        { title: "WiFi gratis", desc: "Internet veloz en todo el hotel, puntuado 8,9 por los huéspedes." },
        { title: "Estacionamiento", desc: "Parking privado gratuito dentro del predio." },
        { title: "Bar & servicio a la habitación", desc: "Un trago o un snack, a cualquier hora." },
        { title: "Moto eléctrica", desc: "Alquilá una y recorré la Costanera a tu ritmo." },
        { title: "A 300 m de la playa", desc: "Frente al Sambódromo, cinco minutos del agua." },
      ],
    },
    reviews: {
      title1: "Lo que dicen",
      titleItalic: "los huéspedes",
      intro: "665 opiniones en Booking y una puntuación de 9,6 en atención. Esto es lo que más valoran.",
      score: "8,4",
      scoreLabel: "Muy bien",
      count: "665 opiniones · Booking",
      items: [
        { quote: "La calidad humana de las personas. Todas brindan un servicio extraordinario. Además la ubicación es excepcional.", name: "Iván", country: "Colombia" },
        { quote: "La cálida atención, la ubicación estratégica y el desayuno variado y abundante. Hasta se puede alquilar moto eléctrica.", name: "Ezequiel", country: "Paraguay" },
        { quote: "El personal de recepción, Sol y Maxi, encantadores y muy atentos. La relación precio-calidad es muy buena.", name: "Lombardo", country: "España" },
        { quote: "La cama muy cómoda, el baño muy limpio y la ducha reparadora. Volvería sin dudarlo.", name: "Caromat", country: "Argentina" },
      ],
    },
    gallery: { title1: "Mirá cada", titleItalic: "rincón", intro: "La recepción, el desayuno, las habitaciones y la costa que te espera afuera." },
    location: {
      title1: "En el mejor punto",
      titleItalic: "de la ciudad",
      body: "Frente al Sambódromo y a 300 metros de Playa San José. Cerca de la Costanera, restaurantes y la vida nocturna de Encarnación.",
      address: "Villarrica & Gral. Aquino 2, 6000 Encarnación, Paraguay",
      directions: "Cómo llegar",
    },
    cta: {
      title1: "Tu lugar",
      titleItalic: "frente al mar",
      body: "Escribinos y asegurá tu habitación. Respuesta inmediata, atención personal y el mejor precio directo.",
      book: "Reservar ahora",
      instagram: "Seguinos",
    },
    footer: { tagline: "Hotel frente a la playa en Encarnación", rights: "Todos los derechos reservados.", senatur: "Registro Senatur N° 483" },
  },

  pt: {
    nav: { rooms: "Quartos", experience: "Experiência", gallery: "Galeria", location: "Localização", book: "Reservar" },
    loading: "Preparando sua estadia",
    hero: {
      place: "Encarnación · Paraguai",
      title1: "Acorde",
      titleItalic: "de frente",
      title2: "para a praia",
      lead: "A 300 metros da Praia San José e em frente ao Sambódromo. O ponto exato de Encarnación para viver a costa, o sol e as noites de carnaval.",
      cta: "Reservar agora",
      scroll: "Role",
    },
    booking: {
      label: "Consulte disponibilidade",
      checkin: "Entrada",
      checkout: "Saída",
      guests: "Hóspedes",
      guest: "hóspede",
      guestsPlural: "hóspedes",
      submit: "Reservar agora",
      note: "Respondemos na hora. Sem intermediários.",
      waMessage: (ci, co, g) =>
        rich(ci, co, g, "Olá, Renty Beach! Quero reservar um quarto.", "Entrada", "Saída", "Hóspedes"),
    },
    about: {
      title1: "A costa de Encarnación,",
      titleItalic: "na sua porta",
      lead: "O Renty Beach fica no coração da área mais bem avaliada da cidade: a poucos passos da praia, da Costanera e do Sambódromo.",
      body: "Quartos confortáveis e iluminados, café da manhã farto e uma equipe que recebe você com mate, café e o calor paraguaio. Nota 9,6 em atendimento: as pessoas voltam pelo jeito que são tratadas.",
    },
    story: { tag: "Praia San José · 300 m", line: "A cinco minutos a pé da água." },
    rooms: {
      title1: "Quartos para",
      titleItalic: "cada viagem",
      intro: "Seis tipos de quarto, todos com banheiro privativo, ar-condicionado, TV de tela plana e WiFi grátis.",
      cta: "Consultar",
      list: [
        { name: "Individual", beds: "1 cama de solteiro", desc: "Ideal para quem viaja sozinho. Prática, silenciosa e com tudo à mão.", chips: ["1 pessoa", "Banheiro privativo", "WiFi grátis"] },
        { name: "Duplo Padrão", beds: "1 cama de casal king", desc: "O clássico do Renty: amplo, confortável e a passos da praia.", chips: ["2 pessoas", "Cama de casal", "Ar-cond."] },
        { name: "Duplo com banheiro privativo", beds: "1 cama de casal king", desc: "Mais espaço e privacidade, com banheiro próprio e amenities.", chips: ["2 pessoas", "Banheiro privativo", "Amenities"] },
        { name: "Triplo Padrão", beds: "2 solteiros + 1 casal", desc: "Pensado para grupos de amigos ou famílias pequenas.", chips: ["3 pessoas", "3 camas", "Familiar"] },
        { name: "Triplo Conforto", beds: "2 solteiros + 1 casal", desc: "O triplo com um plus de conforto e detalhes caprichados.", chips: ["3 pessoas", "Conforto", "Smart TV"] },
        { name: "Duplo Grande", beds: "1 solteiro + 1 casal", desc: "Nosso quarto mais amplo, perfeito para famílias.", chips: ["Até 4", "Amplo", "Familiar"] },
      ],
    },
    experience: {
      title1: "Tudo incluído para",
      titleItalic: "você ficar",
      intro: "O que faz as pessoas darem nota 9,5 em localização e 9,6 em atendimento ao Renty.",
      amenities: [
        { title: "Café da manhã buffet", desc: "Continental e americano, farto, com frutas, pães e café." },
        { title: "WiFi grátis", desc: "Internet rápida em todo o hotel, nota 8,9 dos hóspedes." },
        { title: "Estacionamento", desc: "Estacionamento privativo gratuito dentro do hotel." },
        { title: "Bar & serviço de quarto", desc: "Um drink ou um lanche, a qualquer hora." },
        { title: "Moto elétrica", desc: "Alugue uma e percorra a Costanera no seu ritmo." },
        { title: "A 300 m da praia", desc: "Em frente ao Sambódromo, cinco minutos da água." },
      ],
    },
    reviews: {
      title1: "O que dizem",
      titleItalic: "os hóspedes",
      intro: "665 avaliações no Booking e nota 9,6 em atendimento. Isto é o que mais elogiam.",
      score: "8,4",
      scoreLabel: "Muito bom",
      count: "665 avaliações · Booking",
      items: [
        { quote: "A qualidade humana das pessoas. Todas oferecem um serviço extraordinário. E a localização é excepcional.", name: "Iván", country: "Colômbia" },
        { quote: "O atendimento caloroso, a localização estratégica e o café da manhã variado e farto. Dá até pra alugar moto elétrica.", name: "Ezequiel", country: "Paraguai" },
        { quote: "A recepção, Sol e Maxi, encantadores e muito atenciosos. O custo-benefício é muito bom.", name: "Lombardo", country: "Espanha" },
        { quote: "A cama muito confortável, o banheiro muito limpo e o chuveiro revigorante. Voltaria sem pensar duas vezes.", name: "Caromat", country: "Argentina" },
      ],
    },
    gallery: { title1: "Veja cada", titleItalic: "cantinho", intro: "A recepção, o café da manhã, os quartos e a costa que espera do lado de fora." },
    location: {
      title1: "No melhor ponto",
      titleItalic: "da cidade",
      body: "Em frente ao Sambódromo e a 300 metros da Praia San José. Perto da Costanera, de restaurantes e da vida noturna de Encarnación.",
      address: "Villarrica & Gral. Aquino 2, 6000 Encarnación, Paraguai",
      directions: "Como chegar",
    },
    cta: {
      title1: "Seu lugar",
      titleItalic: "de frente pro mar",
      body: "Fale com a gente e garanta seu quarto. Resposta imediata, atendimento pessoal e o melhor preço direto.",
      book: "Reservar agora",
      instagram: "Siga a gente",
    },
    footer: { tagline: "Hotel de frente para a praia em Encarnación", rights: "Todos os direitos reservados.", senatur: "Registro Senatur N° 483" },
  },

  en: {
    nav: { rooms: "Rooms", experience: "Experience", gallery: "Gallery", location: "Location", book: "Book" },
    loading: "Preparing your stay",
    hero: {
      place: "Encarnación · Paraguay",
      title1: "Wake up",
      titleItalic: "steps",
      title2: "from the beach",
      lead: "300 metres from San José Beach and right across from the Sambadrome. The exact spot in Encarnación to live the coast, the sun and the carnival nights.",
      cta: "Book now",
      scroll: "Scroll",
    },
    booking: {
      label: "Check availability",
      checkin: "Check-in",
      checkout: "Check-out",
      guests: "Guests",
      guest: "guest",
      guestsPlural: "guests",
      submit: "Book now",
      note: "We reply instantly. No middlemen.",
      waMessage: (ci, co, g) =>
        rich(ci, co, g, "Hi Renty Beach! I'd like to book a room.", "Check-in", "Check-out", "Guests"),
    },
    about: {
      title1: "Encarnación's coast,",
      titleItalic: "at your door",
      lead: "Renty Beach sits in the heart of the city's highest-rated area: steps from the beach, the Costanera and the Sambadrome.",
      body: "Comfortable, bright rooms, a generous breakfast and a team that welcomes you with mate, coffee and Paraguayan warmth. Rated 9.6 for service — people come back for how they're treated.",
    },
    story: { tag: "San José Beach · 300 m", line: "A five-minute walk from the water." },
    rooms: {
      title1: "Rooms for",
      titleItalic: "every trip",
      intro: "Six room types, all with private bathroom, air conditioning, flat-screen TV and free WiFi.",
      cta: "Enquire",
      list: [
        { name: "Single", beds: "1 single bed", desc: "Perfect for solo travellers. Practical, quiet and with everything at hand.", chips: ["1 guest", "Private bath", "Free WiFi"] },
        { name: "Standard Double", beds: "1 king bed", desc: "The Renty classic: spacious, comfortable and steps from the beach.", chips: ["2 guests", "Double bed", "A/C"] },
        { name: "Double with private bath", beds: "1 king bed", desc: "More room and privacy, with its own bathroom and amenities.", chips: ["2 guests", "Private bath", "Amenities"] },
        { name: "Standard Triple", beds: "2 singles + 1 double", desc: "Made for groups of friends or small families.", chips: ["3 guests", "3 beds", "Family"] },
        { name: "Comfort Triple", beds: "2 singles + 1 double", desc: "The triple with extra comfort and thoughtful details.", chips: ["3 guests", "Comfort", "Smart TV"] },
        { name: "Large Double", beds: "1 single + 1 double", desc: "Our most spacious room, perfect for families.", chips: ["Up to 4", "Spacious", "Family"] },
      ],
    },
    experience: {
      title1: "Everything you need to",
      titleItalic: "stay",
      intro: "What earns Renty a 9.5 for location and a 9.6 for service from its guests.",
      amenities: [
        { title: "Buffet breakfast", desc: "Continental and American, generous, with fruit, breads and coffee." },
        { title: "Free WiFi", desc: "Fast internet throughout the hotel, rated 8.9 by guests." },
        { title: "Free parking", desc: "Private, free parking inside the property." },
        { title: "Bar & room service", desc: "A drink or a snack, any time of day." },
        { title: "Electric scooter", desc: "Rent one and cruise the Costanera at your own pace." },
        { title: "300 m from the beach", desc: "Across from the Sambadrome, five minutes from the water." },
      ],
    },
    reviews: {
      title1: "What guests",
      titleItalic: "are saying",
      intro: "665 reviews on Booking and a 9.6 for service. Here's what they love most.",
      score: "8.4",
      scoreLabel: "Very good",
      count: "665 reviews · Booking",
      items: [
        { quote: "The human warmth of the people. Everyone gives extraordinary service. And the location is exceptional.", name: "Iván", country: "Colombia" },
        { quote: "The warm welcome, the strategic location and the varied, generous breakfast. You can even rent an electric scooter.", name: "Ezequiel", country: "Paraguay" },
        { quote: "The front-desk team, Sol and Maxi, lovely and attentive. The value for money is excellent.", name: "Lombardo", country: "Spain" },
        { quote: "Very comfortable bed, spotless bathroom and a refreshing shower. I'd come back without hesitation.", name: "Caromat", country: "Argentina" },
      ],
    },
    gallery: { title1: "See every", titleItalic: "corner", intro: "The lobby, the breakfast, the rooms and the coast waiting just outside." },
    location: {
      title1: "In the best spot",
      titleItalic: "in town",
      body: "Across from the Sambadrome and 300 metres from San José Beach. Close to the Costanera, restaurants and Encarnación's nightlife.",
      address: "Villarrica & Gral. Aquino 2, 6000 Encarnación, Paraguay",
      directions: "Get directions",
    },
    cta: {
      title1: "Your place",
      titleItalic: "by the sea",
      body: "Message us and secure your room. Instant reply, personal service and the best direct rate.",
      book: "Book now",
      instagram: "Follow us",
    },
    footer: { tagline: "Beachfront hotel in Encarnación", rights: "All rights reserved.", senatur: "Senatur Registry N° 483" },
  },
};

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "es",
  setLang: () => {},
  t: DICT.es,
});

function detectLang(): Lang {
  if (typeof navigator === "undefined") return "es";
  const n = navigator.language.toLowerCase();
  if (n.startsWith("pt")) return "pt";
  if (n.startsWith("en")) return "en";
  return "es";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const saved = (typeof localStorage !== "undefined" && localStorage.getItem("renty-lang")) as Lang | null;
    setLangState(saved && DICT[saved] ? saved : detectLang());
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("renty-lang", l);
    } catch {
      /* ignore */
    }
    if (typeof document !== "undefined") document.documentElement.lang = l;
  };

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  return <LangCtx.Provider value={{ lang, setLang, t: DICT[lang] }}>{children}</LangCtx.Provider>;
}

export const useI18n = () => useContext(LangCtx);
