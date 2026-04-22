# Spectro Israel — Service Report App

Interactive service report application for **Spectro Israel** field technicians.

## 🔗 Live App

**[https://shalvanam.github.io/service-report/](https://shalvanam.github.io/service-report/)**

## Features

- **Hebrew (RTL) & English** interface with live toggle
- **Google Sheet backend** — shared counter for unique report numbers + user authentication
- **Login system** — username/password verified against Google Sheet, 15-minute periodic verification
- **Photo capture** — camera + gallery, compression, rename with long-press, storage indicator
- **PDF generation** — portrait & landscape modes, smart page splitting, line breaks preserved
- **JSON backup** — save and reload reports for re-editing
- **Signature pads** — technician & client, with color picker (black, blue, red, green, purple)
- **Auto-save** — all form data saved to localStorage as you type
- **Dark mode** — full dark theme
- **Field validation** — required fields highlighted before saving
- **Time calculator** — auto-calculates work hours from start/end time
- **Factory name autocomplete** — learns from previous reports
- **PWA** — installable on Android & iOS home screen, works like a native app

## Form Sections

1. **General Details** — factory name, contact, date, call type
2. **Device Details** — type, manufacturer, serial number
3. **Work Description** — subject + numbered work lines
4. **Notes & Recommendations**
5. **Items Table** — item, SKU, quantity
6. **Photos** — capture, upload, delete, rename
7. **Execution Summary** — technician, start/end time, travel hours/km
8. **Signatures** — technician + client

## Tech Stack

- Single HTML file (all CSS, JS, logo embedded)
- Google Apps Script (counter API + user authentication)
- html2canvas + jsPDF (PDF generation)
- Google Fonts (Rubik)
- PWA (manifest.json + service worker)

## Files

| File | Purpose |
|------|---------|
| `index.html` | The app |
| `manifest.json` | PWA configuration |
| `sw.js` | Service worker for caching |
| `icon-192.png` | App icon (home screen) |
| `icon-512.png` | App icon (splash screen) |

## Setup

See `setup_guide.md` for Google Sheet configuration instructions.

## License

Private — Spectro Israel © 2026
