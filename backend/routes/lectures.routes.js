const express = require('express');
const router = express.Router({ mergeParams: true }); // to merge courseId from parent route
const {getAllLectures, createLectures, updateLecture, deleteLecture} = require('../controllers/lectures.controllers');
const checkIfInstructor = require('../utils/isInstructor');
const isAuthenticated = require('../utils/isAuthenticated');


router.get('/', getAllLectures);
router.post('/', isAuthenticated, checkIfInstructor, createLectures);
router.put('/:id', isAuthenticated, checkIfInstructor, updateLecture);
router.delete('/:id', isAuthenticated, checkIfInstructor, deleteLecture);

module.exports = router;

