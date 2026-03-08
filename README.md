# SnapOG

Beautiful social preview images in seconds. Generate OG images for your blog posts, changelogs, and landing pages — no design skills needed.

## Quick Start

```bash
# 1. Clone this repo
git clone https://github.com/YOUR_USERNAME/snapog.git
cd snapog

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local
# Edit .env.local with your Stripe keys (see below)

# 4. Run locally
npm run dev
# Open http://localhost:3000
```

## Deploy to Vercel (5 minutes)

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repo
4. Add these environment variables in the Vercel dashboard:
   - `STRIPE_SECRET_KEY` — from dashboard.stripe.com/apikeys
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — from the same page
   - `STRIPE_PRICE_ID_PRO` — create a $9/mo product in Stripe
   - `STRIPE_PRICE_ID_TEAM` — create a $29/mo product in Stripe
   - `STRIPE_WEBHOOK_SECRET` — from Stripe webhook settings
   - `NEXT_PUBLIC_SITE_URL` — your domain (e.g., https://snapog.com)
5. Click **Deploy**
6. Add your custom domain in Vercel → Settings → Domains

## Project Structure

```
snapog/
├── app/
│   ├── layout.tsx          # Root layout, meta tags, global styles
│   ├── page.tsx            # Landing page (snapog.com)
│   ├── app/
│   │   └── page.tsx        # The image generator app (snapog.com/app)
│   ├── checker/
│   │   └── page.tsx        # Free OG checker tool (snapog.com/checker)
│   └── api/
│       ├── og/
│       │   └── route.tsx   # OG image generation API endpoint
│       ├── checkout/
│       │   └── route.ts    # Stripe checkout session
│       └── webhook/
│           └── route.ts    # Stripe webhook handler
├── package.json
├── next.config.js
├── tsconfig.json
├── .env.example
└── README.md
```

## API Usage

Generate an OG image via URL:

```
GET /api/og?title=Hello+World&subtitle=My+blog+post&theme=midnight&template=bold
```

Parameters:
- `title` — The main text (required)
- `subtitle` — Secondary text (optional)
- `domain` — Your domain shown on the image (optional)
- `theme` — Color theme: midnight, ocean, ember, forest, slate, coral, gold, arctic
- `template` — Layout: bold, minimal, glass

Use this URL directly as your `og:image` meta tag:

```html
<meta property="og:image" content="https://snapog.com/api/og?title=My+Post+Title" />
```

## Setting Up Stripe

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Create two products:
   - **SnapOG Pro**: $9/month recurring
   - **SnapOG Team**: $29/month recurring
3. Copy each product's Price ID (starts with `price_`)
4. Copy your API keys from the Developers → API keys page
5. Set up a webhook endpoint pointing to `https://yourdomain.com/api/webhook`
   - Listen for: `checkout.session.completed`, `customer.subscription.deleted`

## License

MIT
