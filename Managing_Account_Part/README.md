# Wallet-Bank APP
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)

## Overview

Wallet-Bank is a banking application designed to help users manage their accounts efficiently. It provides features such as displaying account balances, transaction summaries, making transfers between accounts, and requesting loans.

## Data

Wallet-Bank utilizes different data structures to store user account information, including account owners, transaction movements, interest rates, PINs, movement dates, currencies, and locales. Each account object contains the following properties:

- `owner`: Name of the account owner
- `movements`: Array of transaction movements
- `interestRate`: Interest rate for the account
- `pin`: Personal Identification Number for account access
- `movementsDates`: Array containing dates for each transaction movement
- `currency`: Currency type of the account
- `locale`: Locale information for the account

## Functionality

### Display Movements

The `displayMovements` function renders transaction movements dynamically on the user interface. It allows sorting of movements in ascending or descending order based on user preference.

### Create Usernames

The `createUsernames` function generates usernames for each account owner based on their names.

### Calculate and Display Balance Summary

Functions such as `calcDisplayBalance` and `calcDisplaySummary` calculate and display account balance, total deposits, total withdrawals, and accumulated interest on the user interface.

### Login and Account Management

The application allows users to log in using their usernames and PINs. Upon successful login, users can view their account details, make transfers, request loans, and close their accounts.

### Account Manipulation

Users can transfer funds between accounts, request loans if eligible, and close their accounts. These actions are handled securely with appropriate validations.

## Additional Features

- Random Number Generation: The application generates random numbers for various purposes, such as PIN creation and transaction amounts.
- Array Manipulation: Various array methods are used to filter, map, and reduce transaction data for analysis and display.
- Date Handling: Dates are parsed, formatted, and displayed to provide users with clear transaction information.
- Numeric Separators: Numeric separators improve readability of large numbers, such as transaction amounts and account balances.

## Future Enhancements

- User Authentication: Implement more secure authentication methods, such as two-factor authentication, for enhanced account security.
- Transaction Categories: Introduce categories for transactions to allow users to track their spending habits more effectively.
- Graphical Representation: Enhance the user interface with graphical representations, such as charts and graphs, to visualize account activities and trends.

---

**Note:** This README provides an overview of the Wallet-Bank application and its features. For detailed implementation and code documentation, refer to the source code.
