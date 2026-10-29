# Sarang House Design &bull; 3BHK Interactive 3D Coordination Portal

Interactive 3D WebGL digital twin, architectural coordination model, and millwork register for the **Sarang House Design 3BHK flat**. Built with [Three.js](https://threejs.org/) using verified dimensions from `floor plan measurement.pdf`.

🌐 **Live Website (GitHub Pages):**  
**[https://arjunsedani.github.io/saranghousedesign/](https://arjunsedani.github.io/saranghousedesign/)**

---

## 🏛️ Interactive 3D Rooms Directory

| Room / Model | Direct URL | Dimensions (CAD) | Key Features |
|---|---|---|---|
| **All Rooms Portal** | [`index.html`](index.html) | Whole 3BHK | Central hub with specs schedule & room cards |
| **Living & Dining Hall** | [`living-dining.html`](living-dining.html) | 8,975 x 3,300 mm | Curved PU TV capsule (360° halo), fluted glass vitrine, sofa-cum-bed, 600 mm mandir, quartz dining |
| **Parallel Kitchen** | [`kitchen-design.html`](kitchen-design.html) | 2,630 x 3,525 mm | 1,230 mm aisle, 15 tandem drawers, Bosch oven tower, A1 shutter, P1/P2 rear elevators |
| **Master Bedroom** | [`master-bedroom.html`](master-bedroom.html) | 4,150 x 4,350 mm | 4-in cushioned stadium bed rest, 7 arched niches, 2,600 mm Pink Merino dresser, 4-bay wardrobe |
| **Bedroom 1 (Kids)** | [`bedroom-1.html`](bedroom-1.html) | 3,630 x 3,560 mm | Murphy fold-away wall bed, window daybed with drawers, 780 mm study desk |
| **Bedroom 2 (Guest)** | [`bedroom-2.html`](bedroom-2.html) | 3,300 x 3,560 mm | 7-ft (2,133.6 mm) wardrobe with entrance-facing used-clothes cabinet, queen storage bed |
| **Source CAD Review** | [`source-review.html`](source-review.html) | In-browser PDF | Vector PDF inspection tool with text extraction and zoom |

---

## 🚀 GitHub Pages & GitHub Actions Setup

This repository is configured for automated continuous deployment to **GitHub Pages** using GitHub Actions (`.github/workflows/deploy.yml`).

### How to Enable GitHub Pages (One-Time Setup in GitHub):
1. Go to your repository on GitHub: `https://github.com/arjunsedani/saranghousedesign`
2. Click on **Settings** (top tabs).
3. In the left sidebar, click **Pages** (under "Code and automation").
4. Under **Build and deployment** > **Source**, select **GitHub Actions**.
5. Once selected, pushing any commit to the `main` branch will automatically trigger `.github/workflows/deploy.yml` and publish your website live to:
   **`https://arjunsedani.github.io/saranghousedesign/`**

You can also trigger a manual deployment anytime from GitHub under **Actions** > **Deploy to GitHub Pages** > **Run workflow**.

---

## 📐 Verified Architectural Dimensions

All room geometry is mapped strictly to the structural and clearance constraints in `floor plan measurement.pdf`:

- **Combined Living & Dining Span:** 8,975 mm (Living: 4,440 mm, Dining: 4,535 mm, Width: 3,300 mm)
- **Floor-to-Slab Height:** 2,794 mm (9 ft 2 in)
- **Peripheral False Ceiling Drop:** 101.6 mm (4 in) &rarr; 2,692.4 mm finished ceiling level
- **Master Bedroom Usable East Wall:** 3,400 mm after 950 mm entrance door swing
- **Sitout Balcony:** 1,525 x 3,300 mm with SLD1 2,400 x 2,100 mm sliding glass doors

---

## 🛠️ Local Development & Viewing

All HTML files are self-contained and run directly in modern web browsers:
1. Double-click or open `index.html` in Chrome, Edge, Safari, or Firefox.
2. WebGL 2.0 with hardware acceleration is recommended for optimal rendering.
3. Use the navigation links at the top of every room to move between spaces seamlessly.
