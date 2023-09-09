const Order = require('./src/model/order');

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

exports.createOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
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

exports.deleteOrderById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await Order.destroy({ where: { id } });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
