# Kreate for Events - Design System & Style Guide

**Project:** Collaboration Platform for Content Management & Team Coordination
**Version:** 1.0
**Date:** June 25, 2026

---

## 🎨 Color Palette

### Primary Colors
- **Primary Blue:** `#1E40AF` (Deep professional blue) - Primary CTA, buttons, links
- **Primary Dark:** `#0F2A5C` (Darker shade for hover states)
- **Primary Light:** `#3B82F6` (Bright blue for secondary actions)

### Secondary Colors
- **Accent Orange:** `#F97316` (Energetic accent for highlights)
- **Accent Orange Light:** `#FB923C` (Lighter shade for hover)
- **Neutral Gray:** `#6B7280` (Text, secondary elements)

### Status Colors
- **Success Green:** `#10B981` (Team member added, upload complete)
- **Error Red:** `#EF4444` (Form validation errors, warnings)
- **Warning Yellow:** `#F59E0B` (Pending actions, caution)
- **Info Blue:** `#3B82F6` (Information messages)

### Background Colors
- **Background Primary:** `#FFFFFF` (White - main background)
- **Background Secondary:** `#F9FAFB` (Very light gray - card backgrounds, alternate sections)
- **Background Dark:** `#111827` (Dark mode support - dark background)
- **Background Dark Secondary:** `#1F2937` (Dark card backgrounds)

### Border & Dividers
- **Border Light:** `#E5E7EB` (Light borders, subtle dividers)
- **Border Medium:** `#D1D5DB` (Standard borders)
- **Border Dark:** `#6B7280` (Darker borders for emphasis)

### Text Colors
- **Text Primary:** `#111827` (Main text, high contrast)
- **Text Secondary:** `#6B7280` (Secondary text, labels)
- **Text Tertiary:** `#9CA3AF` (Muted text, placeholders)
- **Text Inverse:** `#FFFFFF` (Text on dark backgrounds)

---

## 📝 Typography

### Font Family
**Primary Font (Headlines & Bold):** 
- `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- Fallback: System fonts for maximum compatibility

**Secondary Font (Body Text):**
- `'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`
- Clean, readable sans-serif for body content

### Font Sizes & Weights

#### Headings
| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| H1 | 32px (2rem) | 700 Bold | 1.2 | Page titles, main headings |
| H2 | 28px (1.75rem) | 700 Bold | 1.3 | Section headings |
| H3 | 24px (1.5rem) | 600 Semi-bold | 1.4 | Subsections, cards |
| H4 | 20px (1.25rem) | 600 Semi-bold | 1.4 | Small headings, list titles |
| H5 | 16px (1rem) | 600 Semi-bold | 1.5 | Labels, form titles |
| H6 | 14px (0.875rem) | 600 Semi-bold | 1.5 | Small labels |

#### Body Text
| Element | Size | Weight | Line Height | Usage |
|---------|------|--------|-------------|-------|
| Body Large | 16px (1rem) | 400 Regular | 1.6 | Main body text, descriptions |
| Body Regular | 14px (0.875rem) | 400 Regular | 1.6 | Secondary text, helper text |
| Body Small | 12px (0.75rem) | 400 Regular | 1.5 | Captions, metadata |
| Button Text | 14px (0.875rem) | 600 Semi-bold | 1.5 | Button labels |
| Code/Mono | 13px (0.8125rem) | 400 Regular | 1.6 | Code blocks, technical text |

### Font Weight Scale
- **400** - Regular (body text)
- **500** - Medium (semi-bold accents)
- **600** - Semi-bold (labels, buttons)
- **700** - Bold (headings)

---

## 🔲 Component Sizing & Spacing

### Spacing Scale (8px base unit)
```
4px    = 0.25rem (extra small)
8px    = 0.5rem  (small)
12px   = 0.75rem (small-medium)
16px   = 1rem    (medium / standard)
20px   = 1.25rem (medium-large)
24px   = 1.5rem  (large)
32px   = 2rem    (extra large)
40px   = 2.5rem  (huge)
48px   = 3rem    (massive)
```

### Common Component Sizes

#### Buttons
- **Small:** 32px height, 14px font, 12px padding-x
- **Medium:** 40px height, 14px font, 16px padding-x (standard)
- **Large:** 48px height, 16px font, 20px padding-x

