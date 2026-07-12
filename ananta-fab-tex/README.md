# Ananta Fab Tex — Website

A multi-page static website for Ananta Fab Tex (pocketing fabric manufacturer, Balotra, Barmer, Rajasthan). Plain HTML/CSS/JS — no build step, no backend required.

## Structure
```
index.html          Home
about.html           About Us
products.html        Products & Services (incl. Print Rotto + enquiry form)
hsn.html              HSN codes / specifications
testimonials.html    Ratings & reviews
contact.html          Contact form, map, business hours
css/style.css         All styling
js/script.js           Nav toggle, scroll animations, counters, form handling
```

## Run locally
Just open `index.html` in a browser, or serve the folder:
```bash
npx serve .
```

## Deploy to Vercel
1. Push this folder to a new GitHub repo.
2. In Vercel: **New Project → Import** your repo.
3. Framework preset: **Other** (static site) — no build command needed, output directory is the repo root.
4. Deploy.

## Things to swap in before going live
- **Logo**: currently the header shows the company name as text. Drop a logo file into the project (e.g. `images/logo.svg`) and swap it into the `.brand` block in each HTML file.
- **Photos**: product thumbnails, the hero banner and the Print Rotto section currently use color/pattern placeholders (`.fabric-swatch`, `.thumb-1` … `.thumb-4`). Replace these `<div>` blocks with `<img>` tags pointing at real photos once you have them (fabric rolls, loom shots, printed samples).
- **Google Maps**: the embed in `contact.html` currently searches "Balotra, Barmer, Rajasthan" generally — swap the `src` for your exact pinned location's embed URL from Google Maps ("Share → Embed a map") for a precise pin.
- **Contact form**: the enquiry forms currently open the visitor's email app pre-filled with their message (no backend). If you'd rather receive enquiries without relying on the visitor's email client, connect a form service such as Formspree, Web3Forms, or a Vercel serverless function.
- **GST number**: the About page shows a masked placeholder (`08XXXXXXXXX1Z0`) — replace with your real GST number.

## Contact details used throughout
- Phone / WhatsApp: +91 63500 66580
- Email: manishmandot369@gmail.com
