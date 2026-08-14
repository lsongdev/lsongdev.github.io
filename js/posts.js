export const parseRSS = str => {
  const xmlDoc = new window.DOMParser().parseFromString(str, "text/xml");
  if (xmlDoc.querySelector('parsererror')) return [];

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
};

export const posts = async () => {
  const response = await fetch('https://blog.lsong.org/feed.xml');
  if (!response.ok) throw new Error(`Posts request failed: ${response.status}`);
  return parseRSS(await response.text());
};

const formatDate = value => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
};

export const render = async element => {
  if (typeof element === 'string') element = document.querySelector(element);
  if (!element) return;

  const items = await posts().catch(() => []);
  if (!items.length) return;

  const fragment = document.createDocumentFragment();
  const limit = Number(element.dataset.limit) || 5;
  for (const item of items.slice(0, limit)) {
    const li = document.createElement('li');
    const link = document.createElement('a');
    const time = document.createElement('time');
    const date = formatDate(item.pubDate);

    time.dateTime = date;
    time.textContent = date;
    link.href = item.link;
    link.textContent = item.title;
    li.append(time, link);
    fragment.append(li);
  }
  element.replaceChildren(fragment);
};
