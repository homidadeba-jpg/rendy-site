---
target: site Pousada Marrocos (home)
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:C:\\Users\\debor\\OneDrive\\Área de Trabalho\\ld-01\\src\\routes\\index.tsx"
target_fingerprint: "sha256:480055493e75ec60e731661ecee3b69e5aa5eaa91e24b51fcd493efd2aad849b"
target_path: "C:\\Users\\debor\\OneDrive\\Área de Trabalho\\ld-01\\src\\routes\\index.tsx"
timestamp: 2026-10-04T23-27-10Z
slug: src-routes-index-tsx
---
Method: dual-agent (A: design review · B: detector + browser evidence)

## Design Health Score (Persuade surface; H7, H10 n/a)
| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of status | 3 | Nothing warns that "Reservar" opens WhatsApp |
| 2 | Match real world | 3 | "Reservar" implies instant booking; it is a chat |
| 3 | User control | 3 | Lightbox/menu exits fine; no Esc on mobile menu |
| 4 | Consistency | 2 | One action, 4 labels, 4 button styles |
| 5 | Error prevention | 3 | WhatsApp prefill lacks dates/guests |
| 6 | Recognition | 3 | OK |
| 7 | Flexibility | n/a | One-path marketing page |
| 8 | Aesthetic/minimal | 3 | Mobile .experience long black void |
| 9 | Error recovery | 2 | No phone/email fallback if WhatsApp unavailable |
| 10 | Help/docs | n/a | Persuade surface |
| Total | | 22/32 (69%) | Acceptable, near Good |

## Design specificity
Authored: louver hero, road-sign + illustrated map, real 4,5/159 proof. Interchangeable: every h2 is upright line + italic aphorism; generic 4-icon amenity grid; Bodoni+Manrope black/cream default luxury; brand story (why "Marrocos") absent. Detector: 12 broken-image = false positives (Img component); CSS clean.

## Priority issues
1. [P1] No price / practical info before WhatsApp handoff (clarify)
2. [P1] Inconsistent, weakened CTAs; final booking CTA is a thin underline next to Instagram (polish/distill)
3. [P1] Accessibility: carousel auto-advances with no pause (WCAG 2.2.2); lightbox no focus move/trap/restore; footer copyright 3.58:1 contrast fails AA (harden/audit)
4. [P2] Hero choreography ~2.6s not tied to image load; mobile LCP 3.18s (logo seal is LCP); 1600w hero at DPR3 (optimize/animate)
5. [P2] Motion after the fold is generic fade-up kit; brand motif disappears; infinite map pulse; reveals invisible if JS fails (animate)
6. [P2] .rooms too thin for a decision; mobile .experience void (shape/layout)

## Persona red flags
Jordan: Reservar opens WhatsApp unannounced; no price/check-in/room types. Riley: per-character h1 spans; louvers mask a still-loading image on slow nets; .reveal-on-scroll hidden without JS; no fallback number. Casey: hero choreography stacks on 3G load; carousel arrows hidden on touch until 0.85 opacity; 38px arrows.

## Minor
Logo square edge in footer; desktop nav 11px; very short review quotes; dark booking photo; legacy CSS layers (1794 lines, dead heroReveal/lineUp keyframes); <header>/<footer> inside <main>; Bodoni not preloaded.

## Questions
Why "Marrocos"? Would one honest price line convert more than the aphorisms? Should the shutter motif open and close the whole page?
