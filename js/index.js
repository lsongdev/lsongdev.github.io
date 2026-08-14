import { ready } from 'https://lsong.org/scripts/dom/index.js';
import { registerServiceWorker } from 'https://lsong.org/scripts/sw.js';
import { render as renderPosts } from './posts.js?v=2';
import { render as renderProjects } from './projects.js?v=3';
import { render as renderProducts } from './products.js?v=3';

ready(() => {
  const productsSection = document.querySelector('section#products');

  Promise.allSettled([
    renderPosts('section#posts > ul'),
    renderProjects('section#projects > ul'),
    renderProducts('section#products > ul.products'),
  ]).finally(() => {
    productsSection?.setAttribute('aria-busy', 'false');
  });
});

registerServiceWorker('/sw.js');
