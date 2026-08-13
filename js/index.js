import { ready } from 'https://lsong.org/scripts/dom/index.js';
import { registerServiceWorker } from 'https://lsong.org/scripts/sw.js';
import { render as renderPosts } from './posts.js';
import { render as renderProjects } from './projects.js';
import { render as renderProducts } from './products.js?v=2';

ready(() => {
  const markReady = selector => {
    const element = document.querySelector(selector);
    if (element) element.setAttribute('aria-busy', 'false');
  };
  renderPosts('#posts ul');
  renderProjects('#projects ul');
  renderProducts('#products ul').finally(() => markReady('#products ul'));
});

registerServiceWorker("sw.js");

const ready = callback => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback, { once: true });
  } else {
    callback();
  }
};