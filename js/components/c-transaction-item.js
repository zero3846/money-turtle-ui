import { defineComponent } from "./component.js"

const cssStyle = `
.item {
    font-size: 0.75em;
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

export function createTransactionItems(transactions) {
    return transactions.map(t => `
        <c-transaction-item
            date="${t.date}"
            account="${t.account}"
            amount="${(t.increase ? '' : '-') + t.amount}"
        ></c-transaction-item>
    `).join('');
}