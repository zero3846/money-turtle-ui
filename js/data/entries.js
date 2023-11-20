//import { AccountId, LedgerId } from '../data.js'

const entries = []

/**
 * A predicate method unit to test entries if they meet certain conditions.
 * @callback LedgerEntryCriterion
 * @param {LedgerEntry} entry The entry to test.
 */

/**
 * @unitdef {int} LedgerEntryId
 */

export class LedgerEntry {
    /**
     * Creates a new LedgerEntry object.
     * @param {LedgerEntryId} id The ID of the entry.
     * @param {LedgerId} ledgerId The ledger ID of the entry.
     * @param {AccountId} debited The debited account ID.
     * @param {AccountId} credited The credited account ID.
     * @param {int} amount The amount of the entry.
     * @param {string} unit The unit of this entry.
     * @param {Date} date The date of this entry.
     */
    constructor(id, ledgerId, debited, credited, amount, unit, date) {
        this._id = id;
        this._ledgerId = ledgerId;
        this._debited = debited;
        this._credited = credited;
        this._amount = amount;
        this._unit = unit
        this._date = date;
    }

    /**
     * @type {LedgerEntryId}
     */
    get id() { return this._id; }

    /**
     * @type {LedgerId}
     */
    get ledgerId() { return this._ledgerId; }

    /**
     * @type {AccountId}
     */
    get debited() { return this._debited; }

    /**
     * @type {AccountId}
     */
    get credited() { return this._credited; }

    /**
     * @type {int}
     */
    get amount() { return this._amount; }

    /**
     * @type {string}
     */
    get unit() { return this._unit; }

    /**
     * @type {Date}
     */
    get date() { return this._date; }
}

/**
 * Creates a new entry.
 * @param {LedgerId} ledgerId The ledgerId of the entry.
 * @param {AccountId} debited The debited account ID.
 * @param {AccountId} credited The credited account ID.
 * @param {int} amount The amount of the entry.
 * @param {string} unit The unit of the entry.
 * @param {Date} date The date of the entry.
 * @returns {LedgerEntryId} The ID of the new entry.
 */
export function createLedgerEntry(ledgerId, debited, credited, amount, unit, date) {
    const nextId = entries.length;
    const entry = new LedgerEntry(nextId, ledgerId, debited, credited, amount, unit, date);
    entries.push(entry);
    return entry.id;
}

/**
 * Checks if a entry with the given ID exists.
 * @param {LedgerEntryId} id The ID to check.
 * @returns true if the entry exists; false if it does not.
 */
export function ledgerEntryIdExists(id) {
    if (id < 0 || id >= entries.length) {
        return false;
    }
    return entries[i] !== undefined;
}

/**
 * Gets all the entries matching the given criteria.
 * @param {LedgerEntryCriterion[]} criteria An array of criteria that the entries must meet.
 * @returns All the entries matching the given criteria.
 */
export function getLedgerEntries(criteria = []) {
    return entries
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
 * Gets a entry by its ID.
 * @param {LedgerEntryId} id The ID of the entry to get.
 * @returns The entry with the given ID.
 * @throws An error if the entry does not exist.
 */
export function getLedgerEntryById(id) {
    if (!entryIdExists(id)) {
        throw `LedgerEntry does not exist: ${id}}`;
    }
    return entries[id];
}

/**
 * Updates the entry with the given ID.
 * @param {LedgerEntryId} id The ID of the entry to update.
 * @param {object} updates An object containing the updates to make.
 * @returns true if an update was made; false otherwise.
 * @throws An error if the entry does not exist.
 */
export function updateLedgerEntryById(id, updates) {
    if (!entryIdExists(id)) {
        throw `LedgerEntry does not exist: ${id}}`;
    }

    const entry = entries[id];
    let updated = false;

    if (updates.ledgerId !== undefined) {
        entry.ledgerId = updates.ledgerId;
        updated = true;
    }

    if (updates.amount !== undefined) {
        entry.amount = updates.amount;
        updated = true;
    }

    if (updates.debited !== undefined) {
        entry.debited = updates.debited;
        updated = true;
    }

    if (updates.credited !== undefined) {
        entry.credited = updates.credited;
        updated = true;
    }

    if (updates.unit !== undefined) {
        entry.unit = updates.unit;
        updated = true;
    }

    if (updates.date !== undefined) {
        entry.date = updates.date;
        updated = true;
    }

    return updated;
}

/**
 * Deletes the entry with the given ID.
 * @param {LedgerEntryId} id The ID of the entry to delete.
 * @returns true if the entry was deleted; false otherwise.
 */
export function deleteLedgerEntryById(id) {
    if (!entryIdExists(id)) {
        return false;
    }

    entries[id] = undefined;
    return true;
}