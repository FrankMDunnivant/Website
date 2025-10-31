# Frank M. Dunnivant - Professor of Chemistry Website

This website has been recreated to preserve and restore the academic website of Professor Frank M. Dunnivant from Whitman College, after the original Google Sites page went offline.

## About

A modern, high-performance, responsive single-page application built with:
- **Vite** - Fast build tool with code splitting
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first CSS framework
- **Lazy Loading** - On-demand content loading
- **Search Functionality** - Full-text search across all sections
- **Responsive Design** - Mobile-first approach

## 🚀 Performance Features

### Lazy Loading
- ✅ Content files loaded on-demand
- ✅ Automatic caching to prevent re-fetching
- ✅ Background preloading of popular sections
- ✅ ~50% reduction in initial bundle size

### Code Splitting
- ✅ Separate chunks for each content section
- ✅ Parallel downloads for faster loading
- ✅ Better browser caching

**Build Output:**
```
Main bundle:     15.22 kB (gzipped: 4.97 kB)
Content chunks:  1-10 kB each (loaded on demand)
Total savings:   ~40-50% faster initial load
```

### Image Optimization
- ✅ Script provided to download images locally
- ✅ WebP support with fallbacks
- ✅ Lazy loading for images
- ✅ Responsive images for different screen sizes

## ✨ Features

### User Experience
- 🔍 **Real-time Search** - Search across all content (Ctrl/Cmd + K)
- ⚡ **Loading States** - Smooth transitions with loading indicators
- 📱 **Mobile Responsive** - Perfect on all devices
- ♿ **Accessible** - ARIA labels, keyboard navigation
- 🎨 **Modern UI** - Beautiful gradient header, smooth animations

### SEO & Accessibility
- ✅ Dynamic page titles per section
- ✅ Meta description updates
- ✅ ARIA labels and roles
- ✅ Keyboard shortcuts (Ctrl/Cmd + K for search, Esc to close)
- ✅ Semantic HTML structure

### Developer Experience
- 📝 Clean, modular code
- 🔧 TypeScript for type safety
- 🎯 Easy content management (just edit HTML files)
- 🐛 Dev mode debugging tools

## Project Structure

```
src/
├── content/                    # HTML content files (9 files)
│   ├── about.html
│   ├── contact.html
│   ├── published-books.html
│   ├── publications.html
│   ├── pedagogical-publications.html
│   ├── other-publications.html
│   ├── environmental-software.html
│   ├── equipment.html
│   └── funding.html
├── main.ts                     # Entry point with error handling
├── app.ts                      # Application logic + search
├── renderer.ts                 # UI rendering with search UI
├── content.ts                  # Section configuration
├── content-loader.ts           # Lazy loading implementation
├── search.ts                   # Search functionality
├── types.ts                    # TypeScript interfaces
└── style.css                   # Tailwind config + custom styles

scripts/
└── download-images.sh          # Download & optimize images

public/
└── images/
    └── books/                  # Optimized book covers (create this)
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Site available at `http://localhost:5173`.

**Dev Tools:**
```javascript
// Browser console
window.app.getCurrentSection()           // Get current section
window.app.navigateTo('contact')         // Navigate to section
window.app.search('environmental')       // Search content
```

### Build for Production

```bash
npm run build
```

**Build Stats:**
- Main bundle: ~15 KB (gzipped: ~5 KB)
- Content chunks: 1-10 KB each (lazy loaded)
- CSS: ~22 KB (gzipped: ~5 KB)
- **Total initial load: ~10 KB** 🎉

### Preview Production Build

```bash
npm run preview
```

## Image Optimization (Optional but Recommended)

### Download Images Locally

```bash
cd scripts
./download-images.sh
```

This downloads all book covers from Wayback Machine to `public/images/books/`.

### Add Your 2024 Book Cover

1. Save your image: `public/images/books/essentials-2024.jpg`
2. Images are automatically optimized by the browser

### Convert to WebP (Best Performance)

```bash
cd public/images/books

# Install cwebp if needed (macOS):
brew install webp

# Convert images
for img in *.jpg *.png; do 
  cwebp "$img" -o "${img%.*}.webp"
done
```

Then use `published-books-optimized.html` instead of the current one.

## Search Feature

