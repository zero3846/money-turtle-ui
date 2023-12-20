import import_data from './private/import_data.js'
import * as model from './model.js'

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
    "increase": importTransaction,
    "decrease": importTransaction,
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

function importAccount([event, accountType, accountName, currency]) {
    model.createAccount(accountName, accountType, currency);
}

function importTransaction([event, accountName, amount, date]) {
    model.transact(event, accountName, amount, date);
}