import { Component } from "./component.js"
import { createTransactionItem } from "./c-transaction-item.js";

const css = `
.list {
    font-size: 0.9rem;
    font-weight: bold;
}
`;

class CTransactionList extends Component {
    constructor() {
        super(css);
    }

    buildContent() {
        const content = document.createElement('div');
        content.className = 'list';
        
        if (this.modelState) {
            this.modelState
                .map(t => createTransactionItem(t))
                .forEach(item => content.appendChild(item));
        }
    
        return content;
    }
}

customElements.define('c-transaction-list', CTransactionList);