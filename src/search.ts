/**
 * Search functionality for the website
 * Allows users to search across all content sections
 */

import type { SearchResult } from './types';
import { loadContent, type ContentId } from './content-loader';

/**
 * Search across all sections for a query
 */
export async function searchAllSections(query: string): Promise<SearchResult[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const results: SearchResult[] = [];
  const searchLower = query.toLowerCase();

  const sectionIds: ContentId[] = [
    'about',
    'contact',
    'published-books',
    'publications',
    'pedagogical-publications',
    'other-publications',
    'environmental-software',
    'equipment',
    'funding'
  ];

  const sectionTitles: Record<ContentId, string> = {
    'about': 'About',
    'contact': 'Contact',
    'published-books': 'Published Books',
    'publications': 'Publications',
    'pedagogical-publications': 'Pedagogical Publications',
    'other-publications': 'Other Publications',
    'environmental-software': 'Environmental Software',
    'equipment': 'Equipment',
    'funding': 'Funding'
  };

  // Search each section
  for (const id of sectionIds) {
    try {
      const content = await loadContent(id);
      const contentLower = content.toLowerCase();
      
      // Count matches
      const matches = contentLower.split(searchLower).length - 1;
      
      if (matches > 0) {
        // Extract snippet around first match
        const firstMatchIndex = contentLower.indexOf(searchLower);
        const snippetStart = Math.max(0, firstMatchIndex - 50);
        const snippetEnd = Math.min(content.length, firstMatchIndex + searchLower.length + 50);
        let snippet = content.substring(snippetStart, snippetEnd);
        
        // Clean up HTML tags for snippet
        snippet = snippet.replace(/<[^>]*>/g, ' ').trim();
        if (snippetStart > 0) snippet = '...' + snippet;
        if (snippetEnd < content.length) snippet = snippet + '...';
        
        results.push({
          sectionId: id,
          sectionTitle: sectionTitles[id],
          snippet,
          matchCount: matches
        });
      }
    } catch (error) {
      console.error(`Error searching section ${id}:`, error);
    }
  }

  // Sort by match count (highest first)
  return results.sort((a, b) => b.matchCount - a.matchCount);
}

/**
 * Highlight search terms in content
 */
export function highlightSearchTerms(content: string, query: string): string {
  if (!query || query.trim().length < 2) {
    return content;
  }

  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
  return content.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
}

/**
 * Escape special regex characters
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

