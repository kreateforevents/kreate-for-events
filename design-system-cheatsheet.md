# Kreate for Events - Design System Cheat Sheet

## 🎨 COLORS - Quick Reference

### Primary Blue (Use for CTAs, links, primary actions)
- **Primary:** `#1E40AF` ← Main color
- **Dark:** `#0F2A5C` (Hover state)
- **Light:** `#3B82F6` (Secondary)
- **50:** `#EBF2FF` (Very light background)

### Secondary Orange (Use for highlights, accents)
- **Secondary:** `#F97316` ← Main accent
- **Light:** `#FB923C` (Hover)

### Status Colors
- **Success:** `#10B981` (Green)
- **Error:** `#EF4444` (Red)
- **Warning:** `#F59E0B` (Yellow)
- **Info:** `#3B82F6` (Blue)

### Neutral/Gray (Use for text, borders, backgrounds)
- **Text Primary:** `#111827` (Dark text)
- **Text Secondary:** `#6B7280` (Medium gray text)
- **Text Tertiary:** `#9CA3AF` (Light gray text)
- **Border:** `#E5E7EB` (Light border) / `#D1D5DB` (Medium)
- **Background:** `#FFFFFF` (White) / `#F9FAFB` (Off-white)

---

## 📝 TYPOGRAPHY

### Font Family
```
Primary (Headlines): Inter, system fonts, Roboto, sans-serif
Body (Text): Segoe UI, Roboto, Arial, sans-serif
Code: Fira Code, Courier, monospace
```

### Font Sizes & Weights
| Element | Size | Weight | Usage |
|---------|------|--------|-------|
| **H1** | **32px** | Bold (700) | Page title |
| **H2** | **28px** | Bold (700) | Section heading |
| **H3** | **24px** | Semibold (600) | Subsection |
| **H4** | **20px** | Semibold (600) | Card title |
| **H5** | **16px** | Semibold (600) | Label, form title |
| **Body** | **14px** | Regular (400) | Main text ← Standard |
| **Small** | **12px** | Regular (400) | Caption, metadata |
| **Button** | **14px** | Semibold (600) | Button text |

### Font Weights
- **400** - Regular (body text)
- **500** - Medium (accents)
- **600** - Semibold (labels, buttons) ← Most used
- **700** - Bold (headings)

---

## 🔲 SPACING (8px base unit)

```
4px   = Extra small (xs)
8px   = Small (sm)          ← Use for gaps between elements
12px  = Small-medium (md)
16px  = Medium (lg)         ← Standard padding
20px  = Medium-large (xl)
24px  = Large (2xl)         ← Card padding
32px  = Extra large (3xl)
40px  = Huge (4xl)
48px  = Massive (5xl)
```

**Common Usage:**
- Card padding: **20-24px**
- Button padding: **12px vertical, 16px horizontal**
- Input field padding: **12px**
- Space between elements: **8-16px**
- Section spacing: **32-48px**

---

## 🎯 BUTTONS

### Primary Button (Use for main CTAs)
```css
Background: #1E40AF (Primary Blue)
Text: White
Padding: 12px 24px
Height: 40px
Border Radius: 6px
Font: 14px, Bold (600)
Hover: #0F2A5C (darker blue)
```
**HTML:** `<button class="btn btn-primary">Create</button>`

### Secondary Button (Use for alternatives)
```css
Background: #F9FAFB (Light gray)
Border: 1px #D1D5DB
Text: #1E40AF (Blue)
Padding: 12px 24px
Height: 40px
Hover: Darker gray background
```
**HTML:** `<button class="btn btn-secondary">Cancel</button>`

### Danger Button (Delete/Remove)
```css
Background: #EF4444 (Red)
Text: White
Padding: 12px 24px
Hover: #DC2626 (darker red)
```
**HTML:** `<button class="btn btn-danger">Delete</button>`

### Button Sizes
- **Small:** 36px height, 14px font
- **Medium:** 40px height, 14px font ← Default
- **Large:** 48px height, 16px font

---

## 📋 FORM INPUTS

### Standard Input Field
```css
Height: 40px
Background: White (#FFFFFF)
Border: 1px solid #D1D5DB
Border Radius: 6px
Padding: 12px 14px
Font Size: 14px
Color: #111827
Placeholder: #9CA3AF
Focus: Blue border + blue shadow
Error: Red border + red shadow
```

### Input States
- **Focused:** Border `#1E40AF` + Box shadow
- **Error:** Border `#EF4444` + Error message
- **Success:** Border `#10B981` + Success message
- **Disabled:** Gray background, reduced opacity

---

## 💳 CARDS

### Card Component
```css
Background: White (#FFFFFF)
Border: 1px solid #E5E7EB
Border Radius: 8px
Padding: 20px (standard) / 24px (large)
Box Shadow: Subtle shadow
Hover: Elevated shadow
```

### Card Header
- Padding bottom + border separator
- Font: 16px, Bold
- Color: Primary blue

### Card Footer
- Padding top + border separator
- Buttons right-aligned with 8px gap

---

## 🗂️ MODALS & DROPDOWNS

