# bank-api

ATM bank API

## System Architecture

### Backend

- Express as web framework
- PostgreSQL database + Sequelize ORM
- Endpoints:
    - viewAccounts
        - GET
        - Params: cardNumber, pinCode
        - Response: list of accounts
    - viewTransactions
        - GET
        - Params: cardNumber, accountNumber, pinCode
        - Response: list of transactions for that account
    - withdrawMoney
        - POST
        - Params: cardNumber, otherEntity, amount, pinCode
        - Response: result (ok or not)
    - depositMoney
        - POST
        - Params: cardNumber, otherEntity, pinCode
        - Response: result (ok or not)
    - transferMoney
        - POST
        - Params: cardNumber, destAccount, amount, pinCode
        - Response: fee, result
    - activateCard
        - POST
        - Params: cardNumber, pinCode
        - Response: result
    - setPinCode
        - POST
        - Params: cardNumber, oldPinCode, newPinCode
        - Response: result
    - viewMaxCredit
        - GET
        - Params: cardNumber, pinCode
        - Response: maxCredit
    - setMaxCredit
        - POST
        - Params: cardNumber, maxCredit, pinCode
        - Response: result
- Database entities:
    - Person
        - Fields: id
    - Card. 
        - Fields: id, number, type, maxCredit, active (boolean)
    - Account. 
        - Fields: id, iban, balance
    - Transaction. 
        - Fields: id, type, amount, timestamps
- Database relationships
    - A Person owns multiple Accounts
    - A Person owns multiple Cards
    - A Card is linked to one Account
    - Transactions are linked to an Account
- Other considerations:
    - Using bcrypt to hash the PIN code (to avoid storing it as plain text)

### Deployment
    Run tests

    ```docker compose run bank-api npm test```

    Start the app:

    ```docker compose up```



