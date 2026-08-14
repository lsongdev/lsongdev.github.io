export const getProjects = async () => {
  const response = await fetch('https://api.github.com/users/lsongdev/repos?per_page=100&type=owner');
  if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
  return response.json();
};

export const sortByStar = (a, b) =>
  b.stargazers_count - a.stargazers_count;

const DEFAULT_LIMIT = 6;

export const render = async element => {
  if (typeof element === 'string') element = document.querySelector(element);
  if (!element) return;

  const limit = Number(element.dataset.limit) || DEFAULT_LIMIT;
  const projects = await getProjects().catch(() => []);
  if (!projects?.length) {
    // Keep the semantic HTML fallback in sync with the dynamic result count.
    [...element.children].slice(limit).forEach(item => item.remove());
    return;
  }

  const fragment = document.createDocumentFragment();
  for (const project of projects.filter(x => x.description && x.stargazers_count).sort(sortByStar).slice(0, limit)) {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = project.html_url;
    link.title = project.description;
    link.textContent = project.name;
    li.append(link);
    fragment.append(li);
  }
  element.replaceChildren(fragment);
};
