import { Component } from "./component.js"

const css = `
.item {
    display: grid;
    grid-template-columns: 10ch auto 10ch;
}

.left {
    text-align: left;
}

.right {
    text-align: right;
}
`;

class CTransactionItem extends Component {
    constructor() {
        super(css);
    }

    buildContent() {
        const content = document.createElement('div');
        content.className = 'item';
        content.innerHTML = `
            <div class='left'>${this.getAttribute('date')}</div>
            <div class='left'>${this.getAttribute('account')}</div>
            <div class='right'>${this.getAttribute('amount')}</div>
        `;

        return content;
    }
}

export function createTransactionItem(t) {
    const element = document.createElement('c-transaction-item');
    element.setAttribute('date', t.date);
    element.setAttribute('account', t.account);
    element.setAttribute('amount', (t.increase ? '' : '-') + t.amount);
    return element;
}

customElements.define('c-transaction-item', CTransactionItem);