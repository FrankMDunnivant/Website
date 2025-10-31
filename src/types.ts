/**
 * Type definitions for the application
 */

export interface Section {
  id: string;
  title: string;
  content?: string;  // Optional now - can be loaded lazily
  loadContent?: () => Promise<string>;  // Async content loader
  children?: Section[];  // Optional sub-sections for dropdown menus
}

export interface AppState {
  currentSection: string;
  sections: Section[];
  loadedContent: Map<string, string>;  // Cache for loaded content
  isLoading: boolean;  // Loading state
}

export interface SearchResult {
  sectionId: string;
  sectionTitle: string;
  snippet: string;
  matchCount: number;
}
