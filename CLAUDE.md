# Renty Beach — site

Site institucional (one-page) do **Hotel Renty Beach**, em Encarnación, Paraguai — hotel
à beira da praia, em frente ao Sambódromo, a 300 m da Playa San José. Projeto reaproveitado
de um site antigo (Pousada Marrocos) e **totalmente reformulado**. O usuário escreve em
português, **não é desenvolvedor** — explicar mudanças de forma simples e mostrar
screenshots/preview antes de concluir.

> ⚠️ **Nenhuma menção à pousada antiga (Marrocos / Raízes).** Já foi tudo removido do site,
> fotos, assets, metadados, sitemap. Se reaparecer qualquer referência, remover.

## Repositório e deploy
- **GitHub:** `homidadeba-jpg/rendy-site`, branch `main`. O usuário conecta/gerencia o git;
  a cada `push` na `main` a **Netlify redeploya sozinha**.
- **Netlify:** configurada via [`netlify.toml`](netlify.toml) — usa **bun** (não npm) e **Node 22**:
  ```
  command = bun install && bun run build
  publish = dist
  SERVER_PRESET = netlify   # preset nitro p/ Netlify (gera dist/ + .netlify/functions-internal/)
  NODE_VERSION = 22         # TanStack Start exige Node >=22.12
  ```
- **Lockfile = `bun.lock`.** NÃO commitar `package-lock.json` (está no `.gitignore`); ele fixava
  `crossws@0.4.15` (versão beta removida do npm) e quebrava o build. Se precisar instalar pacote,
  idealmente usar `bun add <pkg>` pra manter o `bun.lock` em dia.
  - Pendência técnica: o `gsap` foi instalado via npm, então **está no `package.json` mas ainda
    não no `bun.lock`**. Por isso o comando usa `bun install` (sem `--frozen-lockfile`). Quando
    possível, rodar `bun install` uma vez e commitar o `bun.lock` atualizado.

## Stack e estrutura
- **TanStack Start + React 19 + Vite 8 + TypeScript + Tailwind v4 + shadcn/ui + GSAP.**
- Dev: `npm run dev` (ou `bun run dev`) → **porta 8080** (via `.claude/launch.json`). Build: `npm run build`.
- `src/routes/index.tsx` — a página inteira (todas as seções) + a lógica de animação GSAP.
- `src/routes/__root.tsx` — `<head>` (meta/OG em espanhol), favicon (`/brand/renty-beach-logo.jpg`),
  preloads de fontes e da foto do hero; `html lang="es"`.
- `src/i18n.tsx` — **dicionário trilíngue PT/ES/EN** + `LangProvider`/`useI18n`. Default `es`
  (Paraguai), mas detecta idioma do navegador; salva escolha em `localStorage` (`renty-lang`).
- `src/components/Loading.tsx` — tela de entrada: pré-carrega as imagens críticas e só revela o
  site quando prontas (com teto de segurança de 6 s). Mostra a **logo oficial** + animação.
- `src/components/BookingWidget.tsx` — widget de reserva (data entrada/saída + nº de hóspedes)
  que abre o **WhatsApp** com a mensagem pronta.
- `src/components/LangSwitcher.tsx` — botões ES/PT/EN.
- `src/styles.css` — **reescrito do zero** (sistema "costa sofisticada"). Tokens no `:root`.
- `public/fotos/` — 28 fotos do Booking em WebP (`-720` e `-1600`) + `mapa-renty.webp`
  (mapa estático gerado de tiles do OpenStreetMap, com pin dourado).
- `public/brand/` — `renty-beach-logo.jpg` (logo oficial) e `renty-mark.png` (só o ícone da
  casinha, fundo transparente, extraído da logo — usado no header).
- `public/fonts/` — Bodoni Moda (400, 400 italic) e Manrope (500, 700), self-hosted.

## Seções da página (ordem)
Header (logo + nav + seletor de idioma) → **Hero** (foto costanera ao pôr do sol, headline) →
**Widget de reserva** → **Sobre** → **Story** (fotos) → **Quartos** (6 tipos) →
**Experiência/comodidades** (navy, ícones) → **Galeria** (mosaico) → **Avaliações** (Booking) →
**Localização** (mapa clicável) → **CTA** (WhatsApp + Instagram) → **Footer**.

## Decisões de design (combinadas com o usuário)
- **Direção visual:** "praia sofisticada / costa". Navy `#0e2c47`/`#081d30`, areia/creme
  `#e9dfcd`/`#f4eee2`/`#fbf8f2`, acento dourado `#c6973f`/`#d8b26a`. Títulos em Bodoni Moda
  (serif, com itálico dourado), texto em Manrope. Sem "eyebrow/kicker" acima de títulos.
