var db = require('../database.js');
const helpers = require('../helpers.js');
const { v4: uuidv4 } = require('uuid');

const generateTestData = async () => {
    try {
        await db.sequelize.sync({ force: true }); // Reset database (use cautiously in production)

        // Create Users
        const [user1, user2] = await Promise.all([
            db.Person.create({ name: 'Alice', email: 'alice@example.com' }),
            db.Person.create({ name: 'Bob', email: 'bob@example.com' }),
        ]);

        // Create Accounts for User 1
        const [aliceAccount1, aliceAccount2] = await Promise.all([
            db.Account.create({ iban: `${uuidv4()}`, balance: 1000, personId: user1.id }),
            db.Account.create({ iban: `${uuidv4()}`, balance: 2000, personId: user1.id }),
        ]);

        // Create Accounts for User 2
        const [bobAccount1, bobAccount2] = await Promise.all([
            db.Account.create({ iban: `${uuidv4()}`, balance: 1500, personId: user2.id }),
            db.Account.create({ iban: `${uuidv4()}`, balance: 2500, personId: user2.id }),
        ]);

        // Create Cards
        const [aliceCard, bobCard] = await Promise.all([
            db.Card.create({
                number: '1234567890',
                type: 'credit',
                maxCredit: 5000,
                active: false,
                accountId: aliceAccount1.id, // Linked account
                personId: user1.id,
                hashedPin: helpers.hashPin("1234"),
            }),
            db.Card.create({
                number: '9876543210',
                type: 'debit',
                maxCredit: 3000,
                active: true,
                accountId: bobAccount1.id, // Linked account
                personId: user2.id,
                hashedPin: helpers.hashPin("4321"),
            }),
        ]);

        // Create Transactions for Alice's Accounts
        await Promise.all([
            db.Transaction.create({
                createdAt: new Date(),
                type: 'deposit',
                amount: 500,
                accountId: aliceAccount1.id,
            }),
            db.Transaction.create({
                createdAt: new Date(),
                type: 'withdrawal',
                amount: -300,
                accountId: aliceAccount2.id,
            }),
            db.Transaction.create({
                createdAt: new Date(),
                type: 'transferin',
                amount: 200,
                accountId: aliceAccount2.id,
            }),
            db.Transaction.create({
                createdAt: new Date(),
                type: 'transferout',
                amount: -100,
                accountId: aliceAccount2.id,
            }),
            db.Transaction.create({
                createdAt: new Date(),
                type: 'fee',
                amount: -2,
                accountId: aliceAccount2.id,
            }),
        ]);

        // Create Transactions for Bob's Accounts
        await Promise.all([
            db.Transaction.create({
                createdAt: new Date(),
                type: 'deposit',
                amount: 700,
                accountId: bobAccount1.id,
            }),
            db.Transaction.create({
                createdAt: new Date(),
                type: 'withdrawal',
                amount: -400,
                accountId: bobAccount2.id,
            }),
        ]);

        console.log('Test data generated successfully.');
    } catch (error) {
        console.error('Error generating test data:', error);
    }
};

// Run the test data generation
generateTestData();