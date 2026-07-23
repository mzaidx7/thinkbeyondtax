# Think Beyond Tax Design System

## Direction

The interface is a dark, premium professional system shaped by black and charcoal surfaces, restrained gold light, silver typography, subtle hexagonal structure and precise software-inspired details. It should feel assured and technically capable, not ornate or theatrical.

## Typography

- Lato, weights 300 and 900 only, is the display voice for headings, large counters and hero statements.
- Inter variable is the body and interface family.
- Recreated software screens always use Inter and retain their explicit rendering adjustments.
- Do not add a decorative or Arabic-specific font without a separate design decision.

## Colour and surfaces

- Ink and charcoal form the base.
- Gold is used for guidance, focus, active state and restrained light.
- Silver is the primary reading colour; grey is secondary copy.
- Glass is functional: calls to action, navigation surfaces and selected support panels. Maintain legible solid fallbacks.
- Avoid gradient-filled display text on new internal surfaces. Use moving gradients as atmospheric light behind content.

## Layout

- Use the shared 76rem container and a 4.5rem fixed header offset.
- Keep reading copy within roughly 65 to 75 characters per line.
- Internal pages use one shared hero and consistent section rhythm.
- Service pages pair a sticky numbered navigator with complete, crawlable content sections.
- Mobile anchor controls wrap and remain touch-friendly without horizontal overflow.

## Motion

- Motion owns the existing homepage hero and simple component reveals.
- GSAP owns new internal-page choreography, process diagrams, gradient drift and service-section state.
- Never let both libraries control the same CSS property on the same element.
- Animate transforms and opacity only. Scope timelines, clean up on unmount and respect reduced motion.
- Lenis and ScrollTrigger share one animation loop on fine-pointer devices. Touch and reduced-motion use native scrolling.

## Interaction and accessibility

- Preserve visible keyboard focus on every link, button and form control.
- Hover is an enhancement, never the only indication of state.
- Selected service navigation uses colour, border and semantic current state.
- Buttons need hover, focus, active and disabled treatment with adequate contrast.
- Target 375, 768, 1024 and 1440 pixel layouts.

## Content voice

Use concise, practical language. Prefer reconciled, review-ready records over absolute quality promises. Explain regulated work as preparation, support, coordination or filing assistance, with the responsible professional and official authority kept explicit.
