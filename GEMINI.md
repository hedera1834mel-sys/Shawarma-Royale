# Project Guidelines & Automated Deployment: Shawarma Royale

## Automated Deployment Workflow
When completing tasks, modifications, or fixes in this project:
1. Validate changes locally using `pnpm --filter @workspace/lassi-wassi run build`.
2. Automatically stage and commit the changes with an informative message.
3. Automatically push to GitHub:
   ```bash
   git push origin main
   ```
   Target remote: `https://github.com/hedera1834mel-sys/Shawarma-Royale.git`
4. Confirm to the user that changes are pushed and Vercel is auto-deploying.
5. Do not prompt the user for manual push confirmation every time.

## Project Integrity Rules
- Preserve all existing menu items, prices, food assets, animations, and restaurant details.
- Preserve database and backend structures (`lib/db`, `artifacts/api-server`).
- Respect Vercel configuration (`artifacts/lassi-wassi/vercel.json`).