### Usage
- Click search box or press **Ctrl/Cmd + K**
- Type your query (min 2 characters)
- Results appear instantly
- Click result to navigate
- Press **Esc** to close

### Features
- ✅ Real-time search with debouncing (300ms)
- ✅ Searches across all sections
- ✅ Shows match count and snippets
- ✅ Sorted by relevance (most matches first)
- ✅ Keyboard accessible

## Keyboard Shortcuts

- **Ctrl/Cmd + K** - Focus search
- **Esc** - Close search results
- **Tab** - Navigate through buttons
- **Enter** - Activate button
- **Arrow Keys** - Navigate dropdown menus

## Website Sections

1. **About** - Biography and background
2. **Contact** - Work and home contact information  
3. **Published Books** - 5 books + 2 eTextbooks with covers
4. **Publications** - Research papers (dropdown menu)
   - Pedagogical Publications
   - Other Publications
5. **Environmental Software** - Software packages + video tutorials
6. **Equipment** - Laboratory instrumentation
7. **Funding** - Research grants ($7.5M+ total)

## Content Management

### Editing Content

All content is in `src/content/*.html` files. Simply edit and save!

```html
<!-- src/content/about.html -->
<p>Edit content here...</p>
<ul>
  <li>Add new items</li>
</ul>
```

### Adding Tailwind Classes

```html
<div class="bg-blue-50 p-6 rounded-lg mb-4">
  <h3>Styled with Tailwind</h3>
</div>
```

### Adding a New Section

1. Create HTML file: `src/content/new-section.html`
2. Update `src/content-loader.ts` to add case for new section
3. Update `src/content.ts` to add section config
4. Navigation updates automatically!

## Customization

### Theme Colors

Edit `src/style.css`:
```css
@theme {
  --color-ocean-900: #0a4d68;  /* Dark blue */
  --color-ocean-700: #088395;  /* Medium blue */
  --color-ocean-500: #05bfd1;  /* Light blue */
}
```

### Fonts

Google Fonts are loaded in `index.html`:
- Merriweather (serif) - For headings
- Open Sans (sans-serif) - For body text

## Deployment

### Quick Deploy

```bash
npm run build
# Upload 'dist' folder to any static host
```

### Recommended Hosts
- **Netlify** - Automatic deployments from Git
- **Vercel** - Zero-config deployments
- **Cloudflare Pages** - Fast global CDN
- **GitHub Pages** - Free for public repos

### Netlify Deploy

```bash
npm run build
netlify deploy --dir=dist --prod
```

## Performance Metrics

### Before Optimizations
- Initial bundle: ~37 KB
- All content loaded upfront
- No code splitting

### After Optimizations
- Initial bundle: ~15 KB (59% reduction!)
- Content loaded on-demand
- 9+ separate chunks (parallel loading)
- Smart caching and preloading

### Lighthouse Scores (Expected)
- Performance: 95-100
- Accessibility: 95-100
- Best Practices: 95-100
- SEO: 90-95

## Technical Details

### Lazy Loading

Content is loaded dynamically:
```typescript
// Only loaded when section is viewed
const content = await loadContent('about');
```

### Caching Strategy

1. **First visit to section** - Load from file
2. **Subsequent visits** - Serve from memory cache
3. **Background preload** - Common sections loaded after 1s

### Search Implementation

- Debounced input (300ms delay)
- Cached content for fast searching
- Results sorted by relevance
- HTML stripped from snippets

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome)

## Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Troubleshooting

### Search not working?
Check browser console for errors. Ensure all content files exist.

### Images not loading?
Run `scripts/download-images.sh` to download locally.

### Styles not applying?
Clear browser cache and rebuild: `npm run build`

## Future Enhancements

Potential additions:
- [ ] Progressive Web App (PWA) support
- [ ] Print-friendly CSS
- [ ] PDF export of CV
- [ ] Dark mode toggle
- [ ] RSS feed for publications
- [ ] Citation export (BibTeX)

## License

Content rights belong to Professor Frank M. Dunnivant and Whitman College.

## Acknowledgments

- Original content from Whitman College Google Sites
- Preserved via the Wayback Machine
- Rebuilt with modern, optimized architecture
- Designed for performance, accessibility, and long-term preservation

