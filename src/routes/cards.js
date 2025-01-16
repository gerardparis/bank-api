var express = require('express');
var router = express.Router();
var db = require('../database');

router.get("/viewAccounts", async function (req, res) {

    try {
        const card = await db.Card.findOne({
            where: { number: req.body.cardNumber },
            include: {
                model: db.Account,
                include: db.Person, // Include the person to fetch all accounts they own
            },
        });

        if (!card) {
            throw new Error('Card not found');

        }

        const personId = card.Account.Person.id;

        // Retrieve all accounts belonging to the person
        const accounts = await db.Account.findAll({
            where: { personId },
        });

        res.status(200).send(JSON.stringify(accounts));
    } catch (error) {
        res.status(500).send(error);
    }

});

router.get("/viewTransactions", function (req, res) {
    res.send('not implemented');
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