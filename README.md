# ITPro Hugo Theme — for Madhusudan Upadhyay

Dark-mode-first portfolio + career blog. No JS framework. Hugo Extended only.

## Quick start

```powershell
# 1. Serve
hugo server -D

# 2. New blog post (all 8 career categories supported via `categories:`)
hugo new blog/my-post.md

# 3. New project case study
hugo new projects/my-system.md

# 4. Production build (minified, fingerprinted, search.json, sitemap)
hugo --minify
```

## Stack decision (why Hugo, not Next/Astro/Nuxt/Gatsby)

| Option | Verdict for this profile |
|---|---|
| Next.js 14 + MDX + Vercel | Great interactivity, but JS-heavy; overkill for content site; harder to hit <1.5s on cheap networks in NP |
| Astro + Islands | Strong runner-up; chosen logic overlaps Hugo |
| Nuxt 3 | Fine, but smaller hiring signal for M365/ops audience |
| Gatsby | Declining; slow builds |
| **Hugo (chosen)** | Single binary, ~50ms builds, zero JS by default, taxonomies + shortcodes + JSON output for search, trivial Netlify/Cloudflare deploy, MDX-equivalent via Goldmark + highlight + Mermaid shortcode. Perfect for an ops pro who lives in PowerShell, not node_modules. |

CMS: **Git-based Markdown** (developer-friendly, window-source impresses). Migrate to Sanity/Contentful later without changing layouts.
Analytics: Plausible/Umami snippet slot in `head.html`. Search: local `search.json` + Cmd+K (no Algolia bill). Comments: Giscus (set `giscusRepo` + IDs in hugo.toml).

## Folder structure

```
hugo.toml                  # baseURL https://madhusudanupadhyay.com.np/, permalinks /blog/:slug, taxonomies, params
content/
  _index.md  blog/  projects/  knowledge/  uses.md  contact.md
data/
  profile.yaml skills.yaml experience.yaml certifications.yaml testimonials.yaml
themes/itpro/
  layouts/_default/baseof|list|single.html  layouts/index.html  layouts/index.json
  layouts/partials/head|header|footer|palette.html
  layouts/partials/home/hero|about|skills|projects|experience|knowledge|certs|blog-latest|testimonials|contact.html
  layouts/partials/seo/schemas-{home,article,project}.html
  layouts/shortcodes/mermaid|note.html
  assets/css/main.css  assets/js/main.js
archetypes/blog|projects|knowledge.md
static/images/  docs/
```

## Customize

- Name/roles/stats: `data/profile.yaml` + `hugo.toml [params.hero] roles`
- Skills: `data/skills.yaml` (level %, years)
- Jobs: `data/experience.yaml` (Experience section; `data/profile.yaml journey` is fallback) · Certs: `data/certifications.yaml` (leave `verify:` empty until you have a real URL — no `#` placeholders)
- Booking/social: `hugo.toml [params]` → `booking` (verify the public link in an incognito window), `github`, `siteRepo`
- Contact form: set `HUGO_PARAMS_WEB3FORMSKEY` at deploy time, never commit the key
- Giscus: enable Discussions → fill `giscusRepo` + IDs in `hugo.toml [params]`

## Safe commit (before first push)

```powershell
git init
git config core.hooksPath .githooks   # blocks public/, .env/keys, live Web3Forms key
git add -A
git status                             # review: no public/, no key, no internal docs
git commit -m "Portfolio site: security-hardened Hugo build"
```
