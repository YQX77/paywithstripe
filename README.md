# Stripe SA Takehome Project
## Description
This e-commerce application that a customer can use to purchase a book integrates with Stripe Prebuilt Checkout page to accept online payment.
The application is built upon the [Strip SA Takehome Project](https://github.com/mattmitchell6/sa-takehome-project-node) written in Javascript (Node.js) with the Express framework. This project runs locally with Stripe test account.


## Solution Components
This project consist of below elements:
* [Strip SA Takehome Project written in Javascript (Node.js)](https://github.com/mattmitchell6/sa-takehome-project-node)
* [Stripe free test account](https://dashboard.stripe.com/register)
* [Stripe Prebuilt Checkout page](https://stripe.com/docs/checkout/integration-builder) with [Create a Session API](https://stripe.com/docs/api/checkout/sessions)
* [Stripe customize your success page](https://stripe.com/docs/payments/checkout/custom-success-page) with [Retrieve Session ID](https://stripe.com/docs/api/checkout/sessions/retrieve) and [Payment Intents API](https://stripe.com/docs/api/payment_intents)


## Get Started
To get started, clone the repository and run `npm install` to install dependencies:

```
git clone https://github.com/YQX77/paywithstripe.git && cd paywithstripe
npm install
```

Then run the application locally:

```
npm start
```

Navigate to [http://localhost:3000](http://localhost:3000) to view the index page.
