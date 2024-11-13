const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Initialize Stripe with your secret key
const stripe = Stripe('sk_test_51QKAMSRwpFn0SlpkhDybePEH5n3pFa3AxdLu4Ncz6zZ6VIS2DLaRw0tbKkBLvWVizv74SkDTZ2q78pTFIyLIgkPf009YWjI69r'); // Replace with your Stripe secret key

app.use(cors());
app.use(express.json());

// Endpoint to create a payment session
app.post('/api/create-checkout-session', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency || 'usd',
            product_data: {
              name: 'Sample Product',
              description: 'Description of the product',
            },
            unit_amount: amount * 100, // Stripe expects amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success', // Redirect after successful payment
      cancel_url: 'http://localhost:3000/cancel',   // Redirect if user cancels payment
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    res.status(500).json({ error: 'Failed to create Stripe checkout session' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
