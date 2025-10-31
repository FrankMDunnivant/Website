/**
 * Rendering functions for the application
 */

import type { Section } from './types';

/**
 * Renders a navigation item (with or without dropdown)
 */
function renderNavItem(section: Section, currentSection: string): string {
  const hasChildren = section.children && section.children.length > 0;
  const isActive = currentSection === section.id || (hasChildren && section.children!.some(child => child.id === currentSection));
  
  const baseButtonClasses = "px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5";
  const activeClasses = "bg-white text-ocean-900 border-2 border-white";
  const inactiveClasses = "bg-white/10 text-white border-2 border-white/30 hover:bg-white/20 hover:border-white/50";
  
  if (hasChildren) {
    return `
      <li class="nav-dropdown">
        <button 
          class="${baseButtonClasses} ${isActive ? activeClasses : inactiveClasses} flex items-center gap-1.5"
          data-section="${section.id}"
          aria-haspopup="true"
          aria-expanded="false"
          aria-label="${section.title} menu"
        >
          ${section.title}
          <span class="dropdown-arrow text-xs" aria-hidden="true">▼</span>
        </button>
        <div class="dropdown-menu absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl p-2 min-w-[200px] z-[1001]" role="menu">
          ${section.children!.map(child => `
            <button 
              class="dropdown-item w-full text-left px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 hover:bg-gray-100 hover:text-ocean-700 hover:translate-x-1 my-0.5 ${currentSection === child.id ? 'bg-ocean-500 text-white' : 'text-gray-700'}"
              data-section="${child.id}"
              role="menuitem"
            >
              ${child.title}
            </button>
          `).join('')}
        </div>
      </li>
    `;
  }
  
  return `
    <li>
      <button 
        class="${baseButtonClasses} ${currentSection === section.id ? activeClasses : inactiveClasses}"
        data-section="${section.id}"
      >
        ${section.title}
      </button>
    </li>
  `;
}

/**
 * Renders the header with navigation
 */
export function renderHeader(sections: Section[], currentSection: string): string {
  return `
    <header class="sticky top-0 z-50 bg-gradient-to-br from-ocean-900 to-ocean-700 text-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 class="text-3xl sm:text-4xl font-bold mb-2 drop-shadow-lg">Frank M. Dunnivant</h1>
            <p class="text-lg sm:text-xl font-light opacity-95">Professor of Chemistry, Whitman College</p>
          </div>
          <div class="mt-4 md:mt-0">
            <div class="relative">
              <input 
                type="search" 
                id="search-input"
                placeholder="Search website..." 
                class="w-full md:w-64 px-4 py-2 pr-10 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Search website"
              >
              <svg class="absolute right-3 top-2.5 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <div id="search-results" class="hidden absolute mt-2 bg-white rounded-lg shadow-xl max-w-md max-h-96 overflow-y-auto z-50"></div>
          </div>
        </div>
        <nav aria-label="Main navigation" class="mt-4">
          <ul class="flex flex-wrap gap-2 items-center">
            ${sections.map(section => renderNavItem(section, currentSection)).join('')}
          </ul>
        </nav>
      </div>
    </header>
  `;
}

/**
 * Renders loading state
 */
export function renderLoading(): string {
  return `
    <main class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
      <div class="bg-white p-6 sm:p-10 rounded-xl shadow-lg">
        <div class="flex items-center justify-center min-h-[300px]">
          <div class="text-center">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-700 mb-4"></div>
            <p class="text-gray-600 text-lg">Loading content...</p>
          </div>
        </div>
      </div>
    </main>
  `;
}

/**
 * Renders the main content area with the current section
 */
export function renderContent(sections: Section[], currentSection: string, content: string): string {
  const section = sections.find(s => s.id === currentSection) || 
                  sections.flatMap(s => s.children || []).find(c => c.id === currentSection);
  
  if (!section) {
    return `
      <main class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <div class="bg-white p-6 sm:p-10 rounded-xl shadow-lg animate-fade-in">
          <h2 class="text-3xl font-serif font-bold text-ocean-900 mb-6 pb-3 border-b-4 border-ocean-500">Section Not Found</h2>
          <p class="text-gray-700 leading-relaxed">The requested section could not be found.</p>
        </div>
      </main>
    `;
  }
  
  return `
    <main class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
      <div class="bg-white p-6 sm:p-10 rounded-xl shadow-lg animate-fade-in">
        <h2 class="text-3xl font-serif font-bold text-ocean-900 mb-6 pb-3 border-b-4 border-ocean-500">${section.title}</h2>
        <div class="content">
          ${content}
        </div>
      </div>
    </main>
  `;
}

/**
 * Renders the footer
 */
export function renderFooter(): string {
  return `
    <footer class="bg-gray-100 border-t border-gray-200 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p class="text-gray-600 text-sm mb-1">&copy; ${new Date().getFullYear()} Frank M. Dunnivant | Whitman College Department of Chemistry</p>
      </div>
    </footer>
  `;
}
