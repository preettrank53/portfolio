# Preet Rank - Portfolio

A brutalist, interactive developer portfolio and engineering playground focused on AI/ML, motion polish, and production-grade architecture.

**Live demo:** `https://preetrank.vercel.app/` 

## Why this exists
This project serves as both a personal portfolio and a technical sandbox. It was built to demonstrate an understanding of modern React patterns, responsive interactions, and backend-as-a-service integrations, all wrapped in a unique brutalist aesthetic that avoids generic templates.

## Features
- **Dual-Pane Layout**: Sticky identity column with an independent scrolling feed column on desktop.
- **Swipeable Navigation**: Mobile interface features native-feeling swipe gestures to cycle through Experience, Skills, and Projects tabs.
- **Signature Wall (`/wall`)**: A public guestbook where visitors can draw their signatures on an HTML canvas. Strokes are vectorized, validated, and saved to a Redis sorted set.
- **Live Analytics**: Real-time view counters and per-project "appreciation" (like) buttons powered by Upstash.
- **Admin Dashboard**: An environment-protected, in-browser CMS to edit, pin, and add new portfolio entries without touching the codebase.
- **Brutalist UI**: Dark canvas, sharp corners, mono typography, and carefully tuned Framer Motion micro-interactions.

## Tech stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Database / Cache**: Upstash Redis (REST API)
- **Icons**: Lucide React & React Icons
- **Deployment**: Vercel

## Architecture overview
- **`app/page.tsx` orchestration**: Manages the complex dual-pane layout, mobile sticky fallbacks, and tab orchestration.
- **Signature Wall Flow**: Uses native HTML Canvas for input. Strokes are captured as vectors (not raster images) to save space, validated via serverless functions, rate-limited, and stored in a Redis sorted set.
- **Content Data Model**: Entries are stored and retrieved efficiently. The admin mode allows live editing by writing directly back to the data source.
- **Theme System**: Driven by CSS variables (`globals.css`) combined with Tailwind utilities for easy theming and dark/light mode support.

## Screenshots
<img width="1919" height="893" alt="image" src="https://github.com/user-attachments/assets/2ad9264f-f75d-4b9d-b605-371c627835fc" />

- `docs/desktop-home.png` - Desktop layout
<img width="1919" height="900" alt="image" src="https://github.com/user-attachments/assets/2189117b-4fac-445a-b4fe-207fb2561b83" />
- `docs/signature-wall.png` - The Signature Wall

## Getting started
```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Run the development server
npm run dev
```

## Environment variables
The application uses the following environment variables (defined in `.env.local`):

| Variable | Required? | Description |
|----------|-----------|-------------|
| `UPSTASH_REDIS_REST_URL` | Yes* | Your Upstash Redis REST URL. |
| `UPSTASH_REDIS_REST_TOKEN` | Yes* | Your Upstash Redis REST Token. |
| `ADMIN_PASSWORD` | Yes (for admin) | Secure password to access the in-browser CMS. |

*\* Note: If Redis variables are missing locally, the core portfolio will still render gracefully, but features like the Signature Wall and view counters will display fallback states rather than crashing the app.*

## Signature Wall notes
- **Vector Storage**: Signatures are stored as coordinate arrays rather than heavy Base64 images to ensure fast loads and minimal DB size.
- **Rate Limiting**: Built-in IP-based rate limiting prevents spamming the wall.
- **Graceful Degradation**: If Redis is unreachable, the UI fails gracefully.

## Admin mode
- **How it works**: Press `Ctrl + Shift + E` (or equivalent shortcut mapped in `page.tsx`) to open the admin login prompt. Enter the `ADMIN_PASSWORD`.
- **Warning**: Do NOT use a weak password in production. The password must match the environment variable exactly to unlock editing capabilities.

## Deploy
Deploying this project is seamless with Vercel:
1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. In the Vercel dashboard, go to **Settings > Environment Variables** and add your `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, and `ADMIN_PASSWORD`.
4. Deploy!

## Project structure
```text
├── app/                  # Next.js App Router (pages, api, layouts)
├── components/           # Reusable UI components (buttons, skeletons, wall entries)
├── data/                 # Data schemas and initial JSON content
├── public/               # Static assets
└── tailwind.config.ts    # Tailwind configuration and brutalist theme tokens
```

## Design principles
- **Brutalist / Minimal**: High contrast, visible borders, and stark typography.
- **Sharp Corners**: Rounded corners are kept to an absolute minimum for a raw engineering feel.
- **Performance**: Heavy focus on responsive interactions and preventing layout shift.
- **No Decorative Noise**: Every visual element serves a structural or interaction purpose.

## Roadmap / known limitations
- **What works flawlessly**: Layout orchestrations, swipe gestures, data fetching, Signature Wall, Admin CMS.
- **Intentional Simplicity**: There is no traditional "backend" server; everything leverages Next.js API routes and Redis for maximum speed.
- **Future Ideas**: Expanding the Signature Wall into a 3D visualization or adding a dedicated technical blog section.

## Contributing
This repository is primarily a personal portfolio and a reference/learning resource for other developers. Bug reports are welcome! Pull requests are also welcome, though not guaranteed to be merged if they conflict with the personal vision of the site.

## License
MIT License.

**Note:** Please don’t reuse personal identity assets (name, photo, resume, specific copy, and experience details) as your own. If you fork this template, swap out the personal data before publishing!
