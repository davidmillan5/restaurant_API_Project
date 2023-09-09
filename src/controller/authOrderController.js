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

exports.getOrderById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await Order.findOne({ where: { id } });
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};
