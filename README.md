# bank-api

ATM bank API

## System Architecture

### Backend

- Express as web framework
- PostgreSQL database
- Endpoints:
    - viewAccounts. 
        - GET
        - Params: cardNumber
        - Response: list of accounts
    - viewTransactions. 
        - GET
        - Params: cardNumber, accountNumber
        - Response: list of transactions for that account
    - withdrawMoney.
        - POST
        - Params: cardNumber, otherEntity, amount
        - Response: result (ok or not)
    - depositMoney.
        - POST
        - Params: cardNumber, otherEntity
        - Response: result (ok or not)
    - transferMoney. 
        - POST
        - Params: cardNumber, destAccount, amount
        - Response: fee, result
    - activateCard. 
        - POST
        - Params: cardNumber
        - Response: result
    - setPinCode. 
        - POST
        - Params: cardNumber, newPin
        - Response: result
    - viewMaxCredit. 
        - GET
        - Params: cardNumber
        - Response: maxCredit
    - setMaxCredit. 
        - POST
        - Params: cardNumber, maxCredit
        - Response: result
- Database entities:
    - cards. Fields: number, type, maxCredit, linkedAccount, active
    - accounts. Fields: iban, balance
    - transactions. Fields: createdAt, type, amount




