_app-colorPalette_

# Project 2

_Project Name_
Color Palette Generator

_Description_
Palette Picker is a React application that helps designers and artists generate color schemes from images. Users can input an image URL, generate a color palette based on that image using the ColorThief algorithm, and save their favorite palettes to a database.

_User Stories (MVP)_

- As a user, I can paste an image URL so that I can see the image displayed on the screen.
- As a user, I can view a generated palette of 5 distinct colors extracted from that image.
- As a user, I can save a palette I like so that I can reference it later.
- As a user, I can navigate to a "Favorites" page to see all my saved palettes.

## Technologies Used

_Frontend_
React.js, HTML5, CSS3
_Backend/Database_
Airtable API
_Libraries_
colorthief (for color extraction)
react-router-dom (for navigation)

---

## Airtable Columns

## Component Tree

### Component Hierarchy (5 Components)

_App.jsx_
Parent component, handles Routing

_Navbar.jsx_
Navigation links

_Generator.jsx_
The page where users input URL and see colors

_PaletteDisplay.jsx_
Component that renders the colored squares

_Favorites.jsx_
Page that lists saved data from Airtable

### Routing (2 Routes)

_/_
Home/Generator Page

_/favorites_
Saved Palettes Page

### State Management

#### useState

_imageUrl_
String (Stores the user input)

_colors_
Array (Stores the extracted hex codes)

#### Lifting State

The colors state will be lifted to the Generator page so it can be passed down to the PaletteDisplay component and the "Save" button function.

## Wireframes
