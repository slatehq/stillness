# Stillness

Stillness is a calming, curated video experience for children featuring cartoons and short films. It provides a safe, dark-themed, and distraction-free environment for viewing high-quality animated content without the noise of standard video platforms.

**Created by [Daptar (दप्तर)](https://daptar.digital) with the help of Google AI Studio**

## Features

- **Curated Content**: Carefully selected series and short films appropriate for children.
- **Distraction-Free Viewing**: A clean, dark-themed interface (Slate 950) focusing purely on the content.
- **Series Management**: Organized episodic content with easy navigation between seasons and episodes.
- **Featured Carousel**: Highlights top content on the home screen.
- **PWA Support**: Fully installable as a Progressive Web App on mobile and desktop devices.
- **Responsive Design**: Optimized for both mobile touch interactions and desktop screens.

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend/Database**: Supabase
- **Icons**: Lucide React
- **Video**: YouTube Embed API with strict privacy settings (`rel=0`, `modestbranding`)

## Application Structure

- **Home**: Split into "Series" and "Films" tabs with a featured carousel and content grid.
- **Series Detail**: Displays video player, series description, and episode list organized by season.
- **Short Detail**: Displays video player and film metadata.

## Setup

This project uses a lightweight setup with ES module imports via `importmap` in `index.html`.

1. Clone the repository.
2. Serve the root directory using any static file server (e.g., `npx serve`, `python -m http.server`, or VS Code Live Server).
3. Open `index.html` in your browser.

## License

Copyright © Daptar. All rights reserved.