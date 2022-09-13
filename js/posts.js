import { format, parse } from 'https://lsong.org/scripts/time.js';

export const parseRSS = str => {
  const xmlDoc = new window.DOMParser().parseFromString(str, "text/xml");
  const items = Array.from(xmlDoc.querySelectorAll('item')).map(item => {
    const $t = t => (item.querySelector(t)?.textContent || '').trim();
    return {
      title: $t('title'),
      link: $t('link'),
      author: $t('author'),
      pubDate: $t('pubDate'),
      description: $t('description'),
    };
  });
  return items;
}

export const posts = () => {
  return Promise
    .resolve()
    .then(() => fetch(`https://blog.lsong.org/feed.xml`))
    .then(res => res.text())
    .then(parseRSS)
};

export const render = async element => {
  if (typeof element === 'string')
    element = document.querySelector(element);
  if (!element) return;
  element.innerHTML = '';
  const items = await posts();
  for (const item of items) {
    const li = document.createElement('li');
    const nm = document.createElement('a');
    nm.href = item.link;
    li.append(format('{yyyy}-{MM} ', new Date(item.pubDate)));
    nm.textContent = item.title;
    nm.title = item.description;
    li.append(nm);
    element.append(li);
  }
};