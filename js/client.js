import * as data from './data.js'
import { Quantity } from './data/quantity.js';
import import_data from './private/import_data.js'

export function getCurrentUser() {
    return 'Turtle';
}

export function importData() {
    import_data
        // Split data into lines
        .split('\n')

        // Clean up lines
        .map(line => line
            // Strip comments
            .replace(/#.*$/, '')

            // Trim whitespace per line
            .trim()
        )

        // Skip blank lines
        .filter(line => line.length > 0)

        // Convert lines into records
        .map(line => line
            // Split line into fields
            .split(',')

            // Trim whitespace per field
            .map(field => field.trim())
        )

        // Import all records
        .forEach(record => importRecord(record));
}

const importMethods = {
    "account": importAccount,
    "credit": importTransaction,
    "debit": importTransaction,
}

function importRecord(record) {
    const event = record[0];
    if (importMethods.hasOwnProperty(event)) {
        const importMethod = importMethods[event];
        importMethod(record);
    } else {
        console.error(`Skipping unrecognized event: ${event}`)
    }
}

let accounts = [];

function accountExists(accountName) {
    return accounts
        .filter(a => a.accountName === accountName)
        .length > 0;
}

function importAccount([event, accountType, accountName]) {
    if (accountExists(accountName)) {
        throw `Account already exists: ${accountName}`;
    }

    accounts.push({
        type: 'account',
        accountType: accountType,
        accountName: accountName
    });
}

export function getAccounts() {
    return accounts;
}

export function getAccount(accountName) {
    if (!accountExists(accountName)) {
        throw `Account does not exist: ${accountName}`;
    }

    return accounts
        .filter(a => a.accountName === accountName)
        [0];
}

let transactions = [];

function importTransaction([event, accountName, amount, unit, date]) {
    const quantity = toQuantity(amount, unit);
    transactions.push({
        type: 'transaction',
        side: event,
        accountName: accountName,
        quantity: quantity,
        date: date
    });
}

function toQuantity(amount, unit) {
    if (unit === 'USD') {
        // Verify the format
        if (!amount.match(/\d+\.\d\d/g)) {
            throw `Invalid USD format detected: ${amount}`;
        }
        amount = parseInt(amount.replace('.', ''));
    } else {
        amount = parseFloat(amount);
    }

    const quantity = new Quantity();
    quantity.add(amount, unit);
    return quantity;
}

function formatAmount(qty, currency) {
    const amount = qty.getAmount(currency);
    return Intl.NumberFormat(
        'en-US', {
            style: 'currency',
            currency: currency
        }
    ).format(amount / 100);
}

export function getBalance(accountName, currency) {
    const accountType = getAccount(accountName).accountType;
    const balanceType = getBalanceType(accountType);

    const accountTransactions = transactions
        .filter(t => t.accountName === accountName);

    const debitSum = accountTransactions
        .filter(t => t.side === 'debit')
        .map(t => t.quantity)
        .reduce((s, q) => s.addQuantity(q), new Quantity());

    const creditSum = accountTransactions
        .filter(t => t.side === 'credit')
        .map(t => t.quantity)
        .reduce((s, q) => s.addQuantity(q), new Quantity());

    const sum = balanceType === 'debit'
        ? debitSum.subtractQuantity(creditSum)
        : creditSum.subtractQuantity(debitSum);
    
    return formatAmount(sum, currency);
}

const balanceTypes = new Map();

balanceTypes.set('asset', 'debit');
balanceTypes.set('cash', 'debit');
balanceTypes.set('checking', 'debit');
balanceTypes.set('fund', 'debit');
balanceTypes.set('receivable', 'debit');
balanceTypes.set('savings', 'debit');

balanceTypes.set('liability', 'credit');
balanceTypes.set('credit-card', 'credit');
balanceTypes.set('loan', 'credit');
balanceTypes.set('payable', 'credit');
balanceTypes.set('risk', 'credit');

balanceTypes.set('equity', 'credit');
balanceTypes.set('donations', 'credit');
balanceTypes.set('gains', 'credit');
balanceTypes.set('income', 'credit');
balanceTypes.set('sales', 'credit');

function getBalanceType(accountType) {
    return balanceTypes.has(accountType)
        ? balanceTypes.get(accountType)
        : 'debit';
}