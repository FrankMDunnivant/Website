/**
 * Lazy loading for content files
 * Loads HTML content on demand rather than bundling everything upfront
 */

export type ContentId = 
  | 'about'
  | 'contact'
  | 'published-books'
  | 'publications'
  | 'pedagogical-publications'
  | 'other-publications'
  | 'environmental-software'
  | 'equipment'
  | 'funding';

// Cache for loaded content to avoid re-fetching
const contentCache = new Map<ContentId, string>();

/**
 * Dynamically load content for a section
 * Uses caching to avoid re-loading the same content
 */
export async function loadContent(id: ContentId): Promise<string> {
  // Return cached content if available
  if (contentCache.has(id)) {
    return contentCache.get(id)!;
  }

  // Lazy load the content file
  let content: string;
  
  switch (id) {
    case 'about':
      content = (await import('./content/about.html?raw')).default;
      break;
    case 'contact':
      content = (await import('./content/contact.html?raw')).default;
      break;
    case 'published-books':
      content = (await import('./content/published-books.html?raw')).default;
      break;
    case 'publications':
      content = (await import('./content/publications.html?raw')).default;
      break;
    case 'pedagogical-publications':
      content = (await import('./content/pedagogical-publications.html?raw')).default;
      break;
    case 'other-publications':
      content = (await import('./content/other-publications.html?raw')).default;
      break;
    case 'environmental-software':
      content = (await import('./content/environmental-software.html?raw')).default;
      break;
    case 'equipment':
      content = (await import('./content/equipment.html?raw')).default;
      break;
    case 'funding':
      content = (await import('./content/funding.html?raw')).default;
      break;
    default:
      throw new Error(`Unknown content ID: ${id}`);
  }

  // Cache the loaded content
  contentCache.set(id, content);
  return content;
}

/**
 * Preload content for faster navigation
 * Can be called to pre-fetch content in the background
 */
export function preloadContent(ids: ContentId[]): void {
  ids.forEach(id => {
    loadContent(id).catch(err => {
      console.warn(`Failed to preload content for ${id}:`, err);
    });
  });
}

