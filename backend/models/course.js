const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Course = sequelize.define('Course', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
  thumbnail_url: { type: DataTypes.STRING },
}, {
  tableName: 'courses',
  timestamps: true,
});

module.exports = Course;
