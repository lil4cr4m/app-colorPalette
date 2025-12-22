# ColorPalette Generator

A clean, minimalist web application that extracts color palettes from images and allows you to save your favorite combinations. Built with React and integrated with Airtable for persistent storage.

## Features

- Image Palette Extraction: Extract 5-color palettes from any image URL
- ColorThief Integration: Uses the ColorThief library for accurate color detection
- Save to Airtable: Persistent storage of your favorite palettes
- Favorite Management: View, edit, and delete saved palettes
- Clean UI: Minimalist design with smooth animations
- Responsive Design: Works on desktop, tablet, and mobile devices

## Tech Stack

- Frontend: React 18 + Vite
- Routing: React Router DOM
- State Management: React Query + React State
- Color Extraction: ColorThief
- Backend Integration: Airtable API
- Styling: CSS with CSS Modules
- Build Tool: Vite

## Project Structure

```txt
src/
├── components/
│   ├── Navbar.jsx           # Navigation component
│   ├── ImageInputForm.jsx   # URL input form
│   ├── PaletteDisplay.jsx   # Main palette display
│   ├── PaletteCard.jsx      # Saved palette card
│   └── SaveForm.jsx         # Save palette form
├── pages/
│   ├── HomePage.jsx         # Generator page
│   └── FavoritesPage.jsx    # Saved palettes page
├── services/
│   └── airtable.js          # Airtable API service
├── styles/
│   ├── index.css           # Global/base styles
│   ├── App.css             # App-specific styles
│   ├── Navbar.css          # Navigation styles
│   ├── HomePage.css        # Generator page styles
│   ├── FavoritesPage.css   # Favorites page styles
│   ├── PaletteCard.css     # Palette card styles
│   ├── ImageInputForm.css  # Input form styles
│   ├── PaletteDisplay.css  # Palette display styles
│   └── SaveForm.css        # Save form styles
├── App.jsx                 # Main app component
└── main.jsx               # Application entry point

```

---

## Getting Started

**Prerequisites**

- Node.js 16+ and npm
- An Airtable account
- Airtable base with the following table structure:

```txt
1. Create a new Airtable base
2. Create a table named "Palettes" with these fields:
    - name (Single line text)
    - imageUrl (Single line text)
    - color1 (Single line text)
    - color2 (Single line text)
    - color3 (Single line text)
    - color4 (Single line text)
    - color5 (Single line text)
3. Get your API credentials:
4. API Token: From your Airtable account settings
5. Base ID: From your Airtable base URL
6. Table Name: ColorPalettes
```

**Installation**
Clone the repository:

```bash
git clone <repository-url>
cd colorpalette-app
```

Install dependencies:

```bash
npm install
```

Create environment file:

```bash
cp .env.example .env
```

Configure environment variables in .env:

```env
VITE_AIRTABLE_TOKEN=your_token_here
VITE_AIRTABLE_BASE_ID=your_base_id_here
VITE_AIRTABLE_TABLE_NAME=Palettes
```

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to:

```text
http://localhost:3000
```

## How to Use

1. Generate a Palette

   - Navigate to the Generator page
   - Paste an image URL into the input field
   - Click "Generate"
   - View the extracted 5-color palette

2. Save a Palette

   - After generating a palette
   - Optionally give it a name
   - Click "Save"
   - The palette will be saved to your Airtable base

3. Manage Favorites
   - Click "Favorites" in the navigation
   - View all saved palettes
   - Click palette names to edit them
   - Click the "×" button to delete palettes

---

## API Reference

### Airtable Service (airtable.js)

_fetchAllPalettes()_

```Javascript
// Returns: Array of palette records
const palettes = await fetchAllPalettes();
```

_savePalette({ name, imageUrl, colors })_

```Javascript
// Parameters:
// - name: string (optional)
// - imageUrl: string (required)
// - colors: Array<string> (5 hex colors)

const result = await savePalette({
  name: "Sunset Colors",
  imageUrl: "https://example.com/image.jpg",
  colors: ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33F3"]
});
```

_deletePalette(id)_

```Javascript
// Deletes a palette
await deletePalette("rec123");
```

### Color Extraction Details

The app uses the ColorThief library to extract dominant colors from images:

- Loads the image from the provided URL
- Analyzes the image to find the 5 most dominant colors
- Converts RGB values to hex codes
- Displays the palette in a clean, visual format
- \*Note: Images must be CORS-enabled to work properly.

---

Made with \<3 by Clara
