const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/postgresql');

class User extends Model {}

User.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING },
    token: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

module.exports = User;
