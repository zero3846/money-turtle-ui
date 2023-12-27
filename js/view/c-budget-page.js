import { Component } from "./component.js"
import * as client from '../client.js'
import * as model from '../model.js'

const css = `
.page {
    display: grid;
    gap: 0.5rem;
    padding: 0.5rem;
}
`;

class CBudgetPage extends Component {
    constructor() {
        super(css);
    }

    buildContent() {
        const button = document.createElement('button');
        button.addEventListener('click', () => console.log('clicked'));
        button.innerText = "Click Me";

        client.importData();
        
        const accounts = model.getAccounts();
        const assets = accounts.filter(a => a.typeClass === 'asset');
        const liabilities = accounts.filter(a => a.typeClass === 'liability');
        const equities = accounts.filter(a => a.typeClass === 'equity');

        const content = document.createElement('div');
        content.className = 'page';
        content.innerHTML = `
            <section class="card">
                <h1>Logged in as '${client.getCurrentUser()}'</h1>
            </section>

            <section class="card">
                <h1>Assets</h1>
                ${assets.map(a =>`
                    <div class="account">
                        <p>${a.name} (${a.type})</p>
                        <p>${a.currentBalance}</p>
                    </div>
                `).join('')}
            </section>

            <section class="card">
                <h1>Liabilities</h1>
                ${liabilities.map(a =>`
                    <div class="account">
                        <p>${a.name} (${a.type})</p>
                        <p>${a.currentBalance}</p>
                    </div>
                `).join('')}
            </section>

            <section class="card">
                <h1>Equities</h1>
                ${equities.map(a =>`
                    <div class="account">
                        <p>${a.name} (${a.type})</p>
                        <p>${a.currentBalance}</p>
                    </div>
                `).join('')}
            </section>
            
            <section id="current-transactions" class="card">
                <h1>Current Transactions</h1>
                <c-transaction-list model-id="current-transactions"></c-transaction-list>
            </section>
        `;
        content.appendChild(button);
        return content;
    }

}

customElements.define('c-budget-page', CBudgetPage);