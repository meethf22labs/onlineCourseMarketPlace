const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const {slug} = require('../utils/slugify');

const Category = sequelize.define('Category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
}, {
  tableName: 'categories',
  timestamps: true,
});

Category.beforeCreate((category, options) => {
  category.slug = slug(category.name);
});

Category.beforeUpdate((category, options) => {
  category.slug = slug(category.name);
});


module.exports = Category;