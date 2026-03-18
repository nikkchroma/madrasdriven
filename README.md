# MADRAS DRIVEN — Official Website

Chennai's premier automotive culture community website.

---

## 🚀 How to Deploy on GitHub Pages (Free Hosting)

### Step 1 — Create a GitHub Account
Go to [github.com](https://github.com) and sign up for free.

### Step 2 — Create a New Repository
1. Click the **+** button → **New repository**
2. Name it: `madrasdriven` (or `madrasdriven.github.io` for a cleaner URL)
3. Set it to **Public**
4. Click **Create repository**

### Step 3 — Upload Your Files
You have 3 files:
- `index.html`
- `style.css`
- `script.js`

**Option A — GitHub Web (easiest):**
1. Open your repo → Click **Add file** → **Upload files**
2. Drag and drop all 3 files
3. Click **Commit changes**

**Option B — Git (for developers):**
```bash
git init
git add .
git commit -m "Initial commit - Madras Driven website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/madrasdriven.git
git push -u origin main
```

### Step 4 — Enable GitHub Pages
1. Go to your repo → **Settings** tab
2. Scroll to **Pages** (left sidebar)
3. Under **Source** → select **main** branch → **/ (root)**
4. Click **Save**

### Step 5 — Your website is live! 🎉
URL will be: `https://YOUR_USERNAME.github.io/madrasdriven`

(Takes ~2 minutes to go live after enabling)

---

## 🛠 How to Customize

### Update Event Details
Open `index.html` and find the **Events** section.
Replace the placeholder text with your actual event names, dates, venues, and prices.

### Update Stats (Hero + Numbers section)
In `index.html`:
- Find `data-target="5000"` etc. and change to your real numbers
- Find `5K+`, `20+`, `3+` in the hero stats and update them

### Update Community Quotes
Replace the 3 quotes in the **Community Voices** section with real testimonials from your members.

### Add Your Email for Newsletter
In `script.js`, replace the `subscribeNewsletter()` function with a real form handler.
Recommended free options:
- [Formspree](https://formspree.io) — free, easy
- [Netlify Forms](https://www.netlify.com/products/forms/) — free with Netlify hosting

### Update Contact Email
In `index.html`, find `hello@madrasdriven.com` and replace with your real email.

### Add a Custom Domain (e.g. madrasdriven.com)
1. Buy a domain from GoDaddy / Namecheap / Google Domains
2. In GitHub Pages settings → **Custom domain** → enter your domain
3. Update DNS at your domain registrar to point to GitHub Pages

---

## 📁 File Structure

```
madrasdriven/
├── index.html      ← Main website page
├── style.css       ← All styles and design
├── script.js       ← Animations & interactions
└── README.md       ← This file
```

---

## 📸 Adding Car Photos (Highly Recommended)

To make the hero section even more powerful, add a hero background image:

1. Add your best event photo as `hero.jpg` to the project folder
2. In `style.css`, find `.hero-bg` and add:
```css
.hero-bg {
  background-image:
    linear-gradient(to bottom, rgba(8,8,8,0.4) 0%, rgba(8,8,8,0.85) 65%, var(--black) 100%),
    url('hero.jpg');
  background-size: cover;
  background-position: center;
}
```

---

Built with ❤️ for Chennai's car culture.
Follow us on Instagram: [@madrasdriven](https://www.instagram.com/madrasdriven)
