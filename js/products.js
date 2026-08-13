import * as yaml from 'https://lsong.org/scripts/yaml.js';

const createProductCard = (product, index) => {
  const link = document.createElement('a');
  link.className = `card product-card${product.theme ? ` product-card-${product.theme}` : ''}`;
  link.href = product.url;

  const topline = document.createElement('span');
  topline.className = 'product-topline';

  const category = document.createElement('span');
  category.textContent = product.category;

  const number = document.createElement('span');
  number.textContent = String(index + 1).padStart(2, '0');
  topline.append(category, number);

  const name = document.createElement('span');
  name.className = 'product-name';
  name.textContent = product.name;

  const description = document.createElement('span');
  description.className = 'product-description';
  description.textContent = product.description;

  const arrow = document.createElement('span');
  arrow.className = 'product-arrow';
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '↗';

  link.append(topline, name, description, arrow);
  return link;
};

export const products = async source => {
  const response = await fetch(source, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`Products request failed: ${response.status}`);
  return yaml.load(await response.text());
};

export const render = async element => {
  if (typeof element === 'string') element = document.querySelector(element);
  if (!element) return;

  const source = element.dataset.productsSource;
  const folderName = element.dataset.productsFolder;
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
  items.filter(item => item.featured !== false).forEach((item, index) => {
    fragment.append(createProductCard(item, index));
  });
  element.replaceChildren(fragment);
};
