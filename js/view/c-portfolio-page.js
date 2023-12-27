import { Component } from "./component.js"
import * as client from '../client.js'
import * as model from '../model.js'

const css = `
`;

class CPortfolioPage extends Component {
    constructor() {
        super(css);
    }

    buildContent() {
        const content = document.createElement('div');
        content.className = 'page';
        content.innerHTML = `
            <section class="card">
                <h1>Portfolio</h1>
                <p>Nothing here yet.</p>
            </section>
        `;
        return content;
    }

}

customElements.define('c-portfolio-page', CPortfolioPage);