### Modal
```css
Max Width: 600px
Background: White
Border Radius: 12px
Padding: 24px
Box Shadow: Large shadow
Overlay: Dark background (50% opacity) with blur
```

### Dropdown Menu
```css
Background: White
Border: 1px solid #E5E7EB
Border Radius: 8px
Min Width: 200px
Max Height: 400px (scrollable)
Box Shadow: Large shadow
Item Height: ~44px
Item Hover: Light gray background
```

---

## 👤 TEAM MEMBER LIST

### Avatar Sizes
- **Large:** 64px (profile pictures)
- **Medium:** 48px (team lists) ← Most common
- **Small:** 32px (inline mentions)
- **Tiny:** 24px (comments)

### Team Member Row
```
[Avatar 48px] [Name 16px bold] [Role 12px gray] [+ Add button]
Height: 56px
Hover: Light gray background
Border: 1px bottom separator
```

---

## 📱 RESPONSIVE BREAKPOINTS

```
Mobile:        < 640px     (Reduce padding 25%, smaller fonts)
Tablet:        640-1024px  (Normal sizing)
Desktop:       1024px+     (Full sizing)
```

### Mobile Adjustments
- Card padding: 16px (down from 20px)
- Button height: 36px (down from 40px)
- Font sizes: -1 to 2px
- Modal width: 95vw

---

## 🔄 COMMON PATTERNS

### Form Group
```html
<div class="form-group">
  <label class="form-label required">Email Address</label>
  <input type="email" class="input" placeholder="user@example.com" />
  <p class="form-helper">We'll never share your email</p>
</div>
```

### Card with Header
```html
<div class="card">
  <div class="card-header">
    <h3>Team Members</h3>
  </div>
  <div class="card-body">
    <!-- Content -->
  </div>
</div>
```

### Button Group
```html
<div style="display: flex; gap: 8px;">
  <button class="btn btn-primary">Save</button>
  <button class="btn btn-secondary">Cancel</button>
</div>
```

### Team Member Item
```html
<div style="display: flex; align-items: center; gap: 12px; padding: 12px 16px;">
  <div class="avatar avatar-md avatar-primary">HA</div>
  <div>
    <h5>Harry (Host)</h5>
    <p style="font-size: 12px; color: #6B7280;">Event Lead</p>
  </div>
  <button class="btn btn-ghost btn-sm" style="margin-left: auto;">+</button>
</div>
```

---

## 💾 IMPLEMENTATION OPTIONS

### Option 1: Using CSS Variables
```html
<link rel="stylesheet" href="design-system.css">
```
Use like: `<button style="background-color: var(--color-primary);">Button</button>`

### Option 2: Using Tailwind CSS
```javascript
// Copy tailwind.config.js content into your project
// Use: <button class="btn btn-primary">Button</button>
```

### Option 3: Using SCSS
```scss
@import 'design-system-variables';
.my-button {
  background-color: $color-primary;
  padding: $spacing-md $spacing-lg;
}
```

---

## ✨ QUICK COPY-PASTE

### Primary Color (Use everywhere for main brand)
```
HEX: #1E40AF
RGB: rgb(30, 64, 175)
HSL: hsl(214, 72%, 40%)
```

### Secondary Accent Color (Orange)
```
HEX: #F97316
RGB: rgb(249, 115, 22)
HSL: hsl(25, 97%, 53%)
```

### Standard Gray Text
```
HEX: #6B7280
RGB: rgb(107, 114, 128)
HSL: hsl(217, 13%, 43%)
```

---

## 🚀 MOST IMPORTANT RULES

1. **Primary Button = #1E40AF (Blue)** - Use for all main actions
2. **Secondary Button = Gray background + blue text** - Use for alternatives
3. **Standard Padding = 16px** - Use throughout
4. **Standard Font Size = 14px** - Body text
5. **Standard Border Radius = 6px** - Most elements
6. **Card Padding = 20-24px** - All cards
7. **Focus State = Blue border + blue shadow** - All interactive elements
8. **Spacing = 8px multiples** - Always use 8, 16, 24, 32, etc.

---

## 📊 Color Palette Preview

```
Primary Blue:      ███████ #1E40AF
Primary Dark:      ███████ #0F2A5C
Primary Light:     ███████ #3B82F6
Secondary Orange:  ███████ #F97316
Success Green:     ███████ #10B981
Error Red:         ███████ #EF4444
Warning Yellow:    ███████ #F59E0B
Text Dark:         ███████ #111827
Text Gray:         ███████ #6B7280
Text Light:        ███████ #9CA3AF
Border:            ███████ #E5E7EB
Background:        ███████ #FFFFFF
BG Light:          ███████ #F9FAFB
```

---

## 📚 Files Included

1. **kreate_design_system.md** - Comprehensive design documentation
2. **tailwind.config.js** - Tailwind CSS configuration
3. **design-system.css** - Standalone CSS file with all styles
4. **design-system-cheatsheet.md** - This quick reference guide

## 🎯 Next Steps

1. Choose your implementation method (CSS, Tailwind, or custom)
2. Import the design system files into your project
3. Use the classes and CSS variables as needed
4. Refer to this cheat sheet while building

---

*Created: June 25, 2026 | Design System v1.0*
