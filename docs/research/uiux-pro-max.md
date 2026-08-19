# ui-ux-pro-max — mandatory_queries raw output

## 1. Design system base
```
$ python3 .claude/skills/ui-ux-pro-max/scripts/search.py specialty coffee roastery ecommerce editorial brand --design-system --variance 8 --motion 5 --density 3 --stack nextjs

╔═════════════════════════════════════════════════════════════════════════════════════════╗
║  TARGET: SPECIALTY COFFEE ROASTERY ECOMMERCE EDITORIAL BRAND - RECOMMENDED DESIGN SYSTEM║
╚═════════════════════════════════════════════════════════════════════════════════════════╝
┌─────────────────────────────────────────────────────────────────────────────────────────┐
├─── DESIGN DIALS ─────────────────────────────────────────────────────────────────────────┤
│  Variance: 8/10 — Bold / Asymmetric                                                     │
│  Motion:   5/10 — Standard                                                              │
│  Density:  3/10 — Spacious                                                              │
├─── PATTERN ──────────────────────────────────────────────────────────────────────────────┤
│  Name: Scroll-Triggered Storytelling                                                    │
│     Conversion: Keep the narrative understandable without scroll-driven effects. Use progress indicator. Mobile: simplify animations. Keep DOM reading order complete; disable parallax and scroll-scrub under reduced motion. Pause scroll animation when offscreen or hidden and render each chapter in its final readable state under reduced motion.│
│     CTA: End of each chapter (mini) + Final climax CTA                                  │
│     Sections:                                                                           │
│       1. Intro hook                                                                     │
│       2. Chapter 1 (problem)                                                            │
│       3. Chapter 2 (journey)                                                            │
│       4. Chapter 3 (solution)                                                           │
│       5. Climax CTA                                                                     │
├─── STYLE ────────────────────────────────────────────────────────────────────────────────┤
│  Name: Brutalism                                                                        │
│     Mode Support: Light supported  Dark supported                                       │
│     Keywords: Raw, unpolished, stark, high contrast, plain text, default fonts,         │
│     visible borders, asymmetric, anti-design                                            │
│     Best For: Design portfolios, artistic projects, counter-culture brands,             │
│     editorial/media sites, tech blogs                                                   │
│     Performance: cost:low|drivers:none | Accessibility: risk:low|requires:contrast-text-4.5,keyboard,visible-focus,reduced-motion│
├─── COLORS ───────────────────────────────────────────────────────────────────────────────┤
│     [38;2;28;25;23m██[0m Primary:       #1C1917    (--color-primary)                                      │
│     [38;2;255;255;255m██[0m On Primary:    #FFFFFF    (--color-on-primary)                                   │
│     [38;2;68;64;60m██[0m Secondary:     #44403C    (--color-secondary)                                    │
│     [38;2;255;255;255m██[0m On Secondary:  #FFFFFF    (--color-on-secondary)                                 │
│     [38;2;161;98;7m██[0m Accent/CTA:    #A16207    (--color-accent)                                       │
│     [38;2;255;255;255m██[0m On Accent/CTA: #FFFFFF    (--color-on-accent)                                    │
│     [38;2;250;250;249m██[0m Background:    #FAFAF9    (--color-background)                                   │
│     [38;2;12;10;9m██[0m Foreground:    #0C0A09    (--color-foreground)                                   │
│     [38;2;255;255;255m██[0m Card:          #FFFFFF    (--color-card)                                         │
│     [38;2;12;10;9m██[0m Card Foreground: #0C0A09    (--color-card-foreground)                            │
│     [38;2;232;236;240m██[0m Muted:         #E8ECF0    (--color-muted)                                        │
│     [38;2;71;85;105m██[0m Muted Foreground: #475569    (--color-muted-foreground)                          │
│     [38;2;214;211;209m██[0m Border:        #D6D3D1    (--color-border)                                       │
│     [38;2;220;38;38m██[0m Destructive:   #DC2626    (--color-destructive)                                  │
│     [38;2;255;255;255m██[0m On Destructive: #FFFFFF    (--color-on-destructive)                              │
│     [38;2;28;25;23m██[0m Ring:          #1C1917    (--color-ring)                                         │
│     Notes: Premium black + gold accent [Accent adjusted from #CA8A04]                   │
├─── TYPOGRAPHY ───────────────────────────────────────────────────────────────────────────┤
│  Cormorant / Montserrat                                                                 │
│     Mood: luxury, high-end, fashion, elegant, refined, premium                          │
│     Best For: Fashion brands, luxury e-commerce, jewelry, high-end services             │
│     Google Fonts: https://fonts.googleapis.com/css2?family=Cormorant:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap│
│     CSS Import: @import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@4...│
├─── KEY EFFECTS ──────────────────────────────────────────────────────────────────────────┤
│     No smooth transitions (instant), sharp corners (0px), bold typography (700+),       │
│     visible grid, large blocks                                                          │
├─── MOTION ───────────────────────────────────────────────────────────────────────────────┤
│  Stagger List (Standard)                                                                │
│     Trigger: load or scroll | Duration: 300-450ms | Easing: back.out(1.4)               │
│     GSAP: gsap.from('.grid-item', { opacity: 0, scale: 0.92, y: 16, duration: 0.4,      │
│     stagger: { each: 0.06, from: 'start', grid: 'auto' }, ease: 'back.out(1.4)' });     │
│     Framework: grid: 'auto' lets GSAP infer rows/columns from a CSS grid layout for a   │
│     natural wave stagger; Use matchMedia('(prefers-reduced-motion: reduce)') to skip    │
│     non-essential motion and render the final state immediately                         │
├─── AVOID ────────────────────────────────────────────────────────────────────────────────┤
│     Cheap visuals + Fast animations                                                     │
├─── PRE-DELIVERY CHECKLIST ───────────────────────────────────────────────────────────────┤
│     [ ] No emojis as icons (use SVG: Heroicons/Lucide)                                  │
│     [ ] cursor-pointer on all clickable elements                                        │
│     [ ] Hover states with smooth transitions (150-300ms)                                │
│     [ ] Light mode: text contrast 4.5:1 minimum                                         │
│     [ ] Focus states visible for keyboard nav                                           │
│     [ ] prefers-reduced-motion respected                                                │
│     [ ] Responsive: 375px, 768px, 1024px, 1440px                                        │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

## 2a. Style — swiss editorial
```
$ python3 .claude/skills/ui-ux-pro-max/scripts/search.py swiss international typographic poster editorial minimalism --domain style

