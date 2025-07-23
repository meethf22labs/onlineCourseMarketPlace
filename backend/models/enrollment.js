const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Enrollment = sequelize.define('Enrollment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  staus: {
    type: DataTypes.ENUM('in_progress', 'completed'),
    defaultValue: 'in_progress',
  }
}, {
  tableName: 'enrollments',
  timestamps: true,
});

module.exports = Enrollment;
