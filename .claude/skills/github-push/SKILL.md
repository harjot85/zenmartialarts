---
name: github-push
description: Use when pushing completed work to GitHub
---

## GitHub Push Workflow — Zen MMA

### Pre-flight checks (run in this exact order, stop if any fail)

1. `npm run astro check` — must return 0 errors
2. `npm run build` — must complete successfully
3. `git status` — review every changed file,
   confirm nothing unexpected is included

### Commit message format

Always use this format:
feat: short description (new component or feature)
fix: short description (bug fix or visual correction)
chore: short description (config, cleanup, dependencies)
style: short description (design or color changes)

Examples:

- feat: add Instructors carousel component
- fix: correct gold accent color on TrustBar
- chore: install @astrojs/check and typescript
- style: switch color theme from red to gold

### Push steps

4. `git add .`
5. `git commit -m "your message"`
6. `git push origin main`

### Post-push

7. Confirm Vercel deploy triggered at
   https://zenmartialarts.vercel.app
8. Wait for deploy to complete (~30 seconds)
9. Verify live site at https://zenmartialarts.ca
10. Report: commit hash, deploy status, live URL

### Never push if

- astro check has errors
- build fails
- you are mid-component (incomplete work)