## UI Pro Max Search Results
**Domain:** style | **Query:** swiss international typographic poster editorial minimalism
**Source:** styles.csv | **Found:** 1 results

### Result 1
- **Style ID:** minimalism-and-swiss-style
- **Style Category:** Minimalism & Swiss Style
- **Aliases:** Minimal|Minimalism|Minimalism (Frame)
- **Status:** active
- **Parent Style ID:** 
- **Preferred Mode:** auto
- **Type:** General
- **Keywords:** Clean, simple, spacious, functional, white space, high contrast, geometric, sans-serif, grid-based, essential
- **Primary Colors:** Monochromatic, Black #000000, White #FFFFFF
- **Effects & Animation:** Subtle hover (200-250ms), smooth transitions, sharp shadows if any, clear type hierarchy, fast loading
- **Best For:** Enterprise apps, dashboards, documentation sites, SaaS platforms, professional tools
- **Light Mode ✓:** supported
- **Dark Mode ✓:** supported
- **Performance:** cost:low|drivers:none
- **Accessibility:** risk:low|requires:contrast-text-4.5,keyboard,visible-focus,reduced-motion
- **Framework Compatibility:** tailwind|bootstrap|mui
- **Complexity:** Low
- **AI Prompt Keywords:** Design a minimalist landing page. Use: white space, geometric layouts, sans-serif fonts, high contrast, grid-based structure, essential elements only. Avoid shadows and gradients. Focus on clarity and functionality.
- **CSS/Technical Keywords:** display: grid, gap: 2rem, font-family: sans-serif, color: #000 or #FFF, max-width: 1200px, clean borders, no box-shadow unless necessary
- **Implementation Checklist:** ☐ Grid-based layout 12-16 columns, ☐ Typography hierarchy clear, ☐ No unnecessary decorations, ☐ text contrast measured against the chosen project target, ☐ Mobile responsive grid
- **Design System Variables:** --spacing: 2rem, --border-radius: 0px, --font-weight: 400-700, --shadow: none, --accent-color: single primary only