#### Input Fields
- **Height:** 40px
- **Padding:** 12px (vertical), 14px (horizontal)
- **Border Radius:** 6px
- **Font Size:** 14px

#### Cards
- **Padding:** 20px (standard), 24px (large)
- **Border Radius:** 8px
- **Box Shadow:** 0 1px 3px rgba(0,0,0,0.1)
- **Hover Shadow:** 0 4px 12px rgba(0,0,0,0.15)

#### Avatar/Profile Images
- **Large:** 64px diameter
- **Medium:** 48px diameter (team member list)
- **Small:** 32px diameter (comments, replies)
- **Tiny:** 24px diameter (inline mentions)
- **Border Radius:** 50% (fully round)

---

## 🎯 Button Styles

### Primary Button
- **Background:** `#1E40AF` (Primary Blue)
- **Text Color:** `#FFFFFF` (White)
- **Border:** None
- **Padding:** 12px 24px
- **Border Radius:** 6px
- **Font Weight:** 600 Semi-bold
- **Hover State:** Background `#0F2A5C` (Primary Dark)
- **Active State:** Background `#0C1E47` (Even darker)
- **Box Shadow (hover):** 0 4px 12px rgba(30,64,175,0.3)

### Secondary Button
- **Background:** `#F9FAFB` (Background Secondary)
- **Text Color:** `#1E40AF` (Primary Blue)
- **Border:** 1px solid `#D1D5DB` (Border Medium)
- **Padding:** 12px 24px
- **Border Radius:** 6px
- **Font Weight:** 600 Semi-bold
- **Hover State:** Background `#F3F4F6`, Border `#9CA3AF`

### Danger Button (Delete/Remove)
- **Background:** `#EF4444` (Error Red)
- **Text Color:** `#FFFFFF` (White)
- **Padding:** 12px 24px
- **Border Radius:** 6px
- **Font Weight:** 600 Semi-bold
- **Hover State:** Background `#DC2626`

### Ghost Button (Tertiary)
- **Background:** Transparent
- **Text Color:** `#6B7280` (Text Secondary)
- **Border:** None
- **Padding:** 8px 16px
- **Border Radius:** 6px
- **Font Weight:** 500
- **Hover State:** Background `#F3F4F6`, Text `#111827`

### Button with Icon
- **Icon Size:** 18px
- **Icon Spacing:** 8px right of text
- **Alignment:** Center vertically

---

## 🔤 Input Fields & Form Elements

### Text Input
- **Height:** 40px
- **Background:** `#FFFFFF` (White)
- **Border:** 1px solid `#D1D5DB` (Border Medium)
- **Border Radius:** 6px
- **Padding:** 12px 14px
- **Font Size:** 14px
- **Font Color:** `#111827` (Text Primary)
- **Placeholder Color:** `#9CA3AF` (Text Tertiary)
- **Focus State:** 
  - Border: 2px solid `#1E40AF` (Primary Blue)
  - Box Shadow: 0 0 0 3px rgba(30,64,175,0.1)
  - Padding: 11px 13px (adjust for 2px border)
- **Error State:**
  - Border: 2px solid `#EF4444` (Error Red)
  - Box Shadow: 0 0 0 3px rgba(239,68,68,0.1)
- **Disabled State:**
  - Background: `#F9FAFB` (Background Secondary)
  - Border: 1px solid `#E5E7EB` (Border Light)
  - Color: `#9CA3AF` (Text Tertiary)
  - Cursor: not-allowed

### Dropdown/Select
- **Same as Text Input** base styling
- **Dropdown Arrow:** 16px icon, right-aligned, color `#6B7280`
- **Open State:** Border color `#1E40AF`, visible options list

### Checkbox
- **Size:** 18px × 18px
- **Unchecked:** Border 2px `#D1D5DB`, background white
- **Checked:** Background `#1E40AF`, checkmark white
- **Border Radius:** 4px
- **Focus:** 3px box shadow in primary blue
- **Disabled:** Opacity 0.5, cursor not-allowed

### Radio Button
- **Size:** 18px diameter
- **Unchecked:** Border 2px `#D1D5DB`, background white
- **Checked:** Inner circle `#1E40AF`, border `#1E40AF`
- **Border Radius:** 50% (fully round)
- **Disabled:** Opacity 0.5, cursor not-allowed

