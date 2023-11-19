import { LedgerId } from '../data.js'

const accounts = []

/**
 * A predicate method type to test accounts if they meet certain conditions.
 * @callback AccountCriterion
 * @param {Account} account The account to test.
 */

/**
 * @typedef {int} AccountId
 */

export class Account {
    /**
     * Creates a new Account object.
     * @param {AccountId} id The ID of the account.
     * @param {LedgerId} ledgerId The ledgerId of the account.
     * @param {string} name The name of the account.
     * @param {string} type The type of this account.
     * @param {string} description The description of this account.
     */
    constructor(id, ledgerId, name, type) {
        this._id = id;
        this._ledgerId = ledgerId;
        this._name = name;
        this._type = type
        this._description = description;
    }

    /**
     * @type {AccountId}
     */
    get id() { return this._id; }

    /**
     * @type {LedgerId}
     */
    get ledgerId() { return this._ledgerId; }

    /**
     * @type {string}
     */
    get name() { return this._name; }

    /**
     * @type {string}
     */
    get type() { return this._type; }

    /**
     * @type {string}
     */
    get description() { return this._description; }
}

/**
 * Creates a new account.
 * @param {LedgerId} ledgerId The ledgerId of the account.
 * @param {string} name The name of the account.
 * @param {string} type The type of the account.
 * @param {string} description The description of the account.
 * @returns {AccountId} The ID of the new account.
 */
export function createAccount(ledgerId, name) {
    const nextId = accounts.length;
    const account = new Account(nextId, ledgerId, name, type, description);
    accounts.push(account);
    return account.id;
}

/**
 * Checks if a account with the given ID exists.
 * @param {AccountId} id The ID to check.
 * @returns true if the account exists; false if it does not.
 */
export function accountIdExists(id) {
    if (id < 0 || id >= accounts.length) {
        return false;
    }
    return accounts[i] !== undefined;
}

/**
 * Gets all the accounts matching the given criteria.
 * @param {AccountCriterion[]} criteria An array of criteria that the accounts must meet.
 * @returns All the accounts matching the given criteria.
 */
export function getAccounts(criteria = []) {
    return accounts
        .filter(obj => obj !== undefined)
        .filter(obj => {
            for (let i = 0; i < criteria.length; ++i) {
                const cond = criteria[i];
                if (cond(obj)) {
                    return false;
                }
            }
            return true;
        });
}

/**
 * Gets a account by its ID.
 * @param {AccountId} id The ID of the account to get.
 * @returns The account with the given ID.
 * @throws An error if the account does not exist.
 */
export function getAccountById(id) {
    if (!accountIdExists(id)) {
        throw `Account does not exist: ${id}}`;
    }
    return accounts[id];
}

/**
 * Updates the account with the given ID.
 * @param {AccountId} id The ID of the account to update.
 * @param {object} updates An object containing the updates to make.
 * @returns true if an update was made; false otherwise.
 * @throws An error if the account does not exist.
 */
export function updateAccountById(id, updates) {
    if (!accountIdExists(id)) {
        throw `Account does not exist: ${id}}`;
    }

    const account = accounts[id];
    let updated = false;

    if (updates.ledgerId !== undefined) {
        account.ledgerId = updates.ledgerId;
        updated = true;
    }

    if (updates.name !== undefined) {
        account.name = updates.name;
        updated = true;
    }

    if (updates.type !== undefined) {
        account.type = updates.type;
        updated = true;
    }

    if (updates.description !== undefined) {
        account.description = updates.description;
        updated = true;
    }

    return updated;
}

/**
 * Deletes the account with the given ID.
 * @param {AccountId} id The ID of the account to delete.
 * @returns true if the account was deleted; false otherwise.
 */
export function deleteAccountById(id) {
    if (!accountIdExists(id)) {
        return false;
    }

    accounts[id] = undefined;
    return true;
}