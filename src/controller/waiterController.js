const Order = require('../model/order');

exports.getAllOrders = async (req, res, next) => {
  const { offset, limit } = req.query;
  try {
    const order = await Order.findAll({
      offset,
      limit,
    });
    res.json(order);
  } catch (error) {
    next(error);
  }
};

exports.getAllOrdersPrepared = async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        status: 'prepared',
      },
    });
    res.json(order);
  } catch (error) {
    next(error);
  }
};

exports.getAllOrdersDelivered = async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        status: 'delivered',
      },
    });
    res.json(order);
  } catch (error) {
    next(error);
  }
};

exports.updateOrderById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await Order.update(req.body, {
      returning: true,
      where: {
        id,
      },
    });
    res.json(order);
  } catch (error) {
    next(error);
  }
};