### Form Labels
- **Font Size:** 14px (0.875rem)
- **Font Weight:** 600 Semi-bold
- **Color:** `#111827` (Text Primary)
- **Margin Bottom:** 8px
- **Required Indicator:** Red asterisk `*` (color `#EF4444`)

### Helper Text & Validation
- **Helper Text:** 12px, color `#6B7280`, margin-top 4px
- **Error Message:** 12px, color `#EF4444`, margin-top 4px
- **Success Message:** 12px, color `#10B981`, margin-top 4px

---

## 💳 Cards & Containers

### Standard Card
- **Background:** `#FFFFFF` (White)
- **Border:** 1px solid `#E5E7EB` (Border Light)
- **Border Radius:** 8px
- **Padding:** 20px (standard), 24px (large)
- **Box Shadow:** `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)`
- **Hover Shadow (interactive):** `0 4px 6px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.06)`
- **Transition:** box-shadow 200ms ease

### Dark Card (Dark Mode)
- **Background:** `#1F2937` (Background Dark Secondary)
- **Border:** 1px solid `#374151` (Dark border)
- **Text Color:** `#F3F4F6` (Light text)

### Card with Header
- **Header Background:** `#F9FAFB` (Background Secondary)
- **Header Height:** 56px
- **Header Padding:** 16px 20px
- **Header Title Font:** 16px, 600 weight, Primary Blue

### Focused/Selected Card
- **Border:** 2px solid `#1E40AF` (Primary Blue)
- **Box Shadow:** 0 0 0 3px rgba(30,64,175,0.1)

---

## 🎪 Modal & Dialog

### Modal Overlay
- **Background:** rgba(17, 24, 39, 0.5) (Dark overlay with transparency)
- **Backdrop Filter:** blur(4px)

### Modal Window
- **Background:** `#FFFFFF` (White)
- **Border Radius:** 12px
- **Min Width:** 400px
- **Max Width:** 90vw
- **Max Height:** 90vh
- **Padding:** 24px
- **Box Shadow:** `0 20px 25px -5px rgba(0, 0, 0, 0.1)`

### Modal Header
- **Title Font:** 20px, 700 weight, Primary color
- **Close Button:** Icon 24px, top-right, color `#6B7280`
- **Hover:** Color `#111827`

### Modal Footer
- **Padding:** 16px 0
- **Border Top:** 1px solid `#E5E7EB`
- **Button Alignment:** Right-aligned, gap 8px between buttons

---

## 🗂️ Dropdown & Menu

### Dropdown Button
- **Same styling as Secondary Button**
- **Arrow Icon:** 16px, rotates on open

### Dropdown Menu
- **Background:** `#FFFFFF`
- **Border:** 1px solid `#E5E7EB`
- **Border Radius:** 8px
- **Box Shadow:** `0 10px 15px -3px rgba(0, 0, 0, 0.1)`
- **Z-index:** 1000
- **Min Width:** 200px
- **Max Height:** 400px with scroll

### Dropdown Item
- **Padding:** 12px 16px
- **Font Size:** 14px
- **Hover Background:** `#F9FAFB`
- **Active Background:** `#EBF2FF` (Light primary blue)
- **Active Text Color:** `#1E40AF` (Primary Blue)
- **Disabled:** Opacity 0.5, cursor not-allowed

### Divider in Dropdown
- **Height:** 1px
- **Background:** `#E5E7EB`
- **Margin:** 4px 0

---

## 👥 Team Member List Item

### Team Member Card (Workspace)
- **Height:** 56px
- **Padding:** 12px 16px
- **Display:** Flex, items center
- **Border Bottom:** 1px solid `#E5E7EB`
- **Hover Background:** `#F9FAFB`

### Avatar + Name Layout
```
[Avatar 48px] [Name 16px] [Role 12px gray] [+ Button right]
```
- **Avatar Size:** 48px diameter
- **Name Font:** 16px, 600 weight, color `#111827`
- **Role Font:** 12px, 400 weight, color `#6B7280`
- **Left Margin (Name):** 12px from avatar
- **Add Button:** 36px circle with "+" icon, hover background blue light

---

## 📱 Responsive Breakpoints

```
Mobile:        < 640px
Tablet Small:  640px - 768px
Tablet:        768px - 1024px
Desktop:       1024px - 1280px
Desktop Large: >= 1280px
```

