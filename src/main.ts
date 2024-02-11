import './style.css';
import { renderList } from './render.ts';
import data from './mock/data.json';

document.querySelector<HTMLDivElement>('#app');
renderList(data.services, document.querySelector<HTMLButtonElement>('#app')!);
