const bcrypt = require('bcrypt');

const verifyPin = async (cardNumber, inputPin) => {
    try {
      const card = await Card.findOne({ where: { number: cardNumber } });
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

  module.exports = { verifyPin };