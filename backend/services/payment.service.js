// payment.service.js
const stripe = require('stripe')(require('../config/app.config').STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (amount, currency = 'usd') => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
    });
    return paymentIntent;
  } catch (error) {
    throw new Error('Payment processing failed');
  }
};
