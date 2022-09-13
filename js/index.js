import { ready } from 'https://lsong.org/scripts/dom.js';
import { registerServiceWorker } from 'https://lsong.org/scripts/sw.js';
import { render as renderProjects } from './projects.js';
import { render as renderPosts } from './posts.js';

ready(() => {
  renderPosts('#posts ul');
  renderProjects('#projects ul');
});

registerServiceWorker("sw.js");