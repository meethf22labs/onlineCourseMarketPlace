const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Payment = sequelize.define('Payment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'payments',
  timestamps: true,
});

module.exports = Payment;
