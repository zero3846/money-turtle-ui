import * as data from './data.js'

export function getCurrentUser() {
    return 'Turtle';
}

export function loadUserData() {
    const ledgerId = data.createLedger(getCurrentUser(), 'Example Ledger');

    const checkingId = data.createAccount(ledgerId, 'First Example Bank', 'Checking', 'My checking account');
    const incomeId = data.createAccount(ledgerId, 'Income Earned', 'Income', 'My total income earned');

    data.createLedgerEntry(ledgerId, checkingId, incomeId, 10000, 'USD', new Date());

    const entries = data.getLedgerEntries();
    console.log(entries);
}