# Collybus Landing Page (Tailwind CSS)

This is a simple landing page based on the content of `https://collybus.co/`, built with HTML and Tailwind CSS.

## Prerequisites

- Node.js and npm (or yarn)

## Setup

1. Clone the repository (or download the files).
2. Install dependencies:
   ```bash
   npm install
   ```

## Development

To build the Tailwind CSS and watch for changes:

```bash
npm run build:css
```

This will generate a `dist/styles.css` file. Make sure your `index.html` links to this file.

Open `index.html` in your browser to view the page.

## Hosting

For hosting on AWS CloudFront or similar services, you'll typically need to:

1. Build the CSS: `npm run build:css` (you might want a production build command that minifies the CSS, e.g., by adding ` --minify` to the tailwindcss CLI command).
2. Upload the `index.html` file and the `dist` directory (containing `styles.css`) to your hosting provider (e.g., an S3 bucket for CloudFront).
3. Configure your hosting service to serve `index.html` as the main page.