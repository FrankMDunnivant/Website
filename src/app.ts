/**
 * Main application logic
 * Now with lazy loading, caching, search, and better performance
 */

import type { AppState, Section } from './types';
import { sections } from './content';
import { renderHeader, renderContent, renderFooter, renderLoading } from './renderer';
import { preloadContent } from './content-loader';
import { searchAllSections } from './search';

/**
 * Application class to manage state and rendering
 */
export class App {
  private state: AppState;
  private appElement: HTMLElement;
  private eventListenerAttached = false;
  private searchTimeout: number | null = null;

  constructor(appElement: HTMLElement) {
    this.appElement = appElement;
    this.state = {
      currentSection: 'about',
      sections: sections,
      loadedContent: new Map(),
      isLoading: false
    };
  }

  /**
   * Initialize the application
   */
  public async init(): Promise<void> {
    this.attachEventListeners();
    await this.render();
    
    // Preload commonly accessed sections in the background
    setTimeout(() => {
      preloadContent(['contact', 'publications', 'published-books']);
    }, 1000);
  }

  /**
   * Find a section by ID (including nested children)
   */
  private findSection(sectionId: string): Section | null {
    for (const section of this.state.sections) {
      if (section.id === sectionId) {
        return section;
      }
      if (section.children) {
        for (const child of section.children) {
          if (child.id === sectionId) {
            return child;
          }
        }
      }
    }
    return null;
  }

  /**
   * Check if a section exists (including nested children)
   */
  private sectionExists(sectionId: string): boolean {
    return this.findSection(sectionId) !== null;
  }

  /**
   * Load content for a section (with caching)
   */
  private async getContent(sectionId: string): Promise<string> {
    // Check cache first
    if (this.state.loadedContent.has(sectionId)) {
      return this.state.loadedContent.get(sectionId)!;
    }

    // Find section and load content
    const section = this.findSection(sectionId);
    if (!section || !section.loadContent) {
      throw new Error(`No content loader for section: ${sectionId}`);
    }

    const content = await section.loadContent();
    
    // Cache the content
    this.state.loadedContent.set(sectionId, content);
    
    return content;
  }

  /**
   * Update the current section
   */
  private async setCurrentSection(sectionId: string): Promise<void> {
    if (!this.sectionExists(sectionId)) {
      console.error('Section not found:', sectionId);
      return;
    }

    // Update page title and meta for SEO
    const section = this.findSection(sectionId);
    if (section) {
      document.title = `${section.title} - Frank M. Dunnivant, Professor of Chemistry`;
      this.updateMetaDescription(section.title);
    }

    this.state.currentSection = sectionId;
    await this.render();
    this.scrollToTop();
  }

  /**
   * Update meta description for SEO
   */
  private updateMetaDescription(sectionTitle: string): void {
    let description = `${sectionTitle} - Frank M. Dunnivant, Professor of Chemistry at Whitman College.`;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }

  /**
   * Render the entire application
   */
  private async render(): Promise<void> {
    try {
      this.state.isLoading = true;
      
      // Show loading state
      const loadingHtml = [
        renderHeader(this.state.sections, this.state.currentSection),
        renderLoading(),
        renderFooter()
      ].join('');
      this.appElement.innerHTML = loadingHtml;

      // Load content
      const content = await this.getContent(this.state.currentSection);
      
      this.state.isLoading = false;

      // Render with actual content
      const html = [
        renderHeader(this.state.sections, this.state.currentSection),
        renderContent(this.state.sections, this.state.currentSection, content),
        renderFooter()
      ].join('');

      this.appElement.innerHTML = html;
      this.attachSearchListener();
    } catch (error) {
      console.error('Failed to render:', error);
      this.state.isLoading = false;
      this.renderError();
    }
  }

  /**
   * Render error state
   */
  private renderError(): void {
    const html = [
      renderHeader(this.state.sections, this.state.currentSection),
      `<main class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <div class="bg-red-50 border border-red-200 p-6 sm:p-10 rounded-xl">
          <h2 class="text-2xl font-bold text-red-700 mb-4">Error Loading Content</h2>
          <p class="text-gray-700">Sorry, there was an error loading this section. Please try again.</p>
          <button onclick="location.reload()" class="mt-4 px-4 py-2 bg-ocean-700 text-white rounded-lg">
            Reload Page
          </button>
        </div>
      </main>`,
      renderFooter()
    ].join('');
    this.appElement.innerHTML = html;
  }

  /**
   * Attach search functionality
   */
  private attachSearchListener(): void {
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    const searchResults = document.getElementById('search-results') as HTMLDivElement;
    
    if (!searchInput || !searchResults) return;

    searchInput.addEventListener('input', (e) => {
      const query = (e.target as HTMLInputElement).value;
      
      // Clear previous timeout
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }

      // Debounce search
      this.searchTimeout = window.setTimeout(async () => {
        if (query.length < 2) {
          searchResults.classList.add('hidden');
          return;
        }

        const results = await searchAllSections(query);
        
        if (results.length === 0) {
          searchResults.innerHTML = `
            <div class="p-4 text-gray-600">
              No results found for "${query}"
            </div>
          `;
        } else {
          searchResults.innerHTML = results.map(result => `
            <button 
              class="w-full text-left p-3 hover:bg-gray-100 border-b border-gray-100 last:border-0"
              data-section="${result.sectionId}"
            >
              <div class="font-semibold text-ocean-900">${result.sectionTitle}</div>
              <div class="text-sm text-gray-600 mt-1">${result.snippet}</div>
              <div class="text-xs text-gray-500 mt-1">${result.matchCount} match${result.matchCount > 1 ? 'es' : ''}</div>
            </button>
          `).join('');
        }
        
        searchResults.classList.remove('hidden');
      }, 300);
    });

    // Hide results when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target as Node) && !searchResults.contains(e.target as Node)) {
        searchResults.classList.add('hidden');
      }
    });
  }

  /**
   * Attach event listeners to navigation buttons (using event delegation)
   */
  private attachEventListeners(): void {
    if (this.eventListenerAttached) {
      return; // Already attached
    }

    // Use event delegation on the app element
    this.appElement.addEventListener('click', async (e) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button[data-section]') as HTMLButtonElement;
      
      if (button) {
        e.preventDefault();
        e.stopPropagation();
        const sectionId = button.getAttribute('data-section');
        if (sectionId) {
          await this.setCurrentSection(sectionId);
          
          // Hide search results after navigation
          const searchResults = document.getElementById('search-results');
          if (searchResults) {
            searchResults.classList.add('hidden');
          }
        }
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('search-input') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }

      // Escape to close search results
      if (e.key === 'Escape') {
        const searchResults = document.getElementById('search-results');
        if (searchResults) {
          searchResults.classList.add('hidden');
        }
      }
    });

    this.eventListenerAttached = true;
  }

  /**
   * Scroll to the top of the page smoothly
   */
  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Get the current section ID
   */
  public getCurrentSection(): string {
    return this.state.currentSection;
  }

  /**
   * Navigate to a specific section programmatically
   */
  public async navigateTo(sectionId: string): Promise<void> {
    await this.setCurrentSection(sectionId);
  }

  /**
   * Public search method for debugging
   */
  public async search(query: string): Promise<any> {
    return await searchAllSections(query);
  }
}
