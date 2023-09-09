const Order = require('../model/order');

exports.createOrder = async (req, res, next) => {
  try {
    const order = await Order.create({
      client: req.body.client,
      date: Date.now,
      product: req.body.product,
      quantity: req.body.quantity,
      specs: req.body.specs,
      status: 'ordered',
    });
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};
