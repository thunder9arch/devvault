# Design Brief — DevVault

## Aesthetic & Tone
Industrial-refined developer tool. Dark-mode-first with premium polish. Serious, focused, code-optimized.

## Color Palette

| Role | Light Mode | Dark Mode | Usage |
|------|-----------|-----------|-------|
| Background | 0.97 L (neutral white) | 0.09 L (deep charcoal) | Page background |
| Card | 0.99 L | 0.15 L | Snippet cards, elevated surfaces |
| Primary (Indigo) | 0.4 L, 60° hue | 0.65 L, 60° hue | CTA buttons, highlights |
| Secondary (Teal) | accent only | 0.65 L, 180° hue | Accents, secondary actions |
| Muted | 0.92 L | 0.2 L | Borders, dividers, backgrounds |
| Foreground | 0.25 L (dark) | 0.93 L (bright) | Body text, high contrast |
| Destructive | 0.55 L, 25° hue | 0.65 L, 22° hue | Delete actions |

## Typography

| Layer | Font | Scale |
|-------|------|-------|
| Display | Space Grotesk (geometric, bold) | 32px–48px headings |
| Body | General Sans (neutral, readable) | 16px body, 14px secondary |
| Code | Geist Mono (monospace, technical) | 13px snippets, 12px inline code |

## Structural Zones

| Zone | Treatment |
|------|-----------|
| Header | Dark background (card color), bottom border, navigation left-aligned |
| Content Grid | 3-col desktop / 1-col mobile, card-based snippets on muted background |
| Footer | Minimal, muted text, top border (optional) |
| Modal | Popover background, centered, shadow-lg, fade-in animation |

## Component Patterns

- **Cards**: elevated-card utility (bg-card, shadow-md, rounded-lg, border)
- **Buttons**: Primary (indigo), Secondary (muted), Icon (no bg)
- **Code blocks**: code-block utility (monospace, muted bg, bordered)
- **Tags**: badge style with muted background, border-border
- **Input**: bg-input, border-input, focus:ring-primary

## Spacing & Rhythm

- Grid gap: 1.5rem desktop, 1rem mobile
- Card padding: 1.5rem
- Radius: 10px (lg), 8px (md), 6px (sm)
- Density: Compact header, generous whitespace in card content

## Motion

- Transitions: smooth (0.3s cubic-bezier(0.4, 0, 0.2, 1))
- Modal enter: fade-in + slide-up (staggered)
- Hover: subtle bg shift (5–10% opacity change)
- Copy feedback: brief success toast (optional)

## Differentiation

Code-optimized UI: high contrast on snippets, language badges with accent color, monospace rendering preserves readability. Dark mode removes eye strain for extended use.

## Constraints

- No generic gradients or neon effects
- Shadows serve depth only, never glow
- Border radius: intentional variation (0, 6px, 10px, full)
- No animations on interactive elements that slow user flow

