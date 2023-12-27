import { Component } from "./component.js"
import * as client from '../client.js'
import * as model from '../model.js'

const css = `
`;

class CPageNotFoundPage extends Component {
    constructor() {
        super(css);
    }

    buildContent() {
        const content = document.createElement('div');
        content.className = 'page';
        content.innerHTML = `
            <section class="card">
                <h1>Page Not Found</h1>
                <p>${window.location.href}</p>
            </section>
        `;
        return content;
    }

}

customElements.define('c-page-not-found-page', CPageNotFoundPage);