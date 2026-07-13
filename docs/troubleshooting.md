# Troubleshooting

Solutions to common issues when developing, running, or deploying SpeakFlow.

---

## Installation Issues

### `npm install` fails

**Symptoms:** Dependency resolution errors or permission issues.

**Solutions:**

1. Ensure Node.js 20+ is installed: `node --version`
2. Clear npm cache: `npm cache clean --force`
3. Delete `node_modules/` and `package-lock.json`, then reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
4. On Windows, run the terminal as Administrator if you see permission errors.

### Prisma generate fails

**Symptoms:** `Error: Cannot find module '@prisma/client'`

**Solutions:**

```bash
cd api
npx prisma generate
```

If it still fails, ensure `DATABASE_URL` is set in `api/.env` (even a placeholder works for generation).

---

## Development Issues

### Frontend won't start

**Symptoms:** `npm run dev` fails or shows a blank page.

**Solutions:**

1. Check for port conflicts — Vite defaults to port `5173`:
   ```bash
   npx kill-port 5173
   npm run dev
   ```
2. Verify Node.js version: `node --version` (must be 20+)
3. Check for TypeScript errors: `npx tsc --noEmit`

### API won't start

**Symptoms:** `npm run dev` in `api/` fails or crashes.

**Solutions:**

1. Verify `api/.env` exists with required variables
2. Check PostgreSQL is running and `DATABASE_URL` is correct:
   ```bash
   psql $DATABASE_URL -c "SELECT 1"
   ```
3. Run Prisma setup:
   ```bash
   cd api
   npx prisma generate
   npx prisma db push
   ```

### CORS errors in browser console

**Symptoms:** `Access-Control-Allow-Origin` errors when calling the API.

**Solutions:**

1. Ensure the API is running on the expected port
2. Verify `VITE_API_BASE_URL` in `.env` matches the API URL
3. For production, use `vercel.json` rewrites to proxy API requests
4. Add your frontend origin to the API CORS config if needed

---

## AI Generation Issues

### "AI Generating Speech" hangs indefinitely

**Symptoms:** Progress bar stays at 95%, no script generated.

**Solutions:**

1. Check API server is running: `curl http://localhost:3000/api/scripts`
2. Verify AI environment variables in `api/.env`:
   ```env
   AI_API_KEY=sk-your-valid-key
   AI_ENDPOINT=https://api.openai.com/v1
   AI_MODEL=gpt-4o-mini
   ```
3. Check API server logs for error messages
4. Test the AI endpoint directly:
   ```bash
   curl https://api.openai.com/v1/models \
     -H "Authorization: Bearer $AI_API_KEY"
   ```

### AI returns empty or malformed scripts

**Symptoms:** Script content is blank or contains unexpected formatting.

**Solutions:**

1. Try a more specific prompt with clear instructions
2. Switch to a different model (e.g., `gpt-4o` instead of `gpt-4o-mini`)
3. Check API logs for the raw AI response
4. Verify your API key has sufficient quota/credits

### API returns 500 on script creation

**Symptoms:** `POST /api/scripts` returns Internal Server Error.

**Solutions:**

1. Check database connection: `npx prisma db push` in `api/`
2. Verify `DATABASE_URL` is correct and the database is accessible
3. Check server logs for the specific error stack trace
4. Ensure the request body includes `{ "topic": "your prompt" }`

---

## Teleprompter Issues

### Auto-scroll is jerky or stuttering

**Symptoms:** Scrolling is not smooth during playback.

**Solutions:**

1. Close other heavy browser tabs or applications
2. Try a lower scroll speed (0.5× – 1×)
3. Disable browser extensions that may interfere with animations
4. Use Chrome or Edge for best `requestAnimationFrame` performance

### Fullscreen mode doesn't work

**Symptoms:** Clicking fullscreen has no effect or shows an error.

**Solutions:**

1. Fullscreen requires a user gesture (click) — it cannot be triggered programmatically on page load
2. Some browsers block fullscreen in iframes
3. Check browser console for `requestFullscreen` errors
4. Try pressing `F11` for browser-native fullscreen as a workaround

### Scripts appear as a single block of text

**Symptoms:** No line breaks in the teleprompter view.

**Solutions:**

1. Ensure your script has paragraph breaks (double newlines)
2. AI-generated scripts should format automatically — regenerate if needed
3. Very short scripts may appear as a single line (expected behavior)

### Mirror mode text is unreadable

**Symptoms:** Flipped text is hard to read.

**Solutions:**

Mirror mode is designed for physical mirror rigs. If you're not using a mirror setup, disable mirror mode in the settings drawer.

---

## Data Issues

### Scripts disappeared after browser update

**Symptoms:** Previously saved scripts are missing.

**Solutions:**

1. Scripts are stored in `localStorage` — clearing browser data removes them
2. Check if you're in a private/incognito window (data is session-only)
3. Verify localStorage is enabled in browser settings
4. Future cloud sync will prevent this issue

### Practice history shows incorrect WPM

**Symptoms:** WPM seems too high or too low.

**Solutions:**

1. WPM is calculated from word count ÷ recording duration
2. Start the microphone recording for accurate duration tracking
3. Without recording, a default duration of 72 seconds is used
4. Adjust your target WPM in practice settings for better pace ratings

---

## Build & Deployment Issues

### `npm run build` fails with TypeScript errors

**Solutions:**

```bash
npx tsc -b
```

Fix any reported type errors before building. Common issues:
- Missing type imports
- Incorrect prop types on components

### Production build shows blank page

**Solutions:**

1. Check browser console for JavaScript errors
2. Verify `VITE_API_BASE_URL` is set correctly for production
3. Ensure `vercel.json` output directory is `dist`
4. Check that asset paths are correct (no hardcoded `localhost` URLs)

### Vercel deployment fails

**Solutions:**

1. Check Vercel build logs for specific errors
2. Ensure all environment variables are set in Vercel dashboard
3. Verify `package.json` build script: `"build": "tsc -b && vite build"`
4. For API deployment, ensure `postinstall` runs `prisma generate`

### Database connection fails in production

**Solutions:**

1. Use a connection pooling URL if your provider offers one (e.g., Neon, Supabase)
2. Set both `DATABASE_URL` (pooled) and `DIRECT_URL` (direct) in environment variables
3. Whitelist Vercel's IP ranges if your database has IP restrictions
4. Run `npx prisma db push` with the production `DATABASE_URL`

---

## Theme & UI Issues

### Dark/light theme doesn't switch

**Solutions:**

1. Click the sun/moon icon in the header
2. Check that `document.documentElement` has the `dark` class when in dark mode
3. Clear browser cache if styles appear stale

### UI looks broken on mobile

**Solutions:**

1. Ensure viewport meta tag is present in `index.html`
2. Test with browser DevTools responsive mode
3. Check for horizontal overflow (wide elements without `max-w-full`)

---

## Getting More Help

If your issue isn't covered here:

1. Search [existing GitHub Issues](https://github.com/okaadyx/speakflow/issues)
2. Open a [new issue](https://github.com/okaadyx/speakflow/issues/new) with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs. actual behavior
   - Browser/OS/Node.js versions
   - Relevant console logs or screenshots
3. Email [support@speakflow.app](mailto:support@speakflow.app)
