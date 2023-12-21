import { defineComponent } from "./component.js"

const cssStyle = `
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

defineComponent('c-transaction-item', cssStyle, element => {
    const content = document.createElement('div');
    content.className = 'item';
    content.innerHTML = `
        <div class='left'>${element.getAttribute('date')}</div>
        <div class='left'>${element.getAttribute('account')}</div>
        <div class='right'>${element.getAttribute('amount')}</div>
    `;

    return content;
});

export function createTransactionItem(t) {
    const element = document.createElement('c-transaction-item');
    element.setAttribute('date', t.date);
    element.setAttribute('account', t.account);
    element.setAttribute('amount', (t.increase ? '' : '-') + t.amount);
    return element;
}