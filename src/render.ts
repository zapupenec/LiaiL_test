import { TService } from './type';

const renderLeaf = (leaf: TService, element: HTMLElement) => {
  const leafEl = document.createElement('li');
  leafEl.classList.add('leaf');
  leafEl.textContent = `${leaf.name} (${leaf.price})`;
  element.append(leafEl);
};

const renderNode = (node: TService, element: HTMLElement, list: TService[]) => {
  const nodeEl = document.createElement('li');
  nodeEl.classList.add('node');
  nodeEl.textContent = `${node.name}`;

  const listEl = document.createElement('ul');
  listEl.classList.add('children');
  nodeEl.append(listEl);

  let isOpen = false;
  const toggleVisibilityChildren = (e: MouseEvent) => {
    if (e.target === nodeEl) {
      if (isOpen) {
        nodeEl.classList.remove('node_isOpen');
      } else {
        nodeEl.classList.add('node_isOpen');
      }
      isOpen = !isOpen;
    }
  };
  nodeEl.addEventListener('click', toggleVisibilityChildren);

  const children = list
    .filter((child) => child.head === node.id)
    .sort((childA, childB) => childA.sorthead - childB.sorthead);

  children.forEach((child) => {
    if (child.node) {
      renderNode(child, listEl, list);
    } else {
      renderLeaf(child, listEl);
    }
  });

  element.append(nodeEl);
};

export function renderList(list: TService[], element: HTMLElement) {
  const listEl = document.createElement('ul');
  const roots = list
    .filter((root) => !root.head)
    .sort((childA, childB) => childA.sorthead - childB.sorthead);

  roots.forEach((root) => {
    if (root.node) {
      renderNode(root, listEl, list);
    } else {
      renderLeaf(root, listEl);
    }
  });

  element.append(listEl);
}
