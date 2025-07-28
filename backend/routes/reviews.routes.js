const express = require("express");
const router = express.Router();
const { createReview, getReviewsForCourse } = require("../controllers/reviews.controllers");
const isAuthenticated = require("../utils/isAuthenticated");

router.post("/:enrollmentId/reviews", isAuthenticated, createReview);
router.get("/course/:courseId", getReviewsForCourse);

module.exports = router;