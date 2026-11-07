---
name: Ganjina-e-Adab
colors:
  surface: '#fcf9f2'
  surface-dim: '#dcdad3'
  surface-bright: '#fcf9f2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ec'
  surface-container: '#f0eee7'
  surface-container-high: '#ebe8e1'
  surface-container-highest: '#e5e2db'
  on-surface: '#1c1c18'
  on-surface-variant: '#45464d'
  inverse-surface: '#31312c'
  inverse-on-surface: '#f3f0ea'
  outline: '#76777e'
  outline-variant: '#c6c6ce'
  surface-tint: '#535e7d'
  primary: '#00051c'
  on-primary: '#ffffff'
  primary-container: '#131e3a'
  on-primary-container: '#7b86a7'
  inverse-primary: '#bbc6ea'
  secondary: '#376757'
  on-secondary: '#ffffff'
  secondary-container: '#baeed9'
  on-secondary-container: '#3d6d5d'
  tertiary: '#0c0600'
  on-tertiary: '#ffffff'
  tertiary-container: '#2b1d00'
  on-tertiary-container: '#a4823e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2ff'
  primary-fixed-dim: '#bbc6ea'
  on-primary-fixed: '#0f1a36'
  on-primary-fixed-variant: '#3b4664'
  secondary-fixed: '#baeed9'
  secondary-fixed-dim: '#9ed1bd'
  on-secondary-fixed: '#002117'
  on-secondary-fixed-variant: '#1d4f40'
  tertiary-fixed: '#ffdea5'
  tertiary-fixed-dim: '#e9c176'
  on-tertiary-fixed: '#261900'
  on-tertiary-fixed-variant: '#5d4201'
  background: '#fcf9f2'
  on-background: '#1c1c18'
  surface-variant: '#e5e2db'
typography:
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 44px
  headline-lg-mobile:
    fontFamily: Noto Serif
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Noto Serif
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 34px
  headline-sm:
    fontFamily: Noto Serif
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-urdu-lg:
    fontFamily: Noto Nastaliq Urdu
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 64px
  title-urdu-md:
    fontFamily: Noto Nastaliq Urdu
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 52px
  body-urdu-poetry:
    fontFamily: Noto Nastaliq Urdu
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 54px
  body-urdu-prose:
    fontFamily: Noto Nastaliq Urdu
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 46px
  body-lg:
    fontFamily: EB Garamond
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: EB Garamond
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Manrope
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-sm:
    fontFamily: Manrope
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style

This design system establishes an archival, scholarly, and tactile aesthetic for classical and contemporary Urdu literature. Designed for bibliophiles, academics, poets, and casual readers across South Asia and the global diaspora, the interface pairs the warmth of classical illuminated manuscripts (*tazhib*) with crisp, modern Android Material 3 engineering.

The aesthetic blends **Tactile Classical Editorial** with **Scholarly Minimalism**:
- **Manuscript Tactility:** Soft parchment tones, delicate metallic hair lines, and archival framing replace generic digital flats.
- **Bilingual Typographic Harmony:** Urdu Nastaliq script receives primary typographic priority with generous vertical ascender/descender breathing space, perfectly aligned against refined Latin humanist serifs.
- **RTL-First Architecture:** Visual hierarchy, reading paths, gestural page navigation, and metadata layouts default to right-to-left orientation without compromising modern fluid reactivity.
- **Quiet Dignity:** Absence of aggressive neon alerts or synthetic micro-interactions; the tone is contemplative, deliberate, and archival.

## Colors

The palette draws directly from miniature paintings, Mughal bookbinding, lapis lazuli inlays, and aged handmade wasli paper.

### Palette Architecture
- **Primary (`#131E3A` — Lapis Ink):** Deep nocturnal navy representing classical calligraphic ink (*siyahi*). Anchors primary actions, top app bars, selected tab indicators, and deep dark-mode containers. Sub-shade `#0B1325` serves as the abyssal background in night reading mode.
- **Secondary (`#1B4D3E` — Royal Emerald / Zamarrud):** Reserved for scholarly verification badges, chapter progress indicators, curated collection banners, and secondary interactive actions.
- **Tertiary (`#C5A059` — Illumination Gold / Zarafshan):** Subtle gold accent used for verse markers (*sher* dividers), active bookmarks, audio recitation scrubbers, and luxury folio rims. Highlight variant `#D4AF37` lights up interactive states and active glyph flourishes.
- **Neutral Light (`#FBF8F1` — Antique Wasli Parchment):** The foundation canvas for daytime reading. Sub-surface layer `#F4EFE6` separates nested cards, search bars, and metadata chips.
- **Borders & Dividers (`#E2D9C8` / `#2E384D`):** Parchment-toned hair lines for light mode; slate-ink boundaries for dark reading mode.

### Contrast & Legibility Rules
- Never render Nastaliq text in low-contrast gold; gold is reserved strictly for decorative vignettes, borders, icons, and glyph marks.
- Verse body copy must always retain a contrast ratio of at least 7:1 against parchment canvases (`#0B1325` on `#FBF8F1`).

## Typography

Typographic scale in this design system balances the structural differences between Latin scripts and the cascading, sloping nature of Urdu Nastaliq. 

