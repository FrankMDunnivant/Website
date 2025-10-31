/**
 * Content data for all website sections
 * Now uses lazy loading for better performance
 */

import type { Section } from './types';
import { loadContent } from './content-loader';

export const sections: Section[] = [
  {
    id: 'about',
    title: 'About',
    loadContent: () => loadContent('about')
  },
  {
    id: 'contact',
    title: 'Contact',
    loadContent: () => loadContent('contact')
  },
  {
    id: 'published-books',
    title: 'Published Books',
    loadContent: () => loadContent('published-books')
  },
  {
    id: 'publications',
    title: 'Publications',
    loadContent: () => loadContent('publications'),
    children: [
      {
        id: 'pedagogical-publications',
        title: 'Pedagogical Publications',
        loadContent: () => loadContent('pedagogical-publications')
      },
      {
        id: 'other-publications',
        title: 'Other Publications',
        loadContent: () => loadContent('other-publications')
      }
    ]
  },
  {
    id: 'environmental-software',
    title: 'Environmental Software',
    loadContent: () => loadContent('environmental-software')
  },
  {
    id: 'equipment',
    title: 'Equipment',
    loadContent: () => loadContent('equipment')
  },
  {
    id: 'funding',
    title: 'Funding',
    loadContent: () => loadContent('funding')
  }
];
