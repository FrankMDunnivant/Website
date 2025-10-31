/**
 * Entry point for the application
 * Optimized with async initialization and error handling
 */

import './style.css';
import { App } from './app';

// Enable smooth scrolling globally
document.documentElement.style.scrollBehavior = 'smooth';

// Get the root element
const appElement = document.querySelector<HTMLDivElement>('#app');

if (!appElement) {
  throw new Error('Could not find #app element');
}

// Create and initialize the application
const app = new App(appElement);

// Initialize with error handling
app.init().catch(error => {
  console.error('Failed to initialize application:', error);
  appElement.innerHTML = `
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="max-w-md p-8 bg-white rounded-xl shadow-lg text-center">
        <h1 class="text-2xl font-bold text-red-600 mb-4">Failed to Load</h1>
        <p class="text-gray-700 mb-4">Sorry, the application failed to initialize.</p>
        <button onclick="location.reload()" class="px-6 py-2 bg-ocean-700 text-white rounded-lg">
          Reload Page
        </button>
      </div>
    </div>
  `;
});

// Export app instance for debugging in development
if (import.meta.env.DEV) {
  (window as any).app = app;
  console.log('Dev mode: window.app is available for debugging');
  console.log('Try: window.app.getCurrentSection() or window.app.navigateTo("contact")');
}

// Handle browser back/forward buttons (if we add routing later)
window.addEventListener('popstate', () => {
  // Future: handle browser navigation
});
