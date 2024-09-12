import { repos } from 'https://lsong.org/scripts/services/github.js';

export const getProjects = async () => {
  const projects = await repos('lsongdev');
  return projects;
};

export const sortByStar = (a, b) =>
  a.stargazers_count - b.stargazers_count;

export const render = async element => {
  if (typeof element === 'string')
    element = document.querySelector(element);
  if (!element) return;
  const projects = await getProjects();
  if (!projects) return;
  for (const project of projects.sort(sortByStar)) {
    const li = document.createElement('li');
    const nm = document.createElement('a');
    nm.href = project.html_url;
    nm.textContent = project.name;
    nm.title = project.description ?? "";
    li.className = 'card col-3 col-lg-4 col-sm-6';
    li.append(nm);
    element.append(li);
  }
};