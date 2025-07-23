const express = require('express');
const router = express.Router();
const {getAllCourses, getCourseById, createCourse, updateCourse, deleteCOurse} = require('../controllers/course.controllers');


router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/', createCourse); 
router.put('/:id', updateCourse);
router.delete('/:id', deleteCOurse);

module.exports = router;