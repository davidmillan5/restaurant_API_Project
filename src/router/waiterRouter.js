const { Router } = require('express');
const router = Router();
const orderController = require('../controller/waiterController');

const { verifyTokenWaiter } = require('../middleware/authmiddleware');

router.get('/health', (_, res) => {
  res.send('check');
});

router
  .get('/api/v1/order', verifyTokenWaiter, orderController.getAllOrders)
  .get(
    '/api/v1/order/prepared',
    verifyTokenWaiter,
    orderController.getAllOrdersPrepared
  )
  .get(
    '/api/v1/order/delivered',
    verifyTokenWaiter,
    orderController.getAllOrdersDelivered
  );

router.put(
  '/api/v1/order/:id',
  verifyTokenWaiter,
  orderController.updateOrderById
);

module.exports = router;
