import { Component } from "./component.js"
import { getModel, setModel, listen, emit } from './state.js'
import { requestPage } from "../routes.js"
import * as client from '../client.js'

const css = `
.app {
    margin-top: var(--header-height);
}

header {
    background: var(--text-color-dark);
    color: var(--light-background);
    display: flex;
    gap: 1rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--header-height);
}

nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
}

.logo {
    content: url("img/turtle-logo.svg");
    height: var(--header-height);
    padding: 0.1rem;
}

a {
    font-weight: bold;
    text-decoration: none;
    color: var(--text-color-light);
    padding: 0.2rem;
}

a:hover {
    background: rgba(245, 245, 220, 0.5);
    transition: 0.3s;
}
`;

class CApplication extends Component {
    constructor() {
        super(css);

        setModel('app', this);
        listen('app', 'load-page', this.loadPage.bind(this));
    }

    connectedCallback() {
        super.connectedCallback();
        requestPage(window.location.hash);
    }

    buildContent() {
        const appElem = document.createElement('div');
        appElem.className = 'app';
        appElem.innerHTML = `
            <header>
                <a href="#" class="logo"></a>
                <nav>
                    <a href="#budget">Budget</a>
                    <a href="#portfolio">Portfolio</a>
                    <a href="#net-worth">Net Worth</a>
                </nav>
            </header>
            <div class="content"></div>
        `;
        return appElem;
    }

    async loadPage(e) {
        const app = e.state;
        const newPageElem = await import(`/js/view/c-${app.actualPage}-page.js`)
            .then(() => document.createElement(`c-${app.actualPage}-page`));
        const content = this.shadowRoot.querySelector('.content');
        content.replaceChildren(newPageElem);
    }
}

client.importData();
customElements.define('c-application', CApplication);