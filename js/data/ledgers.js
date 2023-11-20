const ledgers = []

/**
 * A predicate method type to test ledgers if they meet certain conditions.
 * @callback LedgerCriterion
 * @param {Ledger} ledger The ledger to test.
 * @return {boolean} true if the ledger meets this criterion; false if not.
 */

/**
 * @typedef {int} LedgerId
 */

export class Ledger {
    /**
     * Creates a new Ledger object.
     * @param {LedgerId} id The ID of the ledger.
     * @param {string} owner The owner of the ledger.
     * @param {string} title The title of the ledger.
     */
    constructor(id, owner, title) {
        this._id = id;
        this._owner = owner;
        this._title = title;
    }

    /**
     * @type {LedgerId}
     */
    get id() { return this._id; }

    /**
     * @type {string}
     */
    get owner() { return this._owner; }

    /**
     * @type {string}
     */
    get title() { return this._title; }
}

/**
 * Creates a new ledger.
 * @param {string} owner The owner of the ledger.
 * @param {string} title The title of the ledger.
 * @returns {LedgerId} The ID of the new ledger.
 */
export function createLedger(owner, title) {
    const nextId = ledgers.length;
    const ledger = new Ledger(nextId, owner, title);
    ledgers.push(ledger);
    return ledger.id;
}

/**
 * Checks if a ledger with the given ID exists.
 * @param {LedgerId} id The ID to check.
 * @returns true if the ledger exists; false if it does not.
 */
export function ledgerIdExists(id) {
    if (id < 0 || id >= ledgers.length) {
        return false;
    }
    return ledgers[i] !== undefined;
}

/**
 * Gets all the ledgers matching the given criteria.
 * @param {LedgerCriterion[]} criteria An array of criteria that the ledgers must meet.
 * @returns All the ledgers matching the given criteria.
 */
export function getLedgers(criteria = []) {
    return ledgers
        .filter(obj => obj !== undefined)
        .filter(obj => {
            for (let i = 0; i < criteria.length; ++i) {
                const cond = criteria[i];
                if (!cond(obj)) {
                    return false;
                }
            }
            return true;
        });
}

/**
 * Gets a ledger by its ID.
 * @param {LedgerId} id The ID of the ledger to get.
 * @returns The ledger with the given ID.
 * @throws An error if the ledger does not exist.
 */
export function getLedgerById(id) {
    if (!ledgerIdExists(id)) {
        throw `Ledger does not exist: ${id}}`;
    }
    return ledgers[id];
}

/**
 * Updates the ledger with the given ID.
 * @param {LedgerId} id The ID of the ledger to update.
 * @param {object} updates An object containing the updates to make.
 * @returns true if an update was made; false otherwise.
 * @throws An error if the ledger does not exist.
 */
export function updateLedgerById(id, updates) {
    if (!ledgerIdExists(id)) {
        throw `Ledger does not exist: ${id}}`;
    }

    const ledger = ledgers[id];
    let updated = false;

    if (updates.owner !== undefined) {
        ledger.owner = updates.owner;
        updated = true;
    }

    if (updates.title !== undefined) {
        ledger.title = updates.title;
        updated = true;
    }

    return updated;
}

/**
 * Deletes the ledger with the given ID.
 * @param {LedgerId} id The ID of the ledger to delete.
 * @returns true if the ledger was deleted; false otherwise.
 */
export function deleteLedgerById(id) {
    if (!ledgerIdExists(id)) {
        return false;
    }

    ledgers[id] = undefined;
    return true;
}