# Automated Deployment Protocol: Shawarma Royale

Whenever changes, fixes, or features are implemented in this repository:

1. **Build Verification**:
   Always verify the production build before concluding any task:
   `pnpm --filter @workspace/lassi-wassi run build`
   If the build encounters errors, fix them immediately. Never push failing builds.

2. **Automated Git Push**:
   Do not stop to ask the user for manual push confirmation. Once the task is implemented and verified:
   - Stage the affected project files.
   - Commit with a descriptive message.
   - Automatically push to the remote repository:
     `git push origin main`
     Target: `https://github.com/hedera1834mel-sys/Shawarma-Royale.git`
   - Report the commit hash and confirm that Vercel is auto-deploying the changes.

3. **Safety Rules**:
   - Maintain original website layout, design, menu items, and branding unless explicitly asked to modify them.
   - Never overwrite or delete backend/database configuration.
   - Keep `.env`, temporary files, and `node_modules` strictly ignored.
