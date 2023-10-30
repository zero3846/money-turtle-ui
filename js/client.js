import * as api from './data.js'

let transactions = [];

export function getCurrentUser() {
    return 'Turtle';
}

// Commit all uncommitted transactions.
export function commitTransactions() {
    if (transactions.length == 0) {
        return;
    }

    const result = api.postTransactions(transactions);
    transactions = [];
    return result;
}

// Allocate an amount to a budget category.
export function allocate(category, amount, unit, date = new Date(), other = {}) {
    transactions.push({
        ...other,
        action: 'allocate',
        category: category,
        amount: amount,
        unit: unit,
        date: date
    });
}

// Record amount spent from a budget category.
export function spend(account, category, amount, unit, date = new Date(), other = {}) {
    transactions.push({
        ...other,
        action: 'spend',
        account: account,
        category: category,
        amount: amount,
        unit: unit,
        date: date
    });
}

// Record income earned
export function earn(amount, unit, date = new Date(), other = {}) {
    transactions.push({
        ...other,
        action: 'earn',
        amount: amount,
        unit: unit,
        date: date
    });
}

// Record the buy of an item.
export function buy(amount, unit, date = new Date(), other = {}) {
    transactions.push({
        ...other,
        action: 'buy',
        amount: amount,
        unit: unit,
        date: date
    });
}

// Record the sale of an item.
export function sell(amount, unit, date = new Date(), other = {}) {
    transactions.push({
        ...other,
        action: 'sell',
        amount: amount,
        unit: unit,
        date: date
    });
}

// Record the production of an item.
export function produce(amount, unit, date = new Date(), other = {}) {
    transactions.push({
        ...other,
        action: 'produce',
        amount: amount,
        unit: unit,
        date: date
    });
}

// Record the consumption of an item.
export function consume(amount, unit, date = new Date(), other = {}) {
    transactions.push({
        ...other,
        action: 'consume',
        amount: amount,
        unit: unit,
        date: date
    });
}

// Record funds withdrawn from account.
export function withdraw(account, amount, unit, date = new Date(), other = {}) {
    transactions.push({
        ...other,
        action: 'withdraw',
        account: account,
        amount: amount,
        unit: unit,
        date: date
    });
}

// Record funds deposited into account.
export function deposit(account, amount, unit, date = new Date(), other = {}) {
    transactions.push({
        ...other,
        action: 'deposit',
        account: account,
        amount: amount,
        unit: unit,
        date: date
    });
}

// Record funds borrowed from a lender.
export function borrow(lender, amount, unit, date = new Date(), other = {}) {
    transactions.push({
        ...other,
        action: 'borrow',
        lender: lender,
        amount: amount,
        unit: unit,
        date: date
    });
}

// Record repayment to a lender.
export function repay(lender, principal, interest, unit, date = new Date(), other = {}) {
    transactions.push({
        ...other,
        action: 'repay',
        lender: lender,
        principal: principal,
        interest: interest,
        unit: unit,
        date: date
    });
}

// Record funds lent to a borrower.
export function lend(borrower, amount, unit, date = new Date(), other = {}) {
    transactions.push({
        ...other,
        action: 'lend',
        borrower: borrower,
        amount: amount,
        unit: unit,
        date: date
    });
}

// Record payment received from a borrower.
export function receive(borrower, principal, interest, unit, date = new Date(), other = {}) {
    transactions.push({
        ...other,
        action: 'receive',
        borrower: borrower,
        principal: principal,
        interest: interest,
        unit: unit,
        date: date
    });
}
