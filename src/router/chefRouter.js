const { Router } = require('express');
const router = Router();
const orderController = require('../controller/chefController');

const { verifyTokenChef } = require('../middleware/authmiddleware');

router.get('/health', (_, res) => {
  res.send('check');
});

router
  .get('/api/v1/order', verifyTokenChef, orderController.getAllOrders)
  .get('/api/v1/order/ordered', verifyTokenChef, orderController.getAllOrdersOrdered)
  .get('/api/v1/order/prepared', verifyTokenChef, orderController.getAllOrdersPrepared)
  .get('/api/v1/order/preparing', verifyTokenChef, orderController.getAllOrdersPreparing);

router.put('/api/v1/order/:id', verifyTokenChef, orderController.updateOrderById);

module.exports = router;
