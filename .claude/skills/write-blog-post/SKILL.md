---
name: write-blog-post
description: Add a new post to this Hugo blog (Product Build Notes) - creates the content file, an original SVG cover image matching the site's visual style, categorizes it into one of the six pillars, previews locally, then commits/pushes and verifies it's live on both GitHub Pages and Cloudflare Workers. Use whenever the user pastes a draft post or asks to write/add/publish a blog post.
---

# Write a blog post

This repo is a Hugo static blog ("Product Build Notes") dual-published to:
- GitHub Pages: https://kal-subram.github.io/blogs/
- Cloudflare Workers: https://the-reliable-product.product-builder-hub.workers.dev

Both rebuild automatically from `git push` to `main`. Follow these steps for every new post.

## 1. Create the content file

```bash
hugo new content posts/<kebab-case-slug>.md
```

## 2. Fill in front matter

```toml
+++
date = '<leave as generated>'
draft = false
title = '<Post Title, Title Case>'
summary = '<1-2 sentence hook capturing the core argument, no clickbait>'
categories = ['<exactly one of the six pillars below>']

[cover]
  image = 'images/posts/<slug>-cover.svg'
  alt = '<plain-language description of the cover diagram>'
+++

<post body, preserve the author's voice and wording almost exactly - only
light copyedits (quote-curling, obvious typos). Do not paraphrase or
rewrite their prose.>
```

The six pillars (use the exact string as it appears here):
- `AI Systems After the Demo`
- `Evals, Metrics, and Decision Quality`
- `Safety, Compliance, and Human Review`
- `Reliability, Scale, and Infrastructure`
- `Product Marketing, GTM, and Adoption`
- `Product Leadership and Career Range`

Pick whichever pillar the post's core argument fits best. Add `tags = [...]` for secondary cross-cutting themes if useful (optional).

Post titles should be phrased as questions (e.g. "Why Does Accuracy Fall Short?" rather than "Accuracy Is Not Enough").

## Tone and style (when you're drafting or editing content yourself)

This only applies when you're writing or substantially editing the post's words. If the user pastes their own finished draft, don't apply any of this - just scaffold around it as-is (see Notes below).

- Simple, plain language. Nothing that reads like it was written by an AI.
- No rhetorical questions used as a hook or transition.
- No "neat contrast" setups (the X-but-Y sentence structure used as a punchy opener).
- No repeated lesson framing - don't keep restating "that taught me X" / "the lesson here is Y" over and over.
- No over-explaining - say a thing once, plainly, and move on.
- No em-dashes, anywhere.
- No three-tiered statements or questions (avoid tricolon patterns like "X, Y, and Z" used as a rhetorical flourish, or three rhetorical questions in a row).
- A slight, natural Indian-English tone - not a caricature, just the plain, direct register the author actually writes in.

## 3. Source a cover image

Check for a real photo first. Only fall back to an original SVG diagram if nothing suitable turns up.

**First choice: a free, legally-clear photo.**
- Search free/permissively-licensed sources for something that genuinely fits the post's topic (Unsplash and Pexels are both free for commercial and non-commercial use, no permission required under their standard licenses - confirm the specific image's license page anyway).
- Judge fit honestly - a generic stock photo that doesn't actually match the post's argument is worse than no photo. Don't force it.
- Downloading any file requires the user's explicit go-ahead first: tell them the exact filename, source URL, license, and file size, and wait for confirmation before fetching it. Never download silently.
- Once approved, save to `static/images/posts/<slug>-cover.<ext>` (jpg/png, whatever the source provides).

**Fallback: original SVG diagram**, if no free photo is a good fit.

Design an original, abstract SVG that visualizes the post's central metaphor or contrast (e.g. demo-vs-production, iceberg for visible-vs-hidden, a straight line vs. a loop). This avoids any licensing question entirely.

Save to `static/images/posts/<slug>-cover.svg`, viewBox `0 0 1200 630`, and match the established visual system:

- Background: dark gradient, `#1d2b3a` to `#111a24`
- Font: `Helvetica, Arial, sans-serif`, headers in caps with `letter-spacing`
- Accent palette: blue `#8fa5bd` (calm/clean), amber `#e0a458` (messy/warning), green `#69c48a` (success), red `#d9736c` (failure/risk)
- Include a `<title>` and `<desc>` for accessibility

Look at `static/images/posts/the-demo-is-not-the-system-cover.svg` or `accuracy-is-not-enough-cover.svg` as reference examples.

## 4. Build and preview locally before pushing

```bash
hugo --gc --minify
```

Check the page count increased as expected, then spin up a live preview and actually look at it (don't skip this):

```bash
hugo server --buildDrafts --port 1313 &
```

Navigate to `http://localhost:1313/blogs/posts/<slug>/` via the claude-in-chrome tools and screenshot it. Check: cover image renders correctly, category badge shows in the post meta line, no obvious layout issues. Kill the server when done (`pkill -f "hugo server"`).

## 5. Commit and push

```bash
git add content/posts/<slug>.md static/images/posts/<slug>-cover.svg
git commit -m "Add post: <Title>"
git push
```

## 6. Verify the deploy

Watch the GitHub Actions run:

```bash
gh run list --repo kal-subram/blogs --limit 1 --json databaseId -q '.[0].databaseId'
gh run watch <id> --repo kal-subram/blogs --exit-status
```

**Known quirk**: the GitHub Pages deploy step intermittently fails with "Deployment failed, try again later" - this is a transient Pages issue, not a real failure. If it happens, just retry:

```bash
gh run rerun <id> --repo kal-subram/blogs --failed
```

Cloudflare deploys on its own separate pipeline (triggered by the same push, via its Git integration) - no need to watch it manually, just check it after a short wait.

Finally, curl both live URLs to confirm the new post is up:

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://kal-subram.github.io/blogs/posts/<slug>/
curl -s -o /dev/null -w "%{http_code}\n" https://the-reliable-product.product-builder-hub.workers.dev/posts/<slug>/
```

## Notes

- Don't touch `hello-world.md` (already removed) or unrelated files.
- If the user has already drafted a post directly in the filesystem themselves (untracked), don't assume you should edit or restructure it - just ask before touching it.
- Keep the tone and wording as the user wrote it. Your job is scaffolding (front matter, cover art, categorization, publishing), not rewriting their voice.
