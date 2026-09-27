# 1) Site Architecture & Sitemap

> Content source of truth: `2026-9-13- OpenCode V4/FULL-RESUME-DOCUMENTED.md` (Factual Content Rule — no invented employers, metrics, or cloud/DevOps claims). Base URL `https://madhusudanupadhyay.com/`, contact `support@madhusudanupadhyay.com.np`.

```
https://madhusudanupadhyay.com.np/
├── /                          # Hero+terminal, About+journey, Stack, Projects(filter), Experience, Certs, GitHub, Latest posts, Testimonials, Contact
├── /projects/                 # Filter: cloud, automation, security, infra
│   └── /projects/:slug/       # Case study: problem→arch(mermaid)→moves→metrics→repo/demo→related blog
├── /blog/                     # Categories + tags + RSS; ?q= search hint
│   └── /blog/:slug/           # TOC, code+copy, mermaid, relatedProjects, share, authorbox, newsletter, Giscus, FAQ schema
├── /certifications/ (anchor /#certs; expand to section when 15+ documented)
├── /uses/                     # Hardware/lab/SOP stack (command-palette shortcut)
├── /contact/ (anchor /#contact; form POST Web3Forms + botcheck honeypot)
├── /search.json               # Hugo JSON output → Cmd+K palette
├── /sitemap.xml /robots.txt /rss
```

URL rules: lowercase slugs, canonical everywhere, `/blog/how-i-passed-...`, `/projects/real-time-...` pattern honored.

# 2) Wireframes (all 9 pages)

1. **Home**: sticky nav (brand mono + ⌘K + ◐ + Hire Me) → hero grid (left: kicker/roles/value/CTAs/availability; right: terminal) → 01 About (philosophy + 4 counters + journey timeline) → 02 Stack (3 category cards, bars) → 03 Projects (filter pills + 3-col cards) → 04 Experience (vertical timeline, impact line) → 05 Certs (badge grid + 15+ note) → 06 GitHub (heatmap + publish list) → 07 Latest 3 posts → 08 Testimonials → 09 Contact (form + elsewhere/Bookings/PGP) → footer (View Source, palette hints).
2. **About**: reuse home anchor; standalone = same + full philosophy + timeline + stats.
3. **Portfolio listing**: filter pills + card grid (stack mono, desc, metrics, Read Case Study).
4. **Single project**: breadcrumb, metrics card, mermaid arch, repo/demo mono links, related posts.
5. **Blog listing**: category tags with counts, 1-col post cards (date·min·cats, tags), pagination.
6. **Single post**: breadcrumb, meta line (date·min·words·difficulty), tags+cats, open TOC, prose (code+copy, mermaid, notes), share row, relatedProjects card, FAQ accordions (+FAQPage JSON-LD), authorbox, newsletter, Giscus, related reading.
7. **Certifications**: badge grid + Verify links + trainings note (currently home anchor; promote to section at 15+).
8. **Contact**: form (name/email/message + honeypot), elsewhere links, s CTA, email/location, PGP details.
9. **Uses**: hardware/lab/network + software/SOP stack tables.

# 3) Design System

- Colors: `--bg #090b12, --bg2 #0e1220, --text #e8ecf4, --muted #9aa4b8, --accent #3B82F6, --accent2 #10B981`; light theme inverts bg/text. Glass cards `rgba(255,255,255,.045)` + 1px border + blur(10px). Glow hover `0 0 0 1px accent + 8/40 shadow`.
- Type: Inter body 1.65 LH; JetBrains Mono for kicker/nav/terminal/tags/metrics. H1 clamp(2–3.3rem). Scale: h2 1.6rem, small .88rem, mono-tags .72rem.
- Spacing: max 1120px, 20px gutters, sections 56px, cards radius 14px padding 20px.
- Components: btn/ghost, iconbtn, terminal, timeline (accent2 dots), skill bars (gradient fill, IO-animated), filter pills, proj cards (tilt via translateY + glow), stats, certs, post-card, TOC, authorbox, palette modal, copybtn, kbd.
- Motion: typing (68ms/1400ms hold), term lines (14ms/char), code-rain canvas (16px col, rAF-safe, reduced-motion off), reveal `.rv→.in`, counters 1400ms, bars 1.2s. All vanilla, deferred, no framework.

# 4) SEO Audit Checklist (IT niche)

- [x] Semantic HTML5 + skip link + ARIA labels + single H1/page + H2→H3 order
- [x] Person + WebSite + TechArticle + SoftwareApplication + BreadcrumbList + FAQPage JSON-LD
- [x] Canonical, robots, sitemap (Hugo built-in), OG + Twitter large cards
- [x] Clean `/blog/:slug` `/projects/:slug`, keyword slugs (intune-autopilot-zero-touch-guide)
- [x] Titles 50–60ch, descriptions 150–160ch (front-matter `description:`)
- [x] Alt text on heatmap/images, lazy loading, width/height to hold CLS
- [x] Internal linking: relatedProjects ↔ blog, uses ↔ skills, case study CTAs
- [ ] TODO post-deploy: AVIF/WebP covers, Plausible, Search Console + Bing, LinkedIn/Dev.to canonical cross-posts, FAQ/HowTo expansion per pillar
- [ ] Verify IDs: Giscus repo-id/category-id, Microsoft Bookings URL, GitHub username in heatmap

