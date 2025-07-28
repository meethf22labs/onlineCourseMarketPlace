const express = require("express");
const router = express.Router();
const {createEnrollment, getEnrolledCourses, updateEnrollment} = require("../controllers/enrollments.controllers");
const inAuthenticated = require('../utils/isAuthenticated');

router.post("/:courseId/enroll", inAuthenticated, createEnrollment);
router.get("/", inAuthenticated, getEnrolledCourses);
router.put("/:enrollmentId", inAuthenticated, updateEnrollment);
module.exports = router;