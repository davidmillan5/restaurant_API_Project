const { Router } = require('express');
const router = Router();
const orderController = require('../controller/cashierController');

const { verifyTokenCashier } = require('../middleware/authmiddleware');

router.get('/health', (_, res) => {
  res.send('check');
});

router
  .post('/api/v1/order', verifyTokenCashier, orderController.createOrder);

  module.exports = router;