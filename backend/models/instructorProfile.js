const {DataTypes} = require('sequelize');
const sequelize = require('./db');

const InstructorProfile = sequelize.define('InstructorProfile', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  bio: { type: DataTypes.TEXT },
  profile_pic_url: { type: DataTypes.STRING },
  expertise: { type: DataTypes.STRING },
}, {
  tableName: 'instructor_profiles',
  timestamps: true,
});

module.exports = InstructorProfile;