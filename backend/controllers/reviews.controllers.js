const Review = require("../models/review");
const Enrollment = require("../models/enrollment");
const Course = require("../models/course");


const createReview = async (req, res) => {
  console.log("createReview for enrollmentId:", req.params.enrollmentId);
  try {
    const { enrollmentId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id; // attached from isAuthenticated middleware

    const enrollment = await Enrollment.findOne({
      where: { id: enrollmentId, user_id: userId },
    });

    if (!enrollment) {
      return res.status(404).send({ message: "Enrollment not found." });
    }

    if (enrollment.status !== "completed") {
      return res.status(400).send({ message: "You can only review completed courses." });
    }
   
    const existingReview = await Review.findOne({
      where: { enrollment_id: enrollmentId },
    });
    if (existingReview) {
      return res.status(400).send({ message: "Review already exists for this enrollment." });
    }

    const newReview = await Review.create({
      enrollment_id: enrollmentId,
      rating: rating,
      comment: comment,
    });

    return res.status(201).send({ message: "Review created successfully.", review: newReview });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
};


const getReviewsForCourse = async (req, res) => {
  console.log("getReviewsForCourse for courseId:", req.params.courseId);
  try {
    const { courseId } = req.params;

    const reviews = await Review.findAll({
      include: [
        {
          model: Enrollment,
          where: { course_id: courseId },
          include: [{ model: Course, attributes: ["id", "title"] }],
        },
      ],
    });

    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found for this course." });
    }

    return res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { createReview, getReviewsForCourse };