### Mobile Adjustments
- **Padding:** Reduced by 25% on mobile
- **Font Sizes:** Reduced by 1-2px for bodies
- **Button Height:** 36px (down from 40px)
- **Card Padding:** 16px (down from 20px)
- **Modal Max Width:** 95vw
- **Dropdown Menu:** Takes 90vw on mobile

---

## 🎨 Dark Mode (Optional Future Implementation)

### Dark Mode Colors
- **Primary:** `#60A5FA` (Lighter blue for contrast)
- **Background:** `#111827`
- **Background Secondary:** `#1F2937`
- **Text Primary:** `#F9FAFB`
- **Text Secondary:** `#D1D5DB`
- **Border:** `#374151`
- **Card Background:** `#1F2937`

---

## 🚀 Component Library Quick Reference

| Component | Primary Button | Secondary Button | Input | Card |
|-----------|---|---|---|---|
| Height | 40px | 40px | 40px | Auto |
| Padding | 12px 24px | 12px 24px | 12px 14px | 20px |
| Font Size | 14px | 14px | 14px | Varies |
| Border Radius | 6px | 6px | 6px | 8px |
| Background | #1E40AF | #F9FAFB | #FFFFFF | #FFFFFF |
| Border | None | #D1D5DB | #D1D5DB | #E5E7EB |

---

## 💡 Design Tokens (CSS Variables)

```css
:root {
  /* Colors - Primary */
  --color-primary: #1E40AF;
  --color-primary-dark: #0F2A5C;
  --color-primary-light: #3B82F6;
  
  /* Colors - Secondary */
  --color-secondary: #F97316;
  --color-secondary-light: #FB923C;
  
  /* Colors - Status */
  --color-success: #10B981;
  --color-error: #EF4444;
  --color-warning: #F59E0B;
  --color-info: #3B82F6;
  
  /* Colors - Neutral */
  --color-text-primary: #111827;
  --color-text-secondary: #6B7280;
  --color-text-tertiary: #9CA3AF;
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F9FAFB;
  --color-border-light: #E5E7EB;
  --color-border-medium: #D1D5DB;
  
  /* Typography */
  --font-family-primary: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-family-secondary: "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  
  --font-size-h1: 2rem;
  --font-size-h2: 1.75rem;
  --font-size-h3: 1.5rem;
  --font-size-body: 1rem;
  --font-size-body-small: 0.875rem;
  
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-full: 50%;
  
  /* Shadow */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 4px 6px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;
}
```

---

## 🎯 Usage Examples

### Button States
```html
<!-- Primary Button -->
<button class="btn btn-primary">Create Workspace</button>

<!-- Secondary Button -->
<button class="btn btn-secondary">Cancel</button>

<!-- Danger Button -->
<button class="btn btn-danger">Delete</button>

<!-- Disabled State -->
<button class="btn btn-primary" disabled>Loading...</button>
```

### Form Input
```html
<div class="form-group">
  <label for="email">Email Address</label>
  <input type="email" id="email" placeholder="user@example.com" />
  <span class="helper-text">We'll never share your email</span>
</div>

<!-- Error State -->
<div class="form-group error">
  <label for="email">Email Address *</label>
  <input type="email" id="email" value="invalid" />
  <span class="error-message">Please enter a valid email</span>
</div>
```

### Card Component
```html
<div class="card">
  <div class="card-header">
    <h3>Team Members</h3>
  </div>
  <div class="card-body">
    <!-- Content here -->
  </div>
</div>
```

---

## 📊 Accessibility Guidelines

- **Color Contrast:** All text must meet WCAG AA standards (4.5:1 for normal text)
- **Focus States:** All interactive elements must have visible focus indicators
- **Icons:** All icons should have accompanying text or aria-labels
- **Buttons:** Minimum touch target size 44×44px on mobile
- **Animations:** Respect `prefers-reduced-motion` for transitions
- **Alt Text:** All images must have descriptive alt attributes

---

## 🔄 Future Updates

- Dark mode full implementation
- Additional status color states
- Animation guidelines (loading, transitions)
- Micro-interactions (hover effects, feedback)
- Mobile gesture interactions
- Accessibility audit results

---

*This design system is living documentation. Updates will be tracked and communicated to the team.*
