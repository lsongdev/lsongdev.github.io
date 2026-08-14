import * as yaml from 'https://lsong.org/scripts/text/yaml.js';

const createProductItem = product => {
  const item = document.createElement('li');
  const link = document.createElement('a');
  link.href = product.url;

  const name = document.createElement('span');
  name.className = 'product-name';
  name.textContent = product.name;

  const description = document.createElement('em');
  description.className = 'product-description';
  description.textContent = product.description;

  link.append(name, description);
  item.append(link);
  return item;
};

export const products = async source => {
  const response = await fetch(source, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`Products request failed: ${response.status}`);
  return yaml.load(await response.text());
};

export const render = async element => {
  if (typeof element === 'string') element = document.querySelector(element);
  if (!element) return;

  const sourceElement = element.closest('[data-products-source]');
  const source = sourceElement?.dataset.productsSource;
  const folderName = sourceElement?.dataset.productsFolder;
  if (!source || !folderName) return;

  const folders = await products(source).catch(() => []);
  const folder = Array.isArray(folders)
    ? folders.find(item => item.name === folderName)
    : null;
  const items = (folder?.links || []).map(link => ({
    ...link,
    name: link.title,
  }));
  if (!items.length) return;

  const fragment = document.createDocumentFragment();
  items.slice(0, 6).filter(item => item.featured !== false).forEach(item => {
    fragment.append(createProductItem(item));
  });
  element.replaceChildren(fragment);
};
