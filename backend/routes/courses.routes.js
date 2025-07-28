const express = require('express');
const router = express.Router();
const { getAllCourses, getCourseById, createCourse, updateCourse, deleteCOurse } = require('../controllers/course.controllers');
const isAuthenticated = require('../utils/isAuthenticated');
const checkIfInstructor = require('../utils/isInstructor');


router.get('/', getAllCourses);          
router.get('/:id', getCourseById);       
router.post('/', isAuthenticated, checkIfInstructor, createCourse);
router.put('/:id', isAuthenticated, checkIfInstructor, updateCourse);
router.delete('/:id', isAuthenticated, checkIfInstructor, deleteCOurse);

module.exports = router;
