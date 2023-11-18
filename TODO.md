# Transactions and Ledger Entries

A transaction is simply a transfer of value. It tracks the movement
of value going into an account or out from it.

All amounts on a transaction must be positive.

A transaction can either be a debit or a credit. A debit transaction
represents value that is transferred to you. A credit transaction
represents value that is transferred to someone else. Note that these
definitions apply even in the case of debt (not "debit"), this still
applies, since debt is simply an obligation to provide value in the
future.

To ensure that the ledger is always balanced, every transaction must be
recorded in pairs: one credit and one debit, both with the same amount
but on different accounts. These pairs will be called ledger entries.

A ledger entry will contain at least the following fields. They will be
required.

- debited: The account that is debited.
- credited: The account that is credited.
- amount: The amount transacted.
- unit: The unit of account for the amount.
- date: The date the transaction occurred.

# Accounts

Accounts are names associated with a balance. A balance is simply the
sum total of all debits under an account versus the sum total of all
the credits under the same account.

An account may represent another account on another ledger somewhere,
or it may be an account that is private to you. For example, it could
be your bank account, a loan, a credit card, or it could be your
budget spending funds. It could also be just a number tracking your
total income.

Generally speaking, accounts fall into three categories:
- Assets
- Liabilities
- Equities

Assets tracks value that you own. Liabilities track value that you may
or are liable to pay, and equity is what's leftover after you've
subtracted all your liabilities from your assets. Note that this is not
equity that you own, like with stocks. This is equity that you generate.

Assets can be:
- Checking accounts
- Savings accounts
- Funds
- Cash
- Money owed to you

Liabilities can be:
- Credit cards
- Loans
- Risk
- Dividends
- Money you owe

Equities can be:
- Income Earned
- Sales
- Gifts/Donations
- Capital Gains/Losses

The balance of an asset is calculated as the total debit minus the total
credit. For liabilities and equities, it is the total credit minus the
total debit.

To make sure that all your accounts balance each other they must balance
according to the accounting equation:

    assets = liabilities + equities

# Actions

Actions are collections of ledger entries that track more complex
transactions over time. Bank transfers, deliveries, loan payments,
bills, etc are all things that happen over time, and it is useful to keep
track of the delay, or it is at least useful to group the transactions
together.

# Database Schema

## Table ledgers

- id auto
- title
- owner

## Table accounts

- id auto
- ledger_id ledgers.id
- name string
- type string
- description string

## Table entries

- id auto
- ledger_id ledgers.id
- debited accounts.id
- credited accounts.id
- amount number
- unit string
- date timestamp

## Table actions

- id auto
- type string

## Table action_entries

- action_id actions.id
- entry_id entries.id