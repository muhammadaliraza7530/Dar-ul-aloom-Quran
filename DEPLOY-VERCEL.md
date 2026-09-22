# Deploying this site to Vercel

1. Unzip the project and upload it to a new GitHub repository (or use `vercel` CLI in the folder).
2. In Vercel, click **Add New → Project** and import the repository.
3. Framework preset: **Other**. Build command: `npm run build`. Install command: `npm install`.
4. Add these Environment Variables (Production + Preview) — they are already in the included `.env` file:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_PROJECT_ID`
5. Deploy. The database, login and forms keep working because they point to the same hosted backend.

Local run: `npm install` then `npm run dev` (http://localhost:8080).