```

## 2b. Style — high contrast blocks
```
$ python3 .claude/skills/ui-ux-pro-max/scripts/search.py high contrast monochrome color blocking sections --domain style

## UI Pro Max Search Results
**Domain:** style | **Query:** high contrast monochrome color blocking sections
**Source:** styles.csv | **Found:** 3 results

### Result 1
- **Style ID:** e-ink-paper
- **Style Category:** E-Ink / Paper
- **Aliases:** E-Ink Paper|E-Ink/Paper
- **Status:** active
- **Parent Style ID:** 
- **Preferred Mode:** auto
- **Type:** General
- **Keywords:** Paper-like, matte, high contrast, texture, reading, calm, slow tech, monochrome
- **Primary Colors:** Off-White #FDFBF7, Paper White #F5F5F5, Ink Black #1A1A1A
- **Effects & Animation:** No motion blur, distinct page turns, grain/noise texture, sharp transitions (no fade)
- **Best For:** Reading apps, digital newspapers, minimal journals, distraction-free writing, slow-living brands
- **Light Mode ✓:** supported
- **Dark Mode ✓:** not-recommended
- **Performance:** cost:low|drivers:none
- **Accessibility:** risk:low|requires:contrast-text-4.5,keyboard,visible-focus,reduced-motion
- **Framework Compatibility:** tailwind|css
- **Complexity:** Low
- **AI Prompt Keywords:** Design an e-ink/paper style interface. Use: high contrast black on off-white, paper texture, no animations (instant transitions), reading-focused, minimal UI chrome, distraction-free, calm aesthetic, monochrome.
- **CSS/Technical Keywords:** background: #FDFBF7 (paper white), color: #1A1A1A, transition: none, font-family: serif for reading, no gradients, border: 1px solid #E0E0E0, texture overlay (noise)
- **Implementation Checklist:** ☐ Paper background color, ☐ High contrast text, ☐ No animations, ☐ Reading optimized, ☐ Distraction-free, ☐ Print-friendly
- **Design System Variables:** --paper-bg: #FDFBF7, --ink-color: #1A1A1A, --pencil-grey: #4A4A4A, --border-color: #E0E0E0, --font-reading: Georgia, --transition: none

### Result 2
- **Style ID:** inclusive-design
- **Style Category:** Inclusive Design
- **Aliases:** 
- **Status:** active
- **Parent Style ID:** 
- **Preferred Mode:** auto
- **Type:** General
- **Keywords:** Accessible, color-blind friendly, high contrast, haptic feedback, voice interaction, screen reader, enhanced contrast targets, universal
- **Primary Colors:** Measured contrast pairs targeting 7:1 for normal text, avoid red-green only, symbol-based indicators, high contrast primary
- **Effects & Animation:** Haptic feedback (vibration), voice guidance, focus indicators (4px+ ring), motion options, alt content, semantic
- **Best For:** Public services, education, healthcare, finance, government, accessible consumer, inclusive
- **Light Mode ✓:** supported
- **Dark Mode ✓:** supported
- **Performance:** cost:low|drivers:none
- **Accessibility:** risk:low|requires:contrast-text-4.5,keyboard,visible-focus,reduced-motion
- **Framework Compatibility:** css
- **Complexity:** Low
- **AI Prompt Keywords:** Design for universal accessibility: high contrast (7:1+), large text (16px+), keyboard-only navigation, screen reader optimization, enhanced accessibility criteria with complete-page verification, symbol-based color indicators (not color-only), haptic feedback, voice interaction support, reduced mot...
- **CSS/Technical Keywords:** aria-* attributes complete, role attributes semantic, focus-visible: 3-4px ring, color-contrast: 7:1+, @media (prefers-reduced-motion), alt text on all images, form labels properly associated
- **Implementation Checklist:** ☐ complete-page conformance tested against the chosen target, ☐ 7:1+ contrast all text, ☐ Keyboard accessible (Tab/Enter), ☐ Screen reader tested, ☐ Focus visible 3-4px, ☐ No color-only indicators, ☐ Haptic fallback
- **Design System Variables:** --contrast-ratio: 7:1, --font-size: 16px+, --keyboard-accessible: true, --sr-test-required: true, --wcag-target: enhanced, --color-symbols: true, --haptic: enabled

