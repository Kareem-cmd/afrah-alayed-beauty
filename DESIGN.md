---
name: Afrah Al Ayed Beauty
description: A warm Arabic beauty storefront shaped by the supplied peach and beige identity.
colors:
  paper: "#fffdf9"
  cream: "#f6f0e8"
  ink: "#34251d"
  muted: "#786557"
  accent: "#86552f"
  line: "#e9dfd3"
  peach: "#f2d3bd"
  white: "#ffffff"
  accent-hover: "#6c4125"
  favorite: "#a14e3c"
typography:
  display:
    fontFamily: "Noto Sans Arabic, sans-serif"
    fontSize: "42px"
    fontWeight: 500
    lineHeight: 1.7
    letterSpacing: "-.025em"
  headline:
    fontFamily: "Noto Sans Arabic, sans-serif"
    fontSize: "30px"
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: "-.025em"
  title:
    fontFamily: "Noto Sans Arabic, sans-serif"
    fontSize: "14px"
    fontWeight: 500
  body:
    fontFamily: "Noto Sans Arabic, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.8
  label:
    fontFamily: "Noto Sans Arabic, sans-serif"
    fontSize: "13px"
  latin:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "10px"
    letterSpacing: ".15em"
rounded:
  control: "6px"
  field: "8px"
  product: "12px"
  hero: "14px"
  panel: "16px"
  chip: "30px"
  circle: "50%"
spacing:
  small: "12px"
  medium: "20px"
  large: "24px"
  section-inline: "30px"
  section-block: "65px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  filter-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.chip}"
    padding: "6px 20px"
  product-image:
    backgroundColor: "{colors.cream}"
    rounded: "{rounded.product}"
  dialog:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "28px"
---

# Design System: Afrah Al Ayed Beauty

## Overview

The supplied peach, beige and warm gold artwork defines the identity. Warm ivory surfaces and brown text extend that existing world into a calm Arabic shopping interface. The design is code-led and asset-led: original banners, category illustrations and logo remain the visual anchors.

This document refreshes the existing direction from the implemented HTML, CSS and JavaScript. Its descriptive north star is **warm, personal care**; this is a description of the incumbent system, not a new identity proposal. The interface uses generous space and familiar shopping controls to support browsing.

Key characteristics:

- Arabic RTL composition with warm, restrained contrast.
- Original campaign artwork, circular categories and softly rounded product imagery.
- Sparse shadows, quiet state changes and clear demo disclosures.

Review disposition supplied for this handoff: **ship with limited viewport coverage**. The design engine was unavailable. Documentation reflects source inspection, not an exhaustive rendered-device certification.

## Colors

### Primary

Warm brown (`accent`) identifies primary actions, active navigation, text links and keyboard focus. Its darker hover variant maintains the same family.

### Secondary

Soft peach (`peach`) appears in text selection and add-button hover. Muted terracotta (`favorite`) marks saved products. Original peach and warm gold banner colors remain in the supplied assets.

### Neutral

Warm ivory (`paper`) is the page and dialog surface; cream (`cream`) supports image wells, search and footer areas. Deep brown (`ink`) carries reading text and selected filter pills. Muted brown (`muted`) supports secondary copy; warm pale borders (`line`) separate controls and sections. White labels are reserved for dark action surfaces.

**The Existing Identity Rule.** Extend the original warm artwork instead of replacing its palette with an unrelated visual world.

## Typography

Noto Sans Arabic is the primary family, with the system sans-serif fallback. DM Sans supports Latin microcopy and numeric controls. Both are loaded through Google Fonts; preserve readable fallback behavior when remote fonts are unavailable.

The display role belongs to the ritual heading, the headline role to major section headings, and the title role to product names. Supporting labels are compact. At the mobile breakpoint, general headings become 23px, product names 12px, and ritual headings 30px; the intermediate ritual size is 34px. Ritual prose uses a relaxed 2.1 line height and a desktop maximum width of 36ch.

## Layout

The document is RTL. Sections have a 1240px outer maximum including 30px horizontal padding, leaving 1180px for content. Header and hero use a wider 1400px envelope. The header stays visible while scrolling. Desktop categories form five columns; products form four columns with 32px row and 22px column gaps. The ritual block is a two-column feature, and the footer uses four columns.

At 1000px and below, navigation gaps, feature padding and grid gaps contract. At 700px and below, navigation wraps into its own header row, categories become a horizontally scrollable strip, products become two columns, the ritual becomes one column, and the footer becomes two columns. Mobile sections use 38px vertical and 20px horizontal padding. At 1500px and above, hero horizontal padding becomes a fixed 30px.

Campaign images retain their 2.5:1 proportion. On mobile, the hero CTA sits below the artwork inside the frame. Product imagery uses 4:5 framing. The cart is a right-edge drawer; product details stack on mobile.

## Elevation & Depth

Tonal surfaces and fine borders provide most separation. Product cards have no resting shadow. Shadows are reserved for the campaign CTA, dialogs and transient toast. Exact shadow values and backdrop treatment are recorded in the sidecar. The mobile campaign CTA drops its shadow.

## Shapes

Controls have gently rounded corners, image wells are softer, and large panels are rounder still. Category images, favorite controls and add buttons are circular. Filters use elongated pills. The cart rounds only its left corners to meet the right viewport edge.

## Components

### Buttons and navigation

Primary buttons use warm brown with white text and darken on hover. Icon buttons gain a cream surface on hover. Active desktop navigation has a short brown underline. Keyboard focus uses a 2px accent outline with 5px offset on buttons, links, inputs and selects; retain this treatment in new controls. Disabled buttons use half opacity and a not-allowed cursor.

### Filters and product cards

Selected filters use deep brown with white text; unselected filters gain cream on hover. Filters and favorites expose selection through `aria-pressed`. Product cards pair a rounded 4:5 image with compact category, name and price text, a circular favorite button and a circular add action. Saved hearts are filled terracotta. Product image hover scales to 1.035; categories lift by 6px. Product-name links underline on hover.

### Fields and dialogs

Search fields use white with a warm border and the field radius. Checkout fields use the control radius. Native modal dialogs provide cart, product detail and informational views. A dark translucent blurred backdrop separates them from the storefront. The cart supports quantity changes and removal; the checkout remains visibly a demo.

### Campaign controls and feedback

Campaign slides change manually with directional buttons or dots. The selected dot lengthens from 7px to 23px. A dark toast appears after cart actions and disappears after three seconds. Empty product and cart states retain a clear action back to browsing.

Motion is small and functional: image transforms, subtle control transitions and a toast fade/translation. Reduced-motion preferences disable transitions and animation and remove smooth scrolling. See the sidecar for observed timings.

## Do's and Don'ts

- **Do** preserve supplied logo, banners and category illustrations.
- **Do** maintain Arabic RTL flow, warm brown text and ivory surfaces.
- **Do** retain visible keyboard focus and reduced-motion support.
- **Do** distinguish illustrative product images and demo shopping from commercial claims.
- **Don't** crop campaign text to force a different mobile composition.
- **Don't** introduce heavy shadows across product cards or replace the warm brand palette.
- **Don't** treat limited viewport review as proof of complete device coverage.
