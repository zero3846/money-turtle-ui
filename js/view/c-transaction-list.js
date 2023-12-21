import { defineComponent } from "./component.js"
import { createTransactionItem } from "./c-transaction-item.js";
import { getModelState } from "./state.js";

const cssStyle = `
.list {
    font-size: 0.9rem;
    font-weight: bold;
}
`;

defineComponent('c-transaction-list', cssStyle, element => {
    const content = document.createElement('div');
    content.className = 'list';
    
    if (element.hasAttribute('model-id')) {
        const modelId = element.getAttribute('model-id');
        const transactions = getModelState(modelId);
        transactions
            .map(t => createTransactionItem(t))
            .forEach(item => content.appendChild(item));
    }

    return content;
});

export function createTransactionList(modelId) {
    const element = document.createElement('c-transaction-list');
    element.setAttribute('model-id', modelId);

    return element;
}