# 5) Folder Structure

See README.md (authoritative). Principle: content in `/content`, facts in `/data`, presentation in `/themes/itpro`.

# 6) 3-Month Content Calendar (12 posts)

| Wk | Title | Category | Keyword → intent |
|---|---|---|---|
| 1 | Intune Autopilot Zero-Touch Guide (pillar, live) | DevOps & Cloud | intune autopilot setup guide → how-to |
| 2 | How I Passed Server+Linux Certs Full-Time (live) | Certification Journeys | how to pass windows server certification working full time → guide |
| 3 | Conditional Access Policies That Don't Break Work | DevOps & Cloud | entra id conditional access best practices → how-to |
| 4 | Exchange Mail-Flow Hardening: SPF/DKIM/DMARC | Code & Tutorials | exchange online spf dkim dmarc setup → how-to |
| 5 | Friday Mail-Flow Outage (live) | Lessons from Production | mail flow outage troubleshooting → story+solution |
| 6 | PowerShell Onboarding Scripts (pillar) | Code & Tutorials | powershell bulk create entra users graph → tutorial |
| 7 | AD Group Policy Hygiene Audit Checklist | Project Deep Dive | active directory group policy audit checklist → template |
| 8 | BitLocker + Defender Baseline for NGOs | Tech Opinions | intune compliance policy bitlocker defender → comparison |
| 9 | From Support Tech to ICT Executive: 11 Years | Career Milestones | ict support career path nepal → career |
| 10 | Backup/Restore Tests People Actually Run | Lessons from Production | windows server backup restore test → how-to |
| 11 | Wi-Fi Survey on a Budget (phone + spare AP) | Project Deep Dive | small office wifi troubleshooting guide → how-to |
| 12 | My SOP Template Pack (free download) | Open Source | it support sop templates → lead magnet |

Cadence: 1/wk Tue 9am NPT. Each: 1200–3000w (pillars 3000+), FAQ block, 1 mermaid diagram, relatedProject link, LinkedIn + Dev.to cross-post with canonical back.

# 7) Performance Checklist (target 95+ Lighthouse)

- [x] Zero frameworks; 1 CSS + 1 JS, minified + fingerprinted, JS deferred
- [x] Fonts: preconnect + print-onload async, system fallback (no FOUT block)
- [x] Images lazy + dimensions; heatmap remote with size attrs
- [x] No render-blocking embeds; Mermaid/Giscus load only on demand
- [ ] TODO: compress covers to AVIF/WebP + srcset, `hugo --minify`, deploy edge (Cloudflare Pages/Netlify), Lighthouse CI in Actions, Vercel/Umami analytics (defer), audit LCP<1.5s/INP<100ms/CLS<.05 on 4G Kathmandu profile

# 8) Implementation Roadmap

- Wk1: scaffold + data + hero/about/skills (serve locally) ✅
- Wk2: projects/experience/certs/GitHub/testimonials/contact + shortcodes ✅
- Wk3: 4 seed posts + 3 case studies + SEO schemas + palette/search ✅
- Wk4: real content swap (verify links, Giscus IDs, Bookings URL), deploy preview, Lighthouse pass
- Wk5–6: 4 more posts, OG covers, Plausible, Search Console, cross-posts
- Wk7–12: calendar above; monthly: backup-restore drill post + metrics update (uptime, tickets −%, provision time)

Deploy: `hugo --minify` → Netlify/Cloudflare Pages → GitHub Actions (lighthouse-ci on PR). Monitoring: uptime check + monthly content audit.

# 9) Sample Snippets

Hero typing (assets/js/main.js), project card (partials/home/projects.html), MDX-equivalent post (content/blog/*.md with `{{< mermaid >}}`), Person+TechArticle JSON-LD (partials/seo/*), SEO meta (partials/head.html) — all live in this repo; see files directly. Key excerpts:

```html
<!-- head: canonical + OG -->
<link rel="canonical" href="{{ .Permalink }}">
<meta property="og:title" content="{{ .Title }}">
```

```html
<!-- hero typing -->
<h1><span id="typed"></span><span class="caret">▊</span></h1>
<script id="typed-roles" type="application/json">{{ .Site.Params.hero.roles | jsonify }}</script>
```

```go
<!-- project card -->
{{ range first 6 (where .Site.RegularPages "Section" "projects") }}
<article class="card" data-cat="{{ delimit .Params.categories " " | lower }}">…</article>
{{ end }}
```