### Nastaliq Vertical Metrics
Nastaliq letters feature steep descenders and ascenders (*nuqtas*, *kashish*, and diagonal joins) requiring approximately 2.2× to 2.8× line height relative to font size. Standard Latin line-height ratios cause severe clipping of Urdu diacritics (*zabar*, *zer*, *pesh*) and vowel accents. Every Nastaliq token reserves strict vertical clearance.

### Font Pairings & Roles
- **Nastaliq (`Noto Nastaliq Urdu` / fallback `Jameel Noori Nastaleeq`):** Dedicated to primary literary works, couplets (*ashaar*), ghazals, author names, and literary chapter heads.
- **Latin Editorial Serif (`EB Garamond` & `Noto Serif`):** Handles English translations, critical commentary, transliterations, and publication essays.
- **Functional Sans (`Manrope`):** Deployed for precise UI infrastructure: catalog filters, audio timing timestamps, file sizes, ISBN numbers, and bottom navigation labels.

## Layout & Spacing

The layout is built upon a fluid 4-column system on compact mobile viewports (<600dp) expanding into an 8-column layout on foldable and tablet screens (600–840dp).

### Spatial Rhythm
- **RTL Fluid Hierarchy:** Layout directions invert automatically in Urdu mode (`dir="rtl"`). Navigation actions (back, drawers) sit top-right; supplementary actions sit top-left.
- **Reading Margins:** Poetry layouts enforce a `margin` of `1.25rem` (20px) to mirror printed *dewan* margins, ensuring hemistichs (*misras*) never touch screen boundaries.
- **Vertical Breathing Space:** Component stacks inside reading folios use `space-lg` and `space-xl` gaps to prevent high-density Nastaliq clusters from overwhelming the viewer.

## Elevation & Depth

Visual hierarchy rejects harsh drop shadows and synthetic neon glows, adopting physical bookbinding elevations, layered vellum papers, and delicate metallic edge borders.

### Elevation Architecture
- **Level 0 (Canvas Base):** Flat `#FBF8F1` washed with an ultra-fine 2% noise texture to evoke unbleached cotton wasli paper.
- **Level 1 (Card & Reader Folios):** Background `#F4EFE6` outlined by a 1px border of `#E2D9C8`. Casts an ambient shadow: `0 2px 8px -2px rgba(19, 30, 58, 0.05)`.
- **Level 2 (Active Manuscripts & Dialogs):** Parchment surface with a gold-leaf inner rim (`box-shadow: inset 0 0 0 1px #C5A059`) and a soft dual shadow: `0 4px 16px -4px rgba(19, 30, 58, 0.10)`.
- **Level 3 (Navigation Rail & Bottom Sheets):** Elevated `#FFFFFF` in light mode or `#131E3A` in dark mode, framed with a top border in `#C5A059` (1.5px), accompanied by an ambient blur: `0 -4px 20px rgba(11, 19, 37, 0.08)`.

## Shapes

The design system adopts a **Soft (`1`)** shape language, echoing the hand-trimmed corners of antique manuscripts and leather slipcases rather than circular hyper-rounded buttons.

### Boundary Principles
- Primary cards, folio containers, and reader panels utilize `0.25rem` (4px) to `0.5rem` (8px) corner radiuses.
- Input fields and metadata badges retain a firm architectural contour with crisp 4px corners.
- Circular elements are strictly reserved for avatar portraits of classical poets and round audio control buttons.

## Components

### 1. Buttons
- **Primary (Parchment Bound):** Solid `#131E3A` fill with `#FBF8F1` text and an optional `#C5A059` 1px border. Height 48dp, corner radius 4px. Active state transitions to `#1B4D3E`.
- **Secondary (Illuminated Outline):** Transparent fill with a 1.5px border of `#C5A059` and `#131E3A` text.
- **Text Action:** Unbordered, styled in `label-md`, tinted in `#1B4D3E` with an inline calligraphic arrow (`←` in RTL, `→` in LTR).

### 2. Verse Folios & Cards (Sher Display)
- Centered layout containing two rhyming hemistichs (*misras*).
- Separated at the center by a subtle floral gold medallion (*shamsa* flourish).
- Bottom metadata row displays *Behr* (poetic meter), *Radeef*, *Qafia*, and poet attribution in `label-sm` (`#1B4D3E`).

### 3. Offline-First Indicators
- Archival indicator chip placed at the header of cached manuscripts.
- Rendered in `#1B4D3E` (Jade) with a miniature inkpot/quill icon, denoting that the complete high-resolution Nastaliq text and audio recitation are stored locally on-device.

### 4. Chips & Metadata Filters
- Rectangular with 4px border radius, rendered on `#F4EFE6` with 1px border `#E2D9C8`.
- Selected chip: Background switches to `#131E3A` with crisp `#FBF8F1` typography and gold checkmark icon.

### 5. Input Fields
- Understated architectural lines: 1px `#E2D9C8` resting border, shifting to a 1.5px `#C5A059` focus ring.
- Placeholder copy aligns right for Urdu search terms (e.g., "دیوان، شاعر یا مصرع تلاش کریں...") using `body-urdu-prose`.

### 6. Reader Controls & Audio Player
- Floating bottom sheet dock in `#131E3A` with gold controls (`#D4AF37`).
- Audio waveform scrubber styled as a continuous calligraphic ink stroke with an ornamental teardrop playhead.