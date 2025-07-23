const express = require('express');
const router = express.Router();
const { createProfile, getMyProfile, updateProfile } = require('../controllers/instructorProfile.controllers');
const isAuthenticated = require('../utils/isAuthenticated');
const checkIfInstructor = require('../utils/isInstructor');

router.get('/me', isAuthenticated, checkIfInstructor, getMyProfile);
router.post('/', isAuthenticated, checkIfInstructor, createProfile);
router.put('/me', isAuthenticated, checkIfInstructor, updateProfile);

module.exports = router;
