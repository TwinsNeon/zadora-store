
# ZADORA Store (Next.js + Tailwind)

## Run locally
1) Install Node.js LTS
2) In this folder:
```
npm install
npm run dev
```
Open http://localhost:3000

## Deploy to Vercel
- Create a free account on Vercel
- New Project → Import from GitHub (upload this folder to a repo) → Deploy

## Connect your domain
1) Vercel: Project → Settings → Domains → Add Domain (zadora.com)
2) At your registrar (GoDaddy/Namecheap...):
   - A record @ → 76.76.21.21
   - CNAME www → cname.vercel-dns.com
3) Back to Vercel → Verify
