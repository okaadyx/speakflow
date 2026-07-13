# Deployment Guide

This guide covers deploying SpeakFlow to production using Vercel, with PostgreSQL and an AI provider.

---

## Overview

| Component | Platform | Notes |
|-----------|----------|-------|
| Frontend (SPA) | Vercel | Static build from `dist/` |
| API (Express) | Vercel Serverless / Node | Compiled from `api/dist/` |
| Database | PostgreSQL | Vercel Postgres, Supabase, Neon, or Railway |
| AI Provider | External | OpenAI, Azure OpenAI, or compatible endpoint |

---

## Prerequisites

- A [Vercel](https://vercel.com/) account
- A PostgreSQL database (hosted)
- An OpenAI-compatible API key
- GitHub repository connected to Vercel

---

## Step 1: Set Up PostgreSQL

### Option A: Vercel Postgres

1. In your Vercel project dashboard, go to **Storage** → **Create Database** → **Postgres**.
2. Copy the `POSTGRES_URL` connection string.

### Option B: External Provider (Neon, Supabase, Railway)

1. Create a PostgreSQL instance on your preferred provider.
2. Copy the connection string in the format:
   ```
   postgresql://user:password@host:5432/database
   ```

### Run Migrations

```bash
cd api
DATABASE_URL="your-connection-string" npx prisma db push
```

---

## Step 2: Deploy the API

### Environment Variables

Set these in your Vercel project settings (or `api/.env` for local production testing):

| Variable | Value |
|----------|-------|
| `PORT` | `3000` |
| `DATABASE_URL` | Your PostgreSQL connection string |
| `DIRECT_URL` | Direct connection URL (for Prisma migrations) |
| `AI_API_KEY` | Your AI provider API key |
| `AI_ENDPOINT` | `https://api.openai.com/v1` (or your provider URL) |
| `AI_MODEL` | `gpt-4o-mini` (or your preferred model) |

### Build Configuration

The API build command:

```bash
cd api && npm install && npm run build
```

Start command:

```bash
cd api && npm run start
```

### Verify API Deployment

```bash
curl https://your-api-url.vercel.app/api/scripts
```

Expected response: `[]` (empty array) or a list of scripts.

---

## Step 3: Deploy the Frontend

### Environment Variables

| Variable | Value |
|----------|-------|
| `VITE_API_BASE_URL` | `https://your-api-url.vercel.app/api` |

### Build Configuration

Vercel auto-detects Vite projects. The default settings work:

| Setting | Value |
|---------|-------|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

### API Proxy Configuration

Update `vercel.json` with your production API URL:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-api-url.vercel.app/api/:path*"
    }
  ]
}
```

This proxies frontend `/api/*` requests to your backend, avoiding CORS issues.

---

## Step 4: Custom Domain (Optional)

1. In Vercel project settings, go to **Domains**.
2. Add your custom domain (e.g., `speakflow.app`).
3. Configure DNS records as instructed by Vercel.
4. SSL is provisioned automatically.

---

## Deployment Checklist

- [ ] PostgreSQL database created and accessible
- [ ] Prisma schema pushed (`npx prisma db push`)
- [ ] API environment variables set in Vercel
- [ ] API deployed and responding to `/api/scripts`
- [ ] Frontend `VITE_API_BASE_URL` points to production API
- [ ] `vercel.json` rewrites updated with production API URL
- [ ] Frontend deployed and loading correctly
- [ ] AI script generation tested end-to-end
- [ ] Custom domain configured (if applicable)
- [ ] HTTPS enforced on all endpoints

---

## Alternative Deployment Options

### Docker

```dockerfile
# Example Dockerfile for the API
FROM node:20-alpine
WORKDIR /app
COPY api/package*.json ./
RUN npm ci --production
COPY api/ ./
RUN npx prisma generate && npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
```

### Static Frontend + Separate API

Deploy the frontend to any static host (Netlify, Cloudflare Pages, S3 + CloudFront) and the API to any Node.js host (Railway, Render, Fly.io).

Update `VITE_API_BASE_URL` to point to your API host and configure CORS on the API:

```typescript
app.use(cors({
  origin: ['https://your-frontend-domain.com']
}))
```

---

## Monitoring & Maintenance

| Task | Frequency |
|------|-----------|
| Check Vercel deployment logs | After each deploy |
| Run `npm audit` | Weekly |
| Update dependencies | Monthly |
| Database backups | Per your provider's schedule |
| Rotate API keys | Quarterly |

---

## Troubleshooting Deployment

| Issue | Solution |
|-------|----------|
| API returns 500 | Check Vercel function logs; verify `DATABASE_URL` |
| CORS errors | Update API CORS config or use `vercel.json` rewrites |
| AI generation fails | Verify `AI_API_KEY`, `AI_ENDPOINT`, and `AI_MODEL` |
| Blank page after deploy | Check `VITE_API_BASE_URL`; verify build output in `dist/` |
| Database connection timeout | Use connection pooling; check `DIRECT_URL` for migrations |

See [Troubleshooting](troubleshooting.md) for more solutions.

---

## Further Reading

- [Getting Started](getting-started.md)
- [Architecture](architecture.md)
- [Environment Variables](../README.md#environment-variables)
