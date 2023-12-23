# Create a common header to navigate between pages

The app component should display a header with links to different
page content.

# Create an error popup for failed page requests

When a page request does not work, show a dismissable popup message
stating that something went wrong.

# Create Budget page

Create a page to display the current status of one's monthly and/or
yearly spending and savings goals.

This page should be the home page after login.

# Create Portfolio page

This page focuses on the assets the user owns and their value.

# Compute the total assets, liabilities, and equities

# Introduce concept of ledgers and inventories

The ledger is intended to group accounts by unit. It could be used to
implement inventories, but primarily, it should be group accounts with
the same currency unit.

The main difference between a ledger and an inventory is that a ledger
only supports exactly one currency unit, but an inventory tracks multiple
units of account, which may not be currencies at all. Usually, an 
inventory might imply a highly structured system of accounts that
describe physical locations, but in this application, this is not
necessary.

# Create Total Value page

This page allows the user to view his total value in terms of
assets, liabilities, and equities.

# Implement user authentication

# Implement save/load feature

Though cumbersome, it would be useful to export all the data in a text
format that one can later load by copying and pasting into the UI. This
could be useful while there is still a lack of a data storage solution
and a user authentication.