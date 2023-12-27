import { getModel, emit } from './view/state.js'

const routes = new Map();
routes.set('', 'budget');
routes.set('#budget', 'budget');
routes.set('#portfolio', 'portfolio');
routes.set('#net-worth', 'net-worth');

export function requestPage(page) {
    const app = getModel('app');
    app.requestedPage = page;
    app.actualPage = routes.get(page) ?? 'page-not-found';

    console.log(`Page requested: ${app.requestedPage}`);
    console.log(`Element to load: c-${app.actualPage}-page`);
    
    emit('app', 'load-page');
}

window.addEventListener('hashchange', () => {
    requestPage(window.location.hash);
});