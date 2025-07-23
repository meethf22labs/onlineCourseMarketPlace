const sequelize = require('./db')
const User = require('./user');
const InstructorProfile = require('./instructorProfile');
const Category = require('./category');
const Course = require('./course');
const Lecture = require('./lecture');
const Enrollment = require('./enrollment');
const Review = require('./review');
const Payment = require('./payment');

User.hasOne(InstructorProfile, { foreignKey: 'user_id' });
InstructorProfile.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Course, { foreignKey: 'instructor_id' });
Course.belongsTo(User, { as: 'instructor', foreignKey: 'instructor_id' });

Category.hasMany(Course, { foreignKey: 'category_id' });
Course.belongsTo(Category, { foreignKey: 'category_id' });

Course.hasMany(Lecture, { foreignKey: 'course_id' });
Lecture.belongsTo(Course, { foreignKey: 'course_id' });

User.hasMany(Enrollment, { foreignKey: 'user_id' });
Enrollment.belongsTo(User, { foreignKey: 'user_id' });

Course.hasMany(Enrollment, { foreignKey: 'course_id' });
Enrollment.belongsTo(Course, { foreignKey: 'course_id' });

Enrollment.hasOne(Review, { foreignKey: 'enrollment_id' });
Review.belongsTo(Enrollment, { foreignKey: 'enrollment_id' });

User.hasMany(Payment, { foreignKey: 'user_id' });
Payment.belongsTo(User, { foreignKey: 'user_id' });

Course.hasMany(Payment, { foreignKey: 'course_id' });
Payment.belongsTo(Course, { foreignKey: 'course_id' });

module.exports = { sequelize, User, InstructorProfile, Category, Course, Lecture, Enrollment, Review, Payment };
