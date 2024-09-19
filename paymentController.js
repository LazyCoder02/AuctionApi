const stripe = require("stripe")(/* your Stripe security key*/);

exports.createPaymentSession = async (req, res) => {
  const { success_url, priceID, quantity } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      success_url: success_url,
      line_items: [
        {
          price: priceID,
          quantity: quantity,
        },
      ],
      mode: 'payment',
    });

    res.json({ url: session.url })
  } catch (error) {
    res.status(500).send({ error: errormessage });
  }
};
