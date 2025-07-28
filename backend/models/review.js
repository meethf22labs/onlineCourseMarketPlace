const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Review = sequelize.define('Review', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rating: { type: DataTypes.INTEGER, allowNull: false },
  comment: { type: DataTypes.TEXT },
}, {
  tableName: 'reviews',
  timestamps: true,
});

module.exports = Review;
