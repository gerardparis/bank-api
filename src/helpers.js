const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const verifyPin = async (cardNumber, inputPin) => {
    try {
      const card = await db.Card.findOne({ where: { number: cardNumber } });
      if (!card) {
        return { success: false, message: 'Card not found' };
      }
  
      const isMatch = await bcrypt.compare(inputPin, card.hashedPin);
      if (isMatch) {
        return { success: true, message: 'PIN is correct' };
      } else {
        return { success: false, message: 'Invalid PIN' };
      }
    } catch (error) {
      console.error('Error verifying PIN:', error);
      throw error;
    }
  };

const hashPin = async (pin) => {
    const hashedPin = await bcrypt.hash(pin, SALT_ROUNDS);
    return hashedPin;
};

module.exports = { verifyPin, hashPin };