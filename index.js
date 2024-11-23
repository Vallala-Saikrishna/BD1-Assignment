const express = require('express');
const cors = require("cors")



const app = express();
app.use(cors())
const port = 3000;

app.use(express.static('static'));

function calculateTotalCartPrice(newItemPrice, cartTotal) {
  return (newItemPrice + cartTotal).toString();
}
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTotalCartPrice(newItemPrice, cartTotal));
});

function applyDiscountForMembership(cartTotal, isMember) {
  let applyDiscount;
  let discountPercentage = 10;
  if (isMember === 'true') {
    applyDiscount = cartTotal - (cartTotal * discountPercentage) / 100;
    return applyDiscount.toString();
  } else {
    return cartTotal.toString();
  }
}
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember;
  res.send(applyDiscountForMembership(cartTotal, isMember));
});

app.get('/calculate-tax', (req, res) => {
  let taxRate = 5;
  let cartTotal = parseFloat(req.query.cartTotal);
  let calculateTax = cartTotal * (taxRate / 100);
  res.send(calculateTax.toString());
});

function estimateShippingMethod(shippingMethod, distance) {
  if (shippingMethod === 'Standard') {
    return (distance / 50).toString();
  } else {
    return (distance / 100).toString();
  }
}
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(estimateShippingMethod(shippingMethod, distance));
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let lotalityRate = 2;
  let loyalityPoints = purchaseAmount * lotalityRate;
  res.send(loyalityPoints.toString());
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
