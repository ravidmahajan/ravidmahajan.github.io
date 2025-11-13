# Personal Bio Website - Design Guidelines

## Design Approach

**Reference-Based Approach**: Drawing inspiration from modern portfolio sites like Linear, Stripe, and contemporary personal brand websites. Focus on clean, professional aesthetics with bold typography and strategic use of personal imagery to create an intimate, authentic connection.

**Core Principles**:
- Visual storytelling through strategic image placement
- Generous whitespace for breathing room and focus
- Bold, confident typography hierarchy
- Minimal, purposeful interactions

---

## Typography System

**Font Stack**:
- Primary: Inter (via Google Fonts CDN)
- Fallback: system-ui, -apple-system, sans-serif

**Type Scale**:
- Hero Headline: 4xl (mobile) → 6xl/7xl (desktop), font-weight: 700, letter-spacing: tight
- Section Headings: 3xl (mobile) → 5xl (desktop), font-weight: 700
- Subsection Titles: xl → 2xl, font-weight: 600
- Body Large: lg → xl, font-weight: 400, line-height: relaxed
- Body Standard: base → lg, font-weight: 400, line-height: relaxed
- Small/Meta: sm → base, font-weight: 500

**Text Colors** (grayscale only per requirement):
- Primary text: Near-black (#111827)
- Secondary text: Medium gray (#6B7280)
- Tertiary/Meta: Light gray (#9CA3AF)

---

## Layout & Spacing System

**Container Strategy**:
- Full-width sections with inner max-w-6xl container
- Consistent horizontal padding: px-6 (mobile) → px-12 (desktop)

**Vertical Rhythm**:
- Section spacing: py-16 (mobile) → py-24/py-32 (desktop)
- Inter-element spacing within sections: 8, 12, 16 units
- Component internal spacing: 2, 4, 6 units

**Grid System**:
- Experience cards: Single column (mobile) → 2-column grid (desktop)
- Social links: 2x2 grid (mobile) → horizontal row (desktop)

---

## Section-by-Section Design

### Hero Section
**Layout**: Full viewport height (min-h-screen) with centered content
**Structure**:
- Large personal portrait image (circular or soft-rounded, 300-400px diameter)
- Impactful tagline positioned prominently below image
- Subtle tagline supporting text
- Scroll indicator or down arrow at bottom
**Spacing**: Generous vertical spacing between elements (12-16 units)

### About Section
**Layout**: Asymmetric two-column layout (desktop), stacked (mobile)
**Left Column**: Personal photo in candid/professional setting (aspect-ratio-4/3 or square)
**Right Column**: 
- Section heading "About"
- 2-3 paragraph bio with comfortable reading width (max-w-prose)
- Personal details/quick facts in clean list format
**Visual Treatment**: Photo has subtle rounded corners (rounded-xl)

### Experience Section
**Layout**: Timeline-style or card-based grid
**Structure**:
- Section heading "Experience"
- Each position as distinct card with:
  - Company logo/icon area (80x80px circle or rounded square)
  - Position title (xl/2xl, font-weight: 600)
  - Company name (lg, secondary color)
  - Date range (base, tertiary color)
  - 2-3 bullet points or brief description
**Card Design**: 
- White background with subtle border (border-gray-200)
- Padding: p-6 → p-8
- Rounded corners: rounded-2xl
- Hover state: subtle shadow elevation

### Get in Touch Section
**Layout**: Centered content with visual focal point
**Structure**:
- Section heading "Get in Touch"
- Personal photo (smaller, 200-250px, friendly/approachable pose)
- Contact methods displayed as clean, clickable elements:
  - Email (with icon)
  - Phone (optional)
  - Location city (with icon)
- Each contact item has icon + text, clickable/copyable functionality
**Spacing**: Generous spacing around contact elements (8-12 units)

### Social Media Links
**Position**: Fixed to bottom-right or footer
**Layout**: Horizontal row of icon buttons (desktop), 2x2 grid (mobile)
**Icons**: Use Heroicons or Font Awesome via CDN
- GitHub, LinkedIn, Instagram, YouTube icons
**Button Design**:
- Size: 12x12 units (48-56px)
- Rounded: rounded-full or rounded-xl
- Border: subtle border (border-gray-200)
- Hover: border darkens, subtle scale transform
- Background: white with subtle shadow

---

## Component Library

### Navigation (Optional sticky header)
- Minimal, transparent background
- Logo/Name on left
- Section links on right (hidden on mobile, hamburger menu)
- Text links, no buttons in nav

### Buttons/CTAs
- Primary: Solid dark background, white text, rounded-lg, px-8 py-4
- Secondary: Border style, transparent background, rounded-lg
- Icon buttons: Square/circular, border or filled
- All buttons: font-weight: 500, tracking-wide

### Cards (Experience items)
- Background: white
- Border: 1px solid light gray
- Padding: p-6 to p-8
- Border-radius: rounded-2xl
- Shadow on hover: subtle elevation

### Icons
- Use Heroicons (outline for most, solid for emphasis)
- Consistent sizing: w-5 h-5 (standard), w-6 h-6 (larger contexts)
- Color matches surrounding text

---

## Images Section

**Required Images**:

1. **Hero Portrait** (LARGE_HERO_IMAGE: YES)
   - Professional headshot or portrait
   - Circular or rounded treatment
   - High quality, well-lit
   - Dimensions: 600x600px minimum
   - Placement: Center of hero section

2. **About Section Photo**
   - Candid or lifestyle shot showing personality
   - Horizontal orientation preferred (4:3 ratio)
   - Dimensions: 800x600px minimum
   - Placement: Left side of about section (desktop)

3. **Contact Section Photo**
   - Friendly, approachable portrait
   - Can be same as hero but smaller treatment
   - Circular or rounded-lg treatment
   - Dimensions: 400x400px minimum
   - Placement: Above contact information

**Image Treatment**:
- All images: object-cover, object-center
- Rounded corners: rounded-2xl (rectangular), rounded-full (circular)
- Subtle shadow on larger images for depth

---

## Accessibility & Polish

- Semantic HTML structure (header, main, section, footer)
- Alt text for all images describing the person/context
- Focus states on all interactive elements (ring-2 ring-offset-2)
- Smooth scrolling between sections (scroll-behavior: smooth)
- Responsive images with appropriate sizes
- Minimum touch targets: 44x44px for mobile

---

## Animations (Minimal)

- Subtle fade-in on scroll for sections (use Intersection Observer)
- Smooth transitions on hover states (transition-all duration-300)
- Scale transform on social icons hover (scale-105)
- No distracting or excessive animations

---

## Technical Notes

- Single-page application with smooth scroll navigation
- Mobile-first responsive design
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Lazy load images below fold
- Meta tags for social sharing with personal photo