import { formatUnit, toInternalUnits } from "./units.js";

const accounts = new Map();
const transactions = [];

const validTypeClasses = new Set();
validTypeClasses.add('asset');
validTypeClasses.add('liability');
validTypeClasses.add('equity');

const accountTypes = new Map();
accountTypes.set('cash', 'asset');
accountTypes.set('checking', 'asset');
accountTypes.set('savings', 'asset');
accountTypes.set('receivable', 'asset');
accountTypes.set('credit-card', 'liability');
accountTypes.set('loan', 'liability');
accountTypes.set('payable', 'liability');
accountTypes.set('risk', 'liability');
accountTypes.set('donations', 'equity');
accountTypes.set('gains', 'equity');
accountTypes.set('income', 'equity');
accountTypes.set('sales', 'equity');

export function createAccount(name, type, unit) {
    if (accounts.has(name)) {
        throw `Account already exists: ${name}`;
    }

    if (!accountTypes.has(type)) {
        throw `Invalid account type: ${type}`;
    }

    if (!unit) {
        throw `Account unit is missing.`;
    }

    accounts.set(name, {
        name: name,
        type: type,
        unit: unit
    });
}

export function transact(action, accountName, amount, date) {
    if (!accounts.has(accountName)) {
        throw `Account does not exist: ${accountName}`;
    }

    const account = accounts.get(accountName);

    if (action !== 'increase' && action !== 'decrease') {
        throw `Invalid action: ${action}`;
    }

    if (!(/^\d+(\.\d\d)$/).test(amount)) {
        throw `Invalid amount format`;
    }

    if (!(/^\d{4}-\d{2}-\d{2}$/).test(date)) {
        throw `Invalid date format`;
    }
    
    transactions.push({
        increase: action === 'increase',
        accountName: accountName,
        amount: toInternalUnits(amount, account.unit),
        unit: account.unit,
        date: new Date(date)
    });
}

function getCurrentBalance(account) {
    const now = new Date();
    const sum = transactions
        .filter(t => t.accountName === account.name
            && t.date.getTime() < now.getTime())
        .map(t => t.increase ? t.amount : -t.amount)
        .reduce((s, n) => s + n, 0);
    return formatUnit(sum, account.unit);
}

export function getAccounts() {
    return Array.from(accounts.values())
        .map(a => {
            return {
                name: a.name,
                type: a.type,
                typeClass: accountTypes.get(a.type),
                currentBalance: getCurrentBalance(a)
            };
        });
}

function formatDate(date) {
    return date.toLocaleDateString('en-US');
}

export function getCurrentTransactions() {
    const now = new Date();
    return transactions
        .filter(t => t.date.getTime() < now.getTime())
        .map(t => {
            return {
                date: formatDate(t.date),
                account: t.accountName,
                increase: t.increase,
                amount: formatUnit(t.amount, t.unit)
            };
        });
}