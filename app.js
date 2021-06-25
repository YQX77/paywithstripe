const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
//require parser and env
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const publishableKey = process.env.STRIPE_PUBLISHABLE_API_KEY;
const secretKey = process.env.STRIPE_PRIVATE_API_KEY;

const stripe = require('stripe')(secretKey);

var app = express();

// view engine setup (Handlebars)
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Home route
 */
app.get('/', function (req, res) {
  res.render('index');
});

/**
 * Checkout route
 */
app.get('/checkout', function (req, res) {
  // Just hardcoding amounts here to avoid using a database
  const item = req.query.item;
  let title, amount, error;

  switch (item) {
    case '1':
      title = "The Art of Doing Science and Engineering"
      amount = 2300
      break;
    case '2':
      title = "The Making of Prince of Persia: Journals 1985-1993"
      amount = 2500
      break;
    case '3':
      title = "Working in Public: The Making and Maintenance of Open Source"
      amount = 2800
      break;
    default:
      // Included in layout view, feel free to assign error
      error = "No item selected"
      break;
  }

  res.render('checkout', {
    item: item,
    title: title,
    amount: amount,
    error: error,
    key: publishableKey
  });
});

/**
 * Create Checkout Session
 */

app.post('/create-checkout-session', async (req, res) => {
  const { amount, title, item } = req.query;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'cad',
          product_data: {
            name: title,
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: `http://localhost:3000/checkout?item=${item}`,
  });
  res.json({ id: session.id });
});

/**
 * Success route
 */
app.get('/success', async function (req, res) {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const customer = await stripe.customers.retrieve(session.customer);
  const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);

  res.render('success', { ...paymentIntent.charges.data[0] });
});

/**
 * Start server
 */
app.listen(3000, () => {
  console.log('Getting served on port 3000');
});
