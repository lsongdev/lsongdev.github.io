import { render as renderPosts } from './posts.js';
import { render as renderProjects } from './projects.js';
import { render as renderProducts } from './products.js?v=2';

const ready = callback => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback, { once: true });
  } else {
    callback();
  }
};

ready(() => {
  renderProducts('.product-grid');
  renderPosts('#writing ul');
  renderProjects('#open-source ul');
  const year = document.querySelector('#copyright-year');
  if (year) year.textContent = new Date().getFullYear();
});

if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}