### Result 3
- **Style ID:** vibrant-and-block-based
- **Style Category:** Vibrant & Block-based
- **Aliases:** Vibrant & Block
- **Status:** active
- **Parent Style ID:** 
- **Preferred Mode:** auto
- **Type:** General
- **Keywords:** Bold, energetic, playful, block layout, geometric shapes, high color contrast, duotone, modern, energetic
- **Primary Colors:** Neon Green #39FF14, Electric Purple #BF00FF, Vivid Pink #FF1493, Bright Cyan #00FFFF, Sunburst #FFAA00
- **Effects & Animation:** Large sections (48px+ gaps), animated patterns, bold hover (color shift), scroll-snap, large type (32px+), 200-300ms
- **Best For:** Startups, creative agencies, gaming, social media, youth-focused, entertainment, consumer
- **Light Mode ✓:** supported
- **Dark Mode ✓:** supported
- **Performance:** cost:low|drivers:none
- **Accessibility:** risk:conditional|requires:contrast-text-4.5,keyboard,visible-focus,reduced-motion
- **Framework Compatibility:** tailwind|chakra|styled-components
- **Complexity:** Medium
- **AI Prompt Keywords:** Design an energetic, vibrant interface with bold block layouts, geometric shapes, high color contrast, large typography (32px+), animated background patterns, duotone effects. Perfect for startups and youth-focused apps. Use 4-6 contrasting colors from complementary/triadic schemes.
- **CSS/Technical Keywords:** display: flex/grid with large gaps (48px+), font-size: 32px+, background: animated patterns (CSS), color: neon/vibrant colors, animation: continuous pattern movement
- **Implementation Checklist:** ☐ Block layout with 48px+ gaps, ☐ Large typography 32px+, ☐ 4-6 vibrant colors max, ☐ Animated patterns active, ☐ Scroll-snap enabled, ☐ High contrast verified (7:1+)
- **Design System Variables:** --block-gap: 48px, --typography-size: 32px+, --color-palette: 4-6 vibrant colors, --animation: continuous pattern, --contrast-ratio: 7:1+

```

## 3a. Typography — geometric micro caps
```
$ python3 .claude/skills/ui-ux-pro-max/scripts/search.py geometric sans display micro caps wide tracking --domain typography

## UI Pro Max Search Results
**Domain:** typography | **Query:** geometric sans display micro caps wide tracking
**Source:** typography.csv | **Found:** 3 results

### Result 1
- **Font Pairing Name:** Kinetic Motion
- **Category:** Display + Mono
- **Heading Font:** Syncopate
- **Body Font:** Space Mono
- **Mood/Style Keywords:** kinetic, motion, futuristic, speed, wide, tech
- **Best For:** Music festivals, automotive, high-energy brands
- **Google Fonts URL:** https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syncopate:wght@400;700&display=swap
- **CSS Import:** @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syncopate:wght@400;700&display=swap');
- **Tailwind Config:** fontFamily: { display: ['Syncopate', 'sans-serif'], mono: ['Space Mono', 'monospace'] }
- **Notes:** Syncopate's wide stance works well with motion effects.

### Result 2
- **Font Pairing Name:** Neubrutalist Bold
- **Category:** Display + Sans
- **Heading Font:** Lexend Mega
- **Body Font:** Public Sans
- **Mood/Style Keywords:** bold, neubrutalist, loud, strong, geometric, quirky
- **Best For:** Neubrutalist designs, Gen Z brands, bold marketing
- **Google Fonts URL:** https://fonts.googleapis.com/css2?family=Lexend+Mega:wght@100..900&family=Public+Sans:wght@100..900&display=swap
- **CSS Import:** @import url('https://fonts.googleapis.com/css2?family=Lexend+Mega:wght@100..900&family=Public+Sans:wght@100..900&display=swap');
- **Tailwind Config:** fontFamily: { mega: ['Lexend Mega', 'sans-serif'], body: ['Public Sans', 'sans-serif'] }
- **Notes:** Lexend Mega has distinct character and variable weight.

