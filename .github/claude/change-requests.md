# Zen MMA website – rules for change requests

## Stack

Astro, Tailwind v4, TypeScript, Decap CMS, Netlify.

## Schedule changes (most requests)

- Only edit `src/content/<schedule-file>`.
- Keep the same format and field names.
- Don't touch components, styles or layout.

## Rules

- Make the smallest change that does the job.
- If the request is unclear, ask in an issue comment. Don't guess.
- Never change prices, contact info or legal text unless the request clearly asks for it.
- Before opening a PR, run these as separate commands: `npm ci`, then `npm run astro check`, then `npm run build`. All must pass. If any fail, don't open the PR. Comment on the issue with the error instead.
- PR title: short summary of the change.
- PR description: quote the original request and list what changed.
