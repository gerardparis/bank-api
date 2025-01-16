var express = require('express');
var router = express.Router();
var db = require('../database');

router.get("/viewAccounts", async function (req, res, next) {

    try {

        const card = await db.Card.findOne({
            where: { number: req.query.cardNumber },
            include: {
                model: db.Account,
                include: db.Person,
            },
        });

        if (!card) {
            throw new Error('Card not found');
        }

        // TODO verify PIN number

        const personId = card.Account.Person.id;

        // Retrieve all accounts belonging to the person
        const accounts = await db.Account.findAll({
            where: { personId },
        });

        res.status(200).send(JSON.stringify(accounts));
    } catch (error) {
        return next(error);
    }

});

router.get("/viewTransactions", async function (req, res, next) {
    try {

        const card = await db.Card.findOne({
            where: { number: req.query.cardNumber },
            include: {
                model: db.Account,
            },
        });

        if (!card) {
            throw new Error('Card not found');
        }

        // TODO verify PIN number

        // Check if the card is linked to the account with the given IBAN
        const account = await db.Account.findOne({
            where: { iban: req.query.iban, id: card.accountId },
        });
    
        if (!account) {
            throw new Error('No matching account found for the given IBAN and card number');
        }
    
        // Fetch transactions for the account
        const transactions = await db.Transaction.findAll({
            where: { accountId: account.id },
            order: [['createdAt', 'DESC']], // Sort transactions by most recent
        });
  

        res.status(200).send(JSON.stringify(transactions));
    } catch (error) {
        return next(error);
    }
});

router.post("/withdrawMoney", function (req, res) {
    res.send('not implemented');
});

router.post("/depositMoney", function (req, res) {
    res.send('not implemented');
});

router.post("/transferMoney", function (req, res) {
    res.send('not implemented');
});

router.post("/activateCard", function (req, res) {
    res.send('not implemented');
});

router.post("/setPinCode", function (req, res) {
    res.send('not implemented');
});

router.get("/viewMaxCredit", function (req, res) {
    res.send('not implemented');
});

router.post("/setMaxCredit", function (req, res) {
    res.send('not implemented');
});


module.exports = router;