### Result 3
- **Font Pairing Name:** Bauhaus Geometric
- **Category:** Geometric Sans + Single Weight
- **Heading Font:** Outfit
- **Body Font:** Outfit
- **Mood/Style Keywords:** bauhaus, geometric, constructivist, bold, uppercase, architectural, mechanical, poster, tactile
- **Best For:** Bauhaus mobile apps, bold editorial mobile, design-forward branding apps, art/culture platforms
- **Google Fonts URL:** https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;900&display=swap
- **CSS Import:** @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;900&display=swap');
- **Tailwind Config:** fontFamily: { display: ['Outfit', 'sans-serif'], body: ['Outfit', 'sans-serif'] }
- **Notes:** Single-family system: Outfit 900 uppercase tracking-tighter for heroes; Outfit 700 uppercase for buttons/nav; Outfit 500 for body. Scale aggressively: text-4xl–text-5xl headlines on mobile.

```

## 3b. Google Fonts fallback
```
$ python3 .claude/skills/ui-ux-pro-max/scripts/search.py self hosted variable font fallback strategy --domain google-fonts

## UI Pro Max Search Results
**Domain:** google-fonts | **Query:** self hosted variable font fallback strategy
**Source:** google-fonts.csv | **Found:** 3 results

### Result 1
- **Family:** Noto Emoji
- **Category:** Sans Serif
- **Stroke:** Sans Serif
- **Classifications:** 
- **Styles:** 300 | 400 | 500 | 600 | 700
- **Variable Axes:** wght: 300..700
- **Subsets:** emoji
- **Designers:** Google
- **Popularity Rank:** 721
- **Google Fonts URL:** https://fonts.google.com/specimen/Noto+Emoji

### Result 2
- **Family:** Playwrite IN
- **Category:** Handwriting
- **Stroke:** 
- **Classifications:** Handwriting
- **Styles:** 100 | 200 | 300 | 400
- **Variable Axes:** wght: 100..400
- **Subsets:** 
- **Designers:** TypeTogether | Veronika Burian | José Scaglione
- **Popularity Rank:** 372
- **Google Fonts URL:** https://fonts.google.com/specimen/Playwrite+IN

### Result 3
- **Family:** Playwrite IS
- **Category:** Handwriting
- **Stroke:** 
- **Classifications:** Handwriting
- **Styles:** 100 | 200 | 300 | 400
- **Variable Axes:** wght: 100..400
- **Subsets:** 
- **Designers:** TypeTogether | Veronika Burian | José Scaglione
- **Popularity Rank:** 383
- **Google Fonts URL:** https://fonts.google.com/specimen/Playwrite+IS

```

## 4. Color
```
$ python3 .claude/skills/ui-ux-pro-max/scripts/search.py black white with deep navy forest green cream accent --domain color

## UI Pro Max Search Results
**Domain:** color | **Query:** black white with deep navy forest green cream accent
**Source:** colors.csv | **Found:** 3 results

