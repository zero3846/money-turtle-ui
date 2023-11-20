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

    const entries = data.getLedgerEntries();
    console.log(entries);
    
    const balance = data.getAccountBalance(groceriesId);
    console.log(balance.getAmount(currency));
}

function earn(debited, amount, date) {
    data.createLedgerEntry(ledgerId, debited, incomeId, amount, currency, date);
}

function fund(account, from, amount, date) {
    data.createLedgerEntry(ledgerId, account, from, amount, currency, date);
}