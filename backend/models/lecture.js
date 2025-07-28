const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Lecture = sequelize.define('Lecture', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  video_url: { type: DataTypes.STRING },
  duration: { type: DataTypes.INTEGER },
  course_id: {
  type: DataTypes.INTEGER,
  allowNull: false,
} // I am explicity defining the foreign key, also mentioned in the associations - but for clarity i am mentioning it here, not necessary(will sync automatically as the col name is same in model & associations)
}, {
  tableName: 'lectures',
  timestamps: true,
});

module.exports = Lecture;
