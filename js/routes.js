import { getModel, emit } from './view/state.js'

const routes = new Map();
routes.set('home', 'budget');
routes.set('budget', 'budget');

export function requestPage(page) {
    const app = getModel('app');
    app.requestedPage = page;
    app.actualPage = routes.get(page) ?? 'page-not-found';
    emit('app', 'load-page');
}