- **Tela de loading:** fundo **branco** (o usuário aprovou), **logo oficial** (não desenho),
  com glow dourado pulsando + leve flutuação + barra de progresso com brilho.
- **Header:** ícone oficial da casinha (`renty-mark.png`) + wordmark "Renty Beach". Branco sobre
  o hero; vira navy quando o header fica sólido (ao rolar). Altura NÃO anima (evita jank).
- **Motion (GSAP + ScrollTrigger):** entrada do hero é o "momento" principal; reveals sutis ao
  rolar (fade + translateY, `once:true`); parallax leve. Chamar `ScrollTrigger.refresh()` após o
  layout assentar (já feito) senão reveals ficam presos em opacity:0. `prefers-reduced-motion`
  respeitado. **Nunca animar width/height/padding/margin** (usar transform/opacity) — o detector
  da skill reclama e trava/"engasga".
- **Trilíngue:** as 3 línguas devem ficar perfeitas. Reservas/quartos/avaliações já traduzidos.
- **Botão de reserva diz só "Reservar"** (ex.: "Reservar agora"), **não** "Reservar pelo WhatsApp".
- **Mapa:** imagem estática clicável (abre Google Maps), **não iframe** (o iframe travava/demorava).

## Reserva (WhatsApp)
- Número: **+595 991 653 249** → `wa.me/595991653249`. O widget monta a mensagem com
  entrada/saída/hóspedes no idioma atual. Todos os CTAs "Reservar" e o Instagram apontam p/ lá.
- Instagram: `https://www.instagram.com/renty_encarnacion/`.

## Dados do negócio (do Booking + Instagram)
- Hotel Renty Beach, **Villarrica & Gral. Aquino 2, 6000 Encarnación, Itapúa, Paraguai**,
  frente ao Sambódromo, 300 m da Playa San José. Registro Senatur N° 483.
- Booking: nota **8,4 (665 avaliações)** — Localização 9,5, Equipe 9,6, WiFi 8,9. Google 4,5 (185).
- Comodidades: café da manhã buffet (continental/americano), WiFi grátis, estacionamento
  privativo grátis, bar, serviço de quarto, quartos família, aluguel de moto elétrica.
- Check-in 13:00–23:30 · check-out até 11:00. Sem pets. Sem festas.
- **6 tipos de quarto** (nomes no `i18n.tsx`): Individual, Duplo Padrão, Duplo c/ banheiro
  privativo, Triplo Padrão, Triplo Conforto, Duplo Grande (familiar). Todos com banheiro
  privativo, ar-condicionado, TV e WiFi.
- Mapa/coords usados: ~ `-27.3289, -55.8747` (em frente ao Sambódromo).

## Skill de design
- Usar a skill **impeccable** para ajustes de UI. Após terminar edições de UI, rodar o detector:
  `C:/Users/debor/.claude/skills/impeccable/scripts/impeccable detect --json <arquivos>` (deve dar `[]`).
- Há uma atualização da skill disponível (v4.5.0) — só mencionar/rodar `npx impeccable update` se o usuário pedir.

## Gotchas do ambiente
- Windows + o preview roda no painel do app (porta 8080). Nos screenshots do painel, **rolar com
  `window.scrollTo({behavior:'instant'})` via javascript_tool** — o scroll por roda do mouse + o
  smooth-scroll às vezes deixam a captura em branco/dessincronizada.
- `vite build` sem env gera preset **Cloudflare** (gera `wrangler.json`/`.wrangler`). Pra Netlify
  é o `SERVER_PRESET=netlify` do `netlify.toml`. Build local de teste: `SERVER_PRESET=netlify npm run build`.
- `sharp` está disponível (usado pra gerar webp, o mapa e o `renty-mark.png`). cwebp/magick NÃO.

## Onde paramos / próximos passos
1. ✅ Site completo e no ar no GitHub. Último ajuste: **corrigir o build da Netlify** (bun + Node 22,
   removido `package-lock.json`). **Aguardando o usuário confirmar se o novo deploy da Netlify passou.**
   Se falhar de novo, pedir o log — possíveis pontos: sincronizar `bun.lock` com o gsap, ou ajustar
   o preset/paths.
2. Possíveis ajustes que o usuário mencionou/pode querer: link "Avaliações" no menu do topo;
   revisar escolha de fotos por tipo de quarto; conferir as 3 línguas; domínio próprio na Netlify.
3. Quando o deploy passar e houver domínio, atualizar `public/sitemap.xml`/OG/canonical se preciso.
