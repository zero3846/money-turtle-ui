import * as data from './data.js'

const currency = 'USD';
const ledgerId = data.createLedger(getCurrentUser(), 'Default Ledger');
const incomeId = data.createAccount(ledgerId, 'Income Earned', 'income', 'My total income earned');

export function getCurrentUser() {
    return 'Turtle';
}

export function loadUserData() {
    const checkingId = data.createAccount(ledgerId, 'First Example Bank', 'checking', 'My checking account');

    const emergenciesId = data.createAccount(ledgerId, 'Emergency Fund', 'fund', 'Fund for unexpected emergencies');
    const groceriesId = data.createAccount(ledgerId, 'Groceries', 'fund', 'Groceries spending fund');
    const rentId = data.createAccount(ledgerId, 'Rent', 'fund', 'Fund for paying rent');

    earn(checkingId, 10000, new Date());
    fund(emergenciesId, checkingId, 3000, new Date());
    fund(groceriesId, checkingId, 3000, new Date());
    fund(rentId, checkingId, 4000, new Date());
}

function earn(debited, amount, date) {
    data.createLedgerEntry(ledgerId, debited, incomeId, amount, currency, date);
}

function fund(account, from, amount, date) {
    data.createLedgerEntry(ledgerId, account, from, amount, currency, date);
}

function formatAmount(qty) {
    const amount = qty.getAmount(currency);
    return Intl.NumberFormat(
        'en-US', {
            style: 'currency',
            currency: currency
        }
    ).format(amount / 100);
}

export function getAccounts() {
    return data
        .getAccounts([ a => a.ledgerId === ledgerId])
        .map(a => {
            const balance = formatAmount(
                data.getAccountBalance(a.id)
            );
            return {
                name: a.name,
                currentBalance: balance
            };
        });
}