# Our Story ♡
> A romantic relationship timeline — GitHub Pages edition

A beautiful, fully responsive single-page website celebrating your relationship journey
from the talking stage through six months of dating. Built with pure HTML, CSS, and
JavaScript — no frameworks, no dependencies, no build step required.

---

## Live Demo

Once deployed, your site will be at:
```
https://YOUR-USERNAME.github.io/our-story/
```

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Customize Your Story](#customize-your-story)
3. [Adding Photos](#adding-photos)
4. [Deploy to GitHub Pages](#deploy-to-github-pages)
5. [Optional: Custom Domain](#optional-custom-domain)
6. [Privacy Options](#privacy-options)

---

## Project Structure

```
our-story/
├── index.html          ← Main page · all your content lives here
├── css/
│   └── styles.css      ← All styles · edit colors and fonts here
├── js/
│   └── app.js          ← All JavaScript · touch only to extend features
├── photos/             ← Drop your photos here
│   └── .gitkeep        ← Keeps the folder in git (safe to delete later)
├── 404.html            ← Custom "page not found" screen
├── .nojekyll           ← Tells GitHub Pages not to run Jekyll (required)
├── .gitignore          ← Ignores OS junk files
└── README.md           ← This file
```

---

## Customize Your Story

All content is in **`index.html`** — open it in any text editor (VS Code recommended).
Search for `<!-- REPLACE` comments to find every placeholder.

### 1 · Meta information (top of `index.html`)
```html
<title>Our Story ♡</title>
<meta name="description" content="…your description…">
```

### 2 · Hero section
```html
<p class="hero-eyebrow">A love story in seven chapters</p>
<h1 class="hero-title">Our <em>Story</em></h1>
<p class="hero-sub">…your subtitle…</p>
<span class="hero-date">✦ January 1, 2025 — Present ✦</span>
```

### 3 · Each timeline section (Talking Stage + Months 1–6)

Every section has the same structure — just find and replace:

| Placeholder | What to put there |
|---|---|
| `[ Month Year ] — [ Month Year ]` | Real date range, e.g. `Dec 2024 — Jan 2025` |
| Story `<p>` text | Your own memories and feelings |
| `"Quote in blockquote"` | A favorite thing you said or felt |
| `<li>` highlight items | Your specific memories |

### 4 · Stats numbers (`#stats` section)
```html
<span class="stat-num" data-count="183">0</span>
```
Change `183` to your real day count. All four cards work the same way.

### 5 · Love letter (`#letter` section)
```html
<p class="letter-to">My dearest [Her Name],</p>
<!-- Replace paragraphs inside .letter-body with your letter -->
<p class="letter-sig">Forever yours, [Your Name] ♡</p>
```

### 6 · Colors (`css/styles.css`)
Edit the `:root` block at the top of the CSS file:
```css
:root {
    --blush-dark:  #D4849A;   /* main accent color */
    --gold:        #C9956E;   /* secondary accent */
    --cream:       #FDF8F5;   /* background */
    /* etc. */
}
```

---

## Adding Photos

### Step 1 — Add your image files
Copy your photos into the `photos/` folder.
Recommended: JPEG format, under 500 KB each (use [Squoosh](https://squoosh.app/) to compress).

### Step 2 — Replace a placeholder
Find a `<div class="ph">…</div>` block in `index.html` and swap it for an `<img>`:

**Before (placeholder):**
```html
<div class="polaroid tl" data-gal="talking" data-idx="0">
    <div class="ph">
        <span class="ico">📷</span>
        <span>Featured Photo</span>
    </div>
    <p class="pol-cap">The beginning of everything ♡</p>
</div>
```

**After (real photo):**
```html
<div class="polaroid tl" data-gal="talking" data-idx="0">
    <img src="photos/our-first-photo.jpg"
         alt="Us at the coffee shop"
         style="width:100%;aspect-ratio:4/3;object-fit:cover;display:block;">
    <p class="pol-cap">The beginning of everything ♡</p>
</div>
```

> **Keep the `data-gal` and `data-idx` attributes** — they power the lightbox navigation.

### Step 3 — Hero background photo
In `css/styles.css`, find the `#hero` rule and update it:
```css
#hero {
    background-image: url('../photos/hero.jpg');
    background-size: cover;
    background-position: center;
}
```
For readability over a photo, add a darkening overlay inside `index.html`
right after `<section id="hero">`:
```html
<div style="position:absolute;inset:0;background:rgba(0,0,0,0.3);"></div>
```

### Step 4 — Social share preview image
Update the Open Graph image tag in `index.html`:
```html
<meta property="og:image" content="https://YOUR-USERNAME.github.io/our-story/photos/og-preview.jpg">
```
Use a 1200×630px image for best results on WhatsApp, iMessage, and Twitter.

---

## Deploy to GitHub Pages

> You need a free [GitHub account](https://github.com) to follow these steps.

### Step 1 · Install Git (skip if you already have it)
Download from [git-scm.com](https://git-scm.com/download/win) and install with defaults.

### Step 2 · Open a terminal in the project folder
In File Explorer, navigate to `C:\Users\Diamo\our-story\`, then:
- Right-click an empty area → **Open in Terminal** (Windows 11)
- Or open PowerShell and run: `cd "C:\Users\Diamo\our-story"`

### Step 3 · Initialize git and make the first commit
```powershell
git init
git add .
git commit -m "Initial commit — Our Story"
```

### Step 4 · Create a GitHub repository
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `our-story` (or any name you like)
3. Visibility: **Public** ← required for free GitHub Pages
4. **Do NOT** check "Initialize with README" — leave everything unchecked
5. Click **Create repository**

### Step 5 · Push your code to GitHub
GitHub will show you commands after creating the repo. Run these in your terminal
(replace `YOUR-USERNAME` with your actual GitHub username):
```powershell
git remote add origin https://github.com/YOUR-USERNAME/our-story.git
git branch -M main
git push -u origin main
```

### Step 6 · Enable GitHub Pages
1. In your repository on GitHub, click **Settings** (top navigation)
2. Scroll down to the **Pages** section in the left sidebar
3. Under **Source**, choose **Deploy from a branch**
4. Branch: `main` · Folder: `/ (root)` → click **Save**

### Step 7 · Wait ~2 minutes, then visit your site
GitHub will show a green banner with your URL:
```
https://YOUR-USERNAME.github.io/our-story/
```

### Updating the site after making changes
Every time you edit files locally, push the changes:
```powershell
git add .
git commit -m "Update photos and content"
git push
```
GitHub Pages will re-deploy automatically within ~60 seconds.

---

## Optional: Custom Domain

If you own a domain (e.g. `ourstory.com`):

1. Create a file called `CNAME` in the project root containing just your domain:
   ```
   ourstory.com
   ```
2. Push the file to GitHub
3. In your domain registrar's DNS settings, add a CNAME record:
   - Name: `www` (or `@` for the root)
   - Value: `YOUR-USERNAME.github.io`
4. In GitHub → Settings → Pages, enter your custom domain and enable **Enforce HTTPS**

---

## Privacy Options

### Option A · Keep it public but unlisted
Remove or comment out the `<meta name="robots">` tag in `index.html` — the site
will be accessible to anyone with the URL but won't appear in Google search results:
```html
<meta name="robots" content="noindex, nofollow">
```
Then only share the URL directly with her.

### Option B · Make the repository private (requires GitHub Pro)
Free GitHub accounts cannot serve GitHub Pages from private repositories.
If you upgrade to GitHub Pro ($4/month), you can set the repo to Private.

### Option C · Password protect with Netlify (free alternative)
1. Deploy to [Netlify](https://netlify.com) instead of GitHub Pages (drag-and-drop your folder)
2. Enable the free **Site protection** feature with a password

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic) |
| Styles | CSS3 (custom properties, grid, flexbox, animations) |
| Scripts | Vanilla JavaScript (ES2020, no dependencies) |
| Fonts | Google Fonts (Playfair Display, Lato, Dancing Script) |
| Hosting | GitHub Pages (free, CDN-backed) |

---

*Made with ♡ — because some stories deserve to be told.*
