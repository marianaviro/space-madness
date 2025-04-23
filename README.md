# Space Madness

Interactive storytelling visualization of satellites and space missions, built
with React, D3, and Deck.gl. Use the navigation buttons to explore data across
three chapters:

1. **Satellite Catalog (SATCAT)**: Timeline and waffle chart views of all
   launched satellites. Data source: Dr. T.S. Kelso's
   [CelesTrak.](https://celestrak.org/satcat/search.php)
2. **Satellite Use**: Breakdown of active satellites by user category. Data
   source:
   [Union of Concerned Scientists.](https://www.ucs.org/resources/satellite-database)
3. **Space Rides**: Historical overview of human spaceflights. Data source:
   [Jonathan's Space Pages.](https://planet4589.org/space/astro/web/ridecols.html)

## Demo

A live version should be deployed via GitHub Pages, but is not currently
working:

```
https://marianaviro.github.io/space-madness/
```

## Getting Started

### Prerequisites

- Node.js v14 or higher
- npm (v6+) or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/marianaviro/space-madness.git
cd space-madness

# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Start the Vite dev server
npm run dev
# or
yarn dev
```

Open your browser at `http://localhost:5173` to see the app.

### Build & Deploy

```bash
# Build the static site\ npm run build

# Deploy to GitHub Pages\ npm run deploy
```

This project uses the `gh-pages` package to publish the `dist/` folder to the
`gh-pages` branch. However, it is not yet working.

## Project Structure

```
space-madness/
├─ public/              # Index.html and static assets
├─ src/
│  ├─ assets/           # SVG icons, icon atlas, and data
│  ├─ components/       # React components
│  ├─ utils/            # Helpers for data loading, processing, and layout
│  │    ├─ data-utils.jsx
│  │    ├─ chart-canvas-utils.jsx
│  │    └─ slides-content.jsx
│  ├─ App.jsx           # App root
│  ├─ main.jsx          # React entry point
│  └─ index.css         # Global styles
├─ package.json         # npm scripts and dependencies
├─ vite.config.js       # Vite configuration
└─ README.md            # This file
```

## How It Works

1. **Slides Definition**: `slides-content.jsx` defines each slide’s data source,
   type (`timeline` or `waffle`), and options (filters, binning, groupBy).
2. **Data Loading**: `data-utils.jsx` loads CSV with D3, applies filtering,
   mapping, and optional binning by groups of 100.
3. **Layout**: `chart-canvas-utils.jsx` prepares positions and scales for both
   timeline and waffle layouts.
4. **Rendering**:
   - Timeline uses HTML Canvas to draw axes and satellites.
   - Waffle uses Deck.gl `IconLayer` for GPU‑accelerated icon grids with hover
     interactivity.
5. **Navigation**: `NavButtons.jsx` and keyboard arrows call `setProgress` to
   move between steps, triggering data reload.

## Dependencies

- [React](https://reactjs.org/)
- [D3.js](https://d3js.org/) for CSV parsing and scales
- [Deck.gl](https://deck.gl/) for GPU‑accelerated icon layers

## License

This project is licensed under the MIT License.
