const { Router } = require('express');
const router = Router();
const orderController = require('../../orderController');
const BASE = '/api/v1/products';

const { verifyTokenAdmin } = require('../middleware/authmiddleware');

router.get('/health', (_, res) => {
  res.send('check');
});

router
  .get('/api/v1/products', verifyTokenAdmin, orderController.getAllOrders)
  .post('/api/v1/products', verifyTokenAdmin, orderController.createOrder);

router
  .get('/api/v1/products/:id', verifyTokenAdmin, orderController.getOrderById)
  .put(
    '/api/v1/products/:id',
    verifyTokenAdmin,
    orderController.updateOrderById
  )
  .delete(
    '/api/v1/products/:id',
    verifyTokenAdmin,
    orderController.deleteOrderById
  );

module.exports = router;
