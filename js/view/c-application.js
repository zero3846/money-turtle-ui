import { Component } from "./component.js"
import { getModel, setModel, listen, emit } from './state.js'
import { requestPage } from "../routes.js"

const css = `
.app {
    width: 100vw;
    height: 100vh;
}

.content {

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
        requestPage('home');
    }

    buildContent() {
        const appElem = document.createElement('div');
        appElem.className = 'app';
        appElem.innerHTML = `
            <div class="content">
                <p>Hello World</p>
            </div>
        `;
        return appElem;
    }

    async loadPage(e) {
        const app = e.state;
        console.log(`Requested Page: ${app.requestedPage}`);
        console.log(`Actual Page: ${app.actualPage}`);

        const newPageElem = await import(`/js/view/c-${app.actualPage}-page.js`)
            .then(() => document.createElement(`c-${app.actualPage}-page`));

        const content = this.shadowRoot.querySelector('.content');
        content.replaceChildren(newPageElem);
    }
}

customElements.define('c-application', CApplication);