### Result 1
- **Product Type:** Bakery/Cafe
- **Primary:** #92400E
- **On Primary:** #FFFFFF
- **Secondary:** #B45309
- **On Secondary:** #FFFFFF
- **Accent:** #92400E
- **On Accent:** #FFFFFF
- **Background:** #FEF3C7
- **Foreground:** #78350F
- **Card:** #FFFFFF
- **Card Foreground:** #78350F
- **Muted:** #EDEEF0
- **Muted Foreground:** #475569
- **Border:** #FDE68A
- **Destructive:** #DC2626
- **On Destructive:** #FFFFFF
- **Ring:** #92400E
- **Notes:** Warm brown + cream white [Accent adjusted from #F8FAFC]

### Result 2
- **Product Type:** Photography Studio
- **Primary:** #18181B
- **On Primary:** #FFFFFF
- **Secondary:** #27272A
- **On Secondary:** #FFFFFF
- **Accent:** #F8FAFC
- **On Accent:** #0F172A
- **Background:** #000000
- **Foreground:** #FAFAFA
- **Card:** #0C0C0C
- **Card Foreground:** #FAFAFA
- **Muted:** #181818
- **Muted Foreground:** #94A3B8
- **Border:** #3F3F46
- **Destructive:** #EF4444
- **On Destructive:** #000000
- **Ring:** #FFFFFF
- **Notes:** Pure black + white contrast

### Result 3
- **Product Type:** White Noise & Ambient Sound
- **Primary:** #475569
- **On Primary:** #FFFFFF
- **Secondary:** #334155
- **On Secondary:** #FFFFFF
- **Accent:** #4338CA
- **On Accent:** #FFFFFF
- **Background:** #0F172A
- **Foreground:** #FFFFFF
- **Card:** #192134
- **Card Foreground:** #FFFFFF
- **Muted:** #131B2F
- **Muted Foreground:** #94A3B8
- **Border:** rgba(255,255,255,0.08)
- **Destructive:** #DC2626
- **On Destructive:** #FFFFFF
- **Ring:** #FFFFFF
- **Notes:** Ambient grey + deep indigo on dark

```

## 5a. Landing narrative
```
$ python3 .claude/skills/ui-ux-pro-max/scripts/search.py long scroll narrative landing sectioned storytelling --domain landing

## UI Pro Max Search Results
**Domain:** landing | **Query:** long scroll narrative landing sectioned storytelling
**Source:** landing.csv | **Found:** 3 results

### Result 1
- **Pattern ID:** scroll-triggered-storytelling
- **Pattern Name:** Scroll-Triggered Storytelling
- **Aliases:** Storytelling + Data|Storytelling + Feature-Rich|Storytelling + Hero-Centric|Storytelling-Driven|Storytelling-Driven + Feature-Rich|Storytelling-Driven + Hero|Storytelling-Driven + Hero-Centric
- **Keywords:** storytelling, scroll, narrative, story, immersive
- **Section Order:** Intro hook > Chapter 1 (problem) > Chapter 2 (journey) > Chapter 3 (solution) > Climax CTA
- **Primary CTA Placement:** End of each chapter (mini) + Final climax CTA
- **Color Strategy:** Progressive reveal. Each chapter has distinct color. Building intensity.
- **Conversion Optimization:** Keep the narrative understandable without scroll-driven effects. Use progress indicator. Mobile: simplify animations. Keep DOM reading order complete; disable parallax and scroll-scrub under reduced motion. Pause scroll animation when offscreen or hidden and render each chapter in its final readable...

### Result 2
- **Pattern ID:** horizontal-scroll-journey
- **Pattern Name:** Horizontal Scroll Journey
- **Aliases:** 
- **Keywords:** horizontal, scroll, journey, gallery, storytelling, panoramic, storytelling-driven
- **Section Order:** Intro (Vertical) > The Journey (Horizontal Track) > Detail Reveal > Vertical Footer
- **Primary CTA Placement:** Floating Sticky CTA or End of Horizontal Track
- **Color Strategy:** Continuous palette transition. Chapter colors. Progress bar #000000.
- **Conversion Optimization:** Immersive product discovery. High engagement. Keep navigation visible. Preserve a normal vertical navigation path and disable scroll-jacking under reduced motion. Pause effects when offscreen/hidden and render every chapter in its final vertical reading state under reduced motion.

### Result 3
- **Pattern ID:** ai-personalization-landing
- **Pattern Name:** AI Personalization Landing
- **Aliases:** 
- **Keywords:** ai, personalization, smart, recommendation, dynamic
- **Section Order:** Dynamic hero (personalized) > Relevant features > Tailored testimonials > Smart CTA
- **Primary CTA Placement:** Context-aware placement based on user segment
- **Color Strategy:** Adaptive based on user data. A/B test color variations per segment.
- **Conversion Optimization:** Validate personalization with consent-aware product analytics. Requires analytics integration. Fallback for new users.

```

## 5b. UX product grid
```
$ python3 .claude/skills/ui-ux-pro-max/scripts/search.py product listing grid faceted filters ecommerce --domain ux

## UI Pro Max Search Results
**Domain:** ux | **Query:** product listing grid faceted filters ecommerce
**Source:** ux-guidelines.csv | **Found:** 0 results

No matches. This is not a match with an empty value -- the query did not hit the database. Retry with broader/different keywords before falling back to general defaults, and say explicitly that no database match was found if you do fall back.
**Closest known terms:** filter, splitting
```

## 5c. UX PDP transparency
```
$ python3 .claude/skills/ui-ux-pro-max/scripts/search.py product detail page specification transparency data --domain ux

## UI Pro Max Search Results
**Domain:** ux | **Query:** product detail page specification transparency data
**Source:** ux-guidelines.csv | **Found:** 3 results

### Result 1
- **Category:** Performance
- **Issue:** Image Optimization
- **Platform:** All
- **Description:** Large images slow page load
- **Do:** Use appropriate size and format (WebP)
- **Don't:** Unoptimized full-size images
- **Code Example Good:** srcset with multiple sizes
- **Code Example Bad:** 4000px image for 400px display
- **Severity:** High

### Result 2
- **Category:** Data Entry
- **Issue:** Bulk Actions
- **Platform:** Web
- **Description:** Editing one by one is tedious
- **Do:** Allow multi-select and bulk edit
- **Don't:** Single row actions only
- **Code Example Good:** Checkbox column + Action bar
- **Code Example Bad:** Repeated actions per row
- **Severity:** Low

### Result 3
- **Category:** Navigation
- **Issue:** Active State
- **Platform:** All
- **Description:** Current page/section should be visually indicated
- **Do:** Highlight active nav item with color/underline
- **Don't:** No visual feedback on current location
- **Code Example Good:** text-primary border-b-2
- **Code Example Bad:** All links same style
- **Severity:** Medium

```

## 5d. UX whatsapp checkout
```
$ python3 .claude/skills/ui-ux-pro-max/scripts/search.py cart to whatsapp checkout mobile first latam --domain ux

## UI Pro Max Search Results
**Domain:** ux | **Query:** cart to whatsapp checkout mobile first latam
**Source:** ux-guidelines.csv | **Found:** 3 results

### Result 1
- **Category:** Responsive
- **Issue:** Mobile First
- **Platform:** Web
- **Description:** Design for mobile then enhance for larger
- **Do:** Start with mobile styles then add breakpoints
- **Don't:** Desktop-first causing mobile issues
- **Code Example Good:** Default mobile + md: lg: xl:
- **Code Example Bad:** Desktop default + max-width queries
- **Severity:** Medium

### Result 2
- **Category:** Performance
- **Issue:** Render Blocking
- **Platform:** Web
- **Description:** CSS/JS can block first paint
- **Do:** Inline critical CSS defer non-critical
- **Don't:** Large blocking CSS files
- **Code Example Good:** Critical CSS inline
- **Code Example Bad:** All CSS in head
- **Severity:** Medium

### Result 3
- **Category:** Forms
- **Issue:** Mobile Keyboards
- **Platform:** Mobile
- **Description:** Show appropriate keyboard for input type
- **Do:** Use inputmode attribute
- **Don't:** Default keyboard for all inputs
- **Code Example Good:** inputmode='numeric'
- **Code Example Bad:** Text keyboard for numbers
- **Severity:** Medium

```

## 6a. Icons
```
$ python3 .claude/skills/ui-ux-pro-max/scripts/search.py line icon system stroke consistency --domain icons

## UI Pro Max Search Results
**Domain:** icons | **Query:** line icon system stroke consistency
**Source:** icons.csv | **Found:** 0 results

No matches. This is not a match with an empty value -- the query did not hit the database. Retry with broader/different keywords before falling back to general defaults, and say explicitly that no database match was found if you do fall back.
**Closest known terms:** decline
```

## 6b. GSAP motion
```
$ python3 .claude/skills/ui-ux-pro-max/scripts/search.py scroll reveal stagger marquee 3d carousel --domain gsap

## UI Pro Max Search Results
**Domain:** gsap | **Query:** scroll reveal stagger marquee 3d carousel
**Source:** motion.csv | **Found:** 3 results

### Result 1
- **Category:** Stagger List
- **Intensity Tier:** Complex
- **Trigger:** load or scroll
- **Duration:** 400-700ms
- **Easing:** expo.out
- **GSAP Snippet:** const split = new SplitText(headline, { type: 'chars' }); gsap.from(split.chars, { opacity: 0, y: 20, rotateX: -40, duration: 0.6, stagger: 0.015, ease: 'expo.out' });
- **Framework Notes:** SplitText is included with GSAP 3.13+; register it before use, review the current GSAP license, and keep a plain-text fade fallback; Use gsap.matchMedia('(prefers-reduced-motion: reduce)') to skip character motion and render the readable final state immediately
- **Do:** Revert SplitText on unmount/cleanup (split.revert()) to restore original text nodes for accessibility tools
- **Don't:** Don't split-animate long paragraphs; reserve for short headlines (under ~8 words)
- **Performance Notes:** Splitting text creates one element per character; keep it to headline-length copy only for DOM size

### Result 2
- **Category:** Scroll Reveal
- **Intensity Tier:** Subtle
- **Trigger:** scroll (viewport enter)
- **Duration:** 300-400ms
- **Easing:** power1.out
- **GSAP Snippet:** gsap.from(el, { opacity: 0, y: 12, duration: 0.35, ease: 'power1.out', scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' } });
- **Framework Notes:** Requires the ScrollTrigger plugin registered once via gsap.registerPlugin(ScrollTrigger); Use matchMedia('(prefers-reduced-motion: reduce)') to skip non-essential motion and render the final state immediately
- **Do:** Keep the y offset small (8-16px) so it reads as a fade, not a slide
- **Don't:** Don't reveal below-the-fold content needed for SEO/crawlers as invisible-by-default without a no-JS fallback
- **Performance Notes:** toggleActions 'play none none reverse' avoids re-triggering on every scroll direction change

### Result 3
- **Category:** Stagger List
- **Intensity Tier:** Subtle
- **Trigger:** load or scroll
- **Duration:** 250-350ms
- **Easing:** power1.out
- **GSAP Snippet:** gsap.from('.list-item', { opacity: 0, y: 8, duration: 0.3, stagger: 0.03 });
- **Framework Notes:** Select items with a stable class/data-attribute (not array index) so re-renders in React don't break targeting; Use matchMedia('(prefers-reduced-motion: reduce)') to skip non-essential motion and render the final state immediately
- **Do:** Keep per-item stagger delay small (0.02-0.04s) for lists longer than 10 items
- **Don't:** Don't stagger by more than 0.1s per item on long lists; total reveal time becomes sluggish
- **Performance Notes:** For virtualized lists, only animate items currently mounted in the DOM

```

## 6c. React perf
```
$ python3 .claude/skills/ui-ux-pro-max/scripts/search.py react animation performance patterns --domain react

## UI Pro Max Search Results
**Domain:** react | **Query:** react animation performance patterns
**Source:** react-performance.csv | **Found:** 2 results

### Result 1
- **Category:** Server
- **Issue:** React.cache Dedup
- **Platform:** React/Next.js
- **Description:** Use React.cache() for server-side request deduplication within single request
- **Do:** Wrap data fetchers with cache()
- **Don't:** Fetch same data multiple times in tree
- **Code Example Good:** export const getUser = cache(async () => await db.user.find())
- **Code Example Bad:** export async function getUser() { return await db.user.find() }
- **Severity:** Medium

### Result 2
- **Category:** Rendering
- **Issue:** SVG Animation Wrapper
- **Platform:** React/Next.js
- **Description:** Wrap SVG in div and animate wrapper for hardware acceleration
- **Do:** Animate div wrapper around SVG
- **Don't:** Animate SVG element directly
- **Code Example Good:** <div class='animate-spin'><svg>...</svg></div>
- **Code Example Bad:** <svg class='animate-spin'>...</svg>
- **Severity:** Low

```

