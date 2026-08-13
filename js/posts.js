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

const formatDate = value => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
};

export const render = async element => {
  if (typeof element === 'string')
    element = document.querySelector(element);
  if (!element) return;
  const items = await posts().catch(() => []);
  if (!items.length) return;
  const fragment = document.createDocumentFragment();
  const limit = Number(element.dataset.limit) || items.length;
  for (const item of items.slice(0, limit)) {
    const li = document.createElement('li');
    li.className = 'list-item';
    
    const nm = document.createElement('a');
    nm.href = item.link;
    nm.className = 'post-link';
    const span = document.createElement('time');
    span.className = 'post-date';
    span.dateTime = formatDate(item.pubDate);
    span.textContent = formatDate(item.pubDate);
    li.append(span);
    nm.textContent = item.title;
    li.append(nm);
    fragment.append(li);
  }
  element.replaceChildren(fragment);
};
