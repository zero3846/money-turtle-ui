import * as data from '../data.js'

const transactions = [];

export class Transaction {
    constructor(id, action, account, categoryId, amount, unit, date) {
        if (typeof id !== 'number') {
            throw 'ID is a required numerical value';
        }
        if (typeof amount !== 'number') {
            throw 'Amount is a required numerical value';
        }
        if (typeof unit !== 'string') {
            throw 'Unit is a required string value';
        }

        this.id = id;
        this.action = action;
        this.account = account;
        this.categoryId = categoryId;
        this.amount = amount;
        this.unit = unit;
        this.date = date;
        this.deleted = false;
    }
}

export function transactionExists(id) {
    if (id < 0 || id >= transactions.length) {
        return false;
    }
    return transactions;
}

export function isDeletedTransaction(id) {
    const transaction = getTransactionById(id);
    return transaction.deleted;
}

export function getTransactions() {
    return transactions
        .filter(t => !t.deleted);
}

export function getTransactionById(id) {
    return transactions[id];
}

export function submitSpend(account, categoryId, amount, unit, date) {
    if (!data.isCategoryOfType(categoryId, 'expense')) {
        throw 'Cannot spend from a non-expense category';
    }

    const nextId = transactions.length;
    transactions.push(new Transaction(
        nextId,
        'spend',
        account,
        categoryId,
        amount,
        unit,
        date
    ));
}

export function submitEarn(account, categoryId, amount, unit, date) {
    if (!data.isCategoryOfType(categoryId, 'savings')) {
        throw 'Cannot earn into a non-savings category';
    }

    const nextId = transactions.length;
    transactions.push(new Transaction(
        nextId,
        'earn',
        account,
        categoryId,
        amount,
        unit,
        date
    ));
}