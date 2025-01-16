# bank-api

ATM bank API

## System Architecture

### Backend

- Express as web framework
- PostgreSQL database
- Endpoints:
    - viewAccounts. Params: cardNumber
    - viewTransactions. Params: cardNumber, accountNumber
    - withdrawMoney. Params: cardNumber, otherEntity, amount
    - depositMoney. Params: cardNumber, otherEntity
    - transferMoney. Params: cardNumber, destAccount, amount
    - activateCard. Params: cardNumber
    - setPinCode. Params: cardNumber, newPin
    - viewMaxCredit. Params: cardNumber
    - setMaxCredit. Params: cardNumber, maxCredit
- Database entities:
    - cards. Fields: number, type, maxCredit, linkedAccount, active
    - accounts. Fields: iban, balance
    - transactions. Fields: createdAt, type, amount




