# Betstake — Design Specification

## Reference and confidence
- Visual direction reference: [Fansport — betting platform on Behance](https://www.behance.net/gallery/255208455/Fansport-betting-platform).
- Full reference screens were not available for detailed inspection. This is a considered sportsbook interpretation, not a claim of pixel-perfect reproduction.
- No images are downloaded or generated. Media areas remain intentionally blank; team identifiers are text labels.

## Visual direction
- Charcoal foundation, restrained lime-green accent, warm-white typography, muted secondary labels.
- Dense but legible sportsbook layout: main navigation, sports list, featured event, match markets, and persistent desktop bet slip.
- Rounded surfaces, subtle borders, tabular odds numerals, visible selected states.
- Responsive layout adapts to compact mobile navigation and a bottom bet-slip summary.

## Functional scope
- Sport filtering, search, match tabs, odds selection, selection removal, clear slip, stake input, and local potential-return calculation.
- Fixtures and odds are illustrative demo data, not live feeds.
- No accounts, wallet, payments, real-money wagering, or external sportsbook APIs.

## Accessibility
- Semantic buttons and labels, visible keyboard focus, descriptive odds labels, and reduced-motion support.

## Verification
- Run npm install, then npm run build.
- Manually check desktop and mobile widths, filters/search, adding/removing odds, and stake updates.
