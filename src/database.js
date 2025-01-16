const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = new Sequelize(process.env.DB_SCHEMA || 'postgres',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        dialectOptions: {
            ssl: process.env.DB_SSL == "true"
        }
    });

// Person Model
const Person = sequelize.define('Person', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt
});

// Account Model
const Account = sequelize.define('Account', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    iban: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    balance: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
}, {
    timestamps: true,
});

// Card Model
const Card = sequelize.define('Card', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    maxCredit: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    hashedPin: { // sensitive information
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

// Hook to hash PIN before saving a card
Card.beforeCreate(async (card) => {
  if (card.hashedPin) {
    card.hashedPin = await bcrypt.hash(card.hashedPin, 10); // Hash the PIN with a salt factor of 10
  }
});

Card.beforeUpdate(async (card) => {
  if (card.changed('hashedPin')) {
    card.hashedPin = await bcrypt.hash(card.hashedPin, 10); // Rehash the PIN if it has changed
  }
});


// Transaction Model
const Transaction = sequelize.define('Transaction', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
}, {
    timestamps: true,
});

// Relationships
// A Person owns multiple Accounts
Person.hasMany(Account, { foreignKey: 'personId' });
Account.belongsTo(Person, { foreignKey: 'personId' });

// A Person owns multiple Cards
Person.hasMany(Card, { foreignKey: 'personId' });
Card.belongsTo(Person, { foreignKey: 'personId' });

// A Card is linked to one Account
Card.belongsTo(Account, { foreignKey: 'accountId' });
Account.hasMany(Card, { foreignKey: 'accountId' });

// Transactions are linked to an Account
Transaction.belongsTo(Account, { foreignKey: 'accountId' });
Account.hasMany(Transaction, { foreignKey: 'accountId' });



module.exports = {
    sequelize: sequelize,
    Person: Person,
    Account: Account,
    Card: Card,
    Transaction: Transaction
};