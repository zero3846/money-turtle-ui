export class Quantity {
    constructor() {
        this.amountsByUnit = new Map();
    }

    add(amount, unit) {
        if (amount instanceof Quantity && unit === undefined) {
            const qty = amount;
            this.addQuantity(qty);
        }

        if (!this.amountsByUnit.has(unit)) {
            this.amountsByUnit.set(unit, 0);
        }
        const sum = this.amountsByUnit.get(unit);
        this.amountsByUnit.set(unit, sum + amount);
    }

    addQuantity(qty) {
        qty.amountsByUnit.forEach((amount, unit) => {
            this.add(amount, unit);
        });
    }

    subtract(amount, unit) {
        if (amount instanceof Quantity && unit === undefined) {
            const qty = amount;
            this.subtractQuantity(qty);
        }

        this.add(-amount, unit);
    }

    subtractQuantity(qty) {
        qty.amountsByUnit.forEach((amount, unit) => {
            this.subtract(amount, unit);
        });
    }

    getAmount(unit) {
        return this.amountsByUnit.has(unit)
            ? this.amountsByUnit.get(unit)
            : 0;
    }

    entries() {
        return Array.from(this.amountsByUnit.entries());
    }
}