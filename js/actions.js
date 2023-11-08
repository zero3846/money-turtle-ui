const validEntryTypes = new Set();
validEntryTypes.add("debit");
validEntryTypes.add("credit");

const validActions = new Set();
validActions.add("pay");
validActions.add("repay");
validActions.add("refund");
validActions.add("earn");
validActions.add("incur");
validActions.add("borrow");
validActions.add("lend");
validActions.add("transfer");
validActions.add("allocate");
validActions.add("refinance");

export function makeError(message) {
    return {
        objectType: "error",
        message: message
    };
}

export function makeEntry(entryType, account, amount, unit, date) {
    if (!validEntryTypes.has(entryType)) {
        return makeError(`Invalid entry type: ${entryType}`);
    }

    return {
        objectType: "entry",
        entryType: entryType,
        account: account,
        amount: amount,
        unit: unit,
        date: date
    };
}

export function makeAccountBalance(account, unit) {
    if (!account) {
        return makeError(`Account is missing.`);
    }

    if (!unit) {
        return makeError(`Unit is missing.`);
    }

    return {
        objectType: "account-balance",
        account: account,
        unit: unit,
        debit: 0,
        credit: 0
    }
}

export function makeAction(action, data) {
    if (!validActions.has(action)) {
        return makeError(`Invalid action: ${entryType}`);
    }

    // Amount can be zero, so do explicit check for undefined/null.
    if (data.amount === undefined || data.amount === null) {
        return makeError(`Amount is missing.`);
    }

    if (!data.unit) {
        return makeError(`Unit is missing.`);
    }

    if (!(data.date instanceof Date)) {
        return makeError(`Invalid date: ${data.date}`);
    }

    return {
        ...data,
        objectType: "action",
        action: action
    };
}

export function produceAllEntries(actionObjs = []) {
    return actionObjs.flatMap(obj => produceEntries(obj));
}

export function produceEntries(actionObj) {
    const {
        objectType, action,
        amount, unit, date,
        from, to
    } = actionObj;

    if (objectType !== "action") {
        return [ makeError(`Invalid object type: ${action}`) ];
    }

    const creditFrom = () => [
        makeEntry("credit", from, amount, unit, date),
        makeEntry("debit", to, amount, unit, date)
    ];

    const debitFrom = () => [
        makeEntry("debit", from, amount, unit, date),
        makeEntry("credit", to, amount, unit, date)
    ];

    switch (action) {
        // Make a payment for a good or service.
        case "pay": return creditFrom();

        // Repay a credit card or loan.
        case "repay": return creditFrom();

        // Get a refund for some payment, fee, or interest.
        case "refund": return debitFrom();

        // Earn income or interest.
        case "earn": return creditFrom();

        // Incur a fee, penalty, or interest.
        case "incur": return creditFrom();

        // Borrow money.
        case "borrow": return creditFrom();

        // Lend money.
        case "lend": return debitFrom();

        // Transfer assets.
        case "transfer": return creditFrom();

        // Allocate budgets.
        case "allocate": return debitFrom();

        // Refinance debt.
        case "refinance": return debitFrom();
    }

    return [ makeError(`Invalid action: ${action}`) ];
}

export function produceBalances(entries = []) {
    const balances = [];
    const index = new Map();

    for (let i = 0; i < entries.length; ++i) {
        const entry = entries[i];

        if (entry.objectType !== "entry") {
            continue;
        }

        const account = entry.account;
        const unit = entry.unit;
        const key = `${account} + ${unit}`;

        if (!index.has(key)) {
            index.set(key, balances.length);
            balances.push(makeAccountBalance(account, unit));
        }

        const balance = balances[index.get(key)];
        const entryType = entry.entryType;

        balance[entryType] += entry.amount;
    }

    return balances;
}