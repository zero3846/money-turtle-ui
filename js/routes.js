import { getModel, emit } from './view/state.js'

const routes = new Map();
routes.set('', 'budget');
routes.set('#budget', 'budget');
routes.set('#portfolio', 'portfolio');
routes.set('#net-worth', 'net-worth');

export function requestPage(page) {
    console.log(page);
    const app = getModel('app');
    app.requestedPage = page;
    app.actualPage = routes.get(page) ?? 'page-not-found';
    emit('app', 'load-page');
}

window.addEventListener('hashchange', () => {
    requestPage(window.location.hash);
});