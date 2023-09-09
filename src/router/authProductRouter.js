const express = require('express'),
  router = express.Router(),
  authOrderController = require('../controller/authOrderController'),
  { verifyToken } = require('../middleware/authmiddleware');

router.get('/health', (_, res) => {
  res.send('check');
});

router.get('/health', (_, res) => {
  res.send('check');
});

router.get('/api/v1/products', verifyToken, authOrderController.getAllOrders);
router.get(
  '/api/v1/products/:id',
  verifyToken,
  authOrderController.getOrderById
);

module.exports = router;
