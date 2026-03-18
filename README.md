# MADRAS DRIVEN — Official Website

Chennai's premier automotive culture community.

---

## 📁 Folder Structure

```
madrasdriven/
├── index.html
├── style.css
├── script.js
├── README.md
└── images/
    ├── hero-video.mp4       ← 🎬 Your hero background video
    ├── hero-video.webm      ← (optional, better browser support)
    ├── hero-poster.jpg      ← Still frame shown before video loads
    ├── events/
    │   ├── event1.jpg       ← Featured event photo
    │   ├── event2.jpg       ← Night meet photo
    │   └── event3.jpg       ← Vol. 3 recap photo
    └── gallery/
        ├── g1.jpg
        ├── g2.jpg
        ├── g3.jpg
        ├── g4.jpg
        ├── g5.jpg
        ├── g6.jpg
        ├── g7.jpg
        ├── g8.jpg
        └── g9.jpg
```

---

## 🎬 Hero Video Setup

1. Export your best event video as `hero-video.mp4`
2. Place it inside the `images/` folder
3. Also grab a single frame from the video, save it as `hero-poster.jpg` — this shows while the video loads
4. **Recommended specs:**
   - Resolution: 1920×1080 (Full HD)
   - Duration: 15–30 seconds loop
   - File size: **under 15MB** (keep it fast!)
   - No audio needed (video is muted by default; there is a sound toggle button)
5. To compress your video for web, use: https://www.handbrake.fr (free)

---

## 📸 Event Images Setup

Place photos in `images/events/`:

| File | Used For |
|---|---|
| `event1.jpg` | Featured event card (Madras Driven Vol. 4) |
| `event2.jpg` | Night Meet — ECR card |
| `event3.jpg` | Past event — Vol. 3 card |

- Recommended size: **800×500px**, landscape, JPG
- The site gracefully shows a placeholder if an image is missing

---

## 🖼 Gallery Images Setup

Place 9 photos in `images/gallery/` named `g1.jpg` through `g9.jpg`.

- Mix landscape and portrait shots for a dynamic grid
- Recommended minimum width: **800px**, JPG format
- Clicking any photo opens a **fullscreen lightbox** with arrow navigation
- Use **← → arrow keys** or the buttons to navigate the lightbox

---

## 🚀 Deploy on GitHub Pages (Free)

1. Create a GitHub account at https://github.com
2. New repository → name it `madrasdriven` → Public → Create
3. Upload ALL files AND the `images/` folder
4. Settings → Pages → Source: **main** branch → Save
5. Live at: `https://yourusername.github.io/madrasdriven`

### Uploading the images folder on GitHub web:
- Click **Add file → Upload files**
- Drag your entire `images` folder in
- Commit changes

---

## ✏️ Customising Content

### Update event info
In `index.html`, find the `<!-- EVENTS -->` section and update:
- Event names, dates, venues
- Ticket prices
- Ticket/registration links

### Update stats
Find `data-target="5000"` etc. in `index.html` and change to real numbers.
Also update `5K+`, `20+`, `3+` in the hero stats div.

### Update community quotes
Replace the placeholder testimonials in the `<!-- COMMUNITY -->` section with real member quotes.

### Newsletter form (production)
In `script.js`, find `subscribeNewsletter()` and replace the console section with a real form handler.
Easiest free option: https://formspree.io

### Contact email
Find `hello@madrasdriven.com` in `index.html` and replace with your actual email.

---

Built for Chennai's car culture 🏁
Follow: [@madrasdriven](https://www.instagram.com/madrasdriven)
