export function toInternalUnits(amount, unit) {
    if (unit === 'USD') {
        return parseInt(amount.replace('.', ''));
    }
    return parseFloat(amount);
}

export function formatUnit(iAmount, unit) {
    if (unit === 'USD') {
        const amount = iAmount / 100;
        return Intl.NumberFormat(
            'en-US', {
                style: 'currency',
                currency: unit
            }
        ).format(amount);
    }

    const amount = iAmount;
    return `${amount} ${unit}`
}