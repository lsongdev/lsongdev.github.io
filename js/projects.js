import { repos } from 'https://lsong.org/scripts/services/github.js?v2';

export const getProjects = async () => {
  const projects = await repos('lsongdev');
  return projects;
};

export const sortByStar = (a, b) =>
  b.stargazers_count - a.stargazers_count;

export const render = async element => {
  if (typeof element === 'string')
    element = document.querySelector(element);
  if (!element) return;
  const projects = await getProjects();
  if (!projects) return;
  element.innerHTML = '';
  for (const project of projects.filter(x => x.description && x.stargazers_count).sort(sortByStar).slice(0, 10)) {
    const li = document.createElement('li');
    li.className = '';
    
    // Project name and link
    const nm = document.createElement('a');
    nm.href = project.html_url;
    nm.textContent = project.name;
    nm.title = project.description ?? "";
    nm.className = 'project-name';
    li.append(nm);
    element.append(li);
  }
};