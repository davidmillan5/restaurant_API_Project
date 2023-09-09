const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/postgresql');

class Order extends Model {}

Order.init(
  {
    client: { type: DataTypes.STRING, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    product: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    specs: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: 'Order',
  }
);

module.exports = Order;
