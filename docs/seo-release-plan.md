# SEO Release Plan

This site should not keep changing core pages every day. Core pages are now in a stabilization period. New SEO pages should be prepared as drafts, marked ready after review, and released at a slow cadence.

## Cadence

- Release at most 1 new SEO page per run.
- Default cadence: every 7 days.
- Core pages excluded from automatic release: `/`, `/selling-prices/`, item pages, fish pages, and existing guide pages.
- Do not auto-release pages unless they are marked `ready`.

## Commands

```bash
npm run seo:release:status
npm run seo:release:ready -- crop-profit-calculator
npm run seo:release:due
npm run seo:release:next
```

After a release command changes the queue, run:

```bash
npm run build
npm run verify
```

Deploy only after the build and data audit pass.

## Current Priority

1. `/crop-profit-calculator/`
2. `/keg-vs-jar-calculator/`
3. `/stardew-valley-price-list-pdf/`
4. `/greenhouse-calculator/`
5. `/fish-pond-calculator/`
6. `/community-center-checklist/`

## Rule

PDF/download pages should not be marked ready until the actual downloadable asset exists. Calculator pages should not be marked ready until the page has a useful interactive or decision-focused experience, not just a thin landing page.
