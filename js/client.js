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
        accountType: accountType,
        accountName: accountName
    });
}

export function getAccounts(unit) {
    return accounts.map(a => {
        return {
            accountName: a.accountName,
            accountType: a.accountType,
            currentBalance: getCurrentBalance(
                a.accountName,
                getBalanceType(a.accountType),
                unit
            )
        }
    });
}

let transactions = [];

function importTransaction([event, accountName, amount, unit, date]) {
    const quantity = toQuantity(amount, unit);
    transactions.push({
        side: event,
        accountName: accountName,
        amount: amount,
        unit: unit,
        date: new Date(date)
    });
}

export function getRecentTransactions() {
    const today = new Date();
    return transactions
        .filter(t => t.date.getTime() < today.getTime())
        .sort((t1, t2) => t2.date.getTime() - t1.date.getTime())
        .map(t => {
            return {
                date: formatDate(t.date),
                accountName: t.accountName,
                side: t.side,
                amount: formatQuantity(toQuantity(t.amount, t.unit), t.unit)
            }
        });
}

function formatDate(date = new Date()) {
    return date.toLocaleDateString('en-US');
}

function toQuantity(amount, unit) {
    if (unit === 'USD') {
        amount = parseInt(amount.replace('.', ''));
    } else {
        amount = parseFloat(amount);
    }

    const quantity = new Quantity();
    quantity.add(amount, unit);
    return quantity;
}

function formatQuantity(qty, unit) {
    if (unit === 'USD') {
        const amount = qty.getAmount(unit);
        return Intl.NumberFormat(
            'en-US', {
                style: 'currency',
                currency: unit
            }
        ).format(amount / 100);
    }
    return `${amount} ${unit}`
}

function getCurrentBalance(accountName, balanceType, unit) {
    const today = new Date();
    const accountTransactions = transactions
        .filter(t => t.accountName === accountName
            && t.date.getTime() < today.getTime());

    const debitSum = accountTransactions
        .filter(t => t.side === 'debit')
        .map(t => toQuantity(t.amount, t.unit))
        .reduce((s, q) => s.addQuantity(q), new Quantity());

    const creditSum = accountTransactions
        .filter(t => t.side === 'credit')
        .map(t => toQuantity(t.amount, t.unit))
        .reduce((s, q) => s.addQuantity(q), new Quantity());

    const sum = balanceType === 'debit'
        ? debitSum.subtractQuantity(creditSum)
        : creditSum.subtractQuantity(debitSum);
    
    return formatQuantity(sum, unit);
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