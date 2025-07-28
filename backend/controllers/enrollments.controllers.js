const Enrollment = require('../models/enrollment');

const createEnrollment = async(req, res) => {
    console.log("createEnrollment with courseId:", req.params.courseId);
    try {
        const courseId = req.params.courseId;
        const userId = req.user.id; // id which was attached by isAuthenticated middleware

        const newEnrollment = await Enrollment.create({
            user_id: userId,
            course_id: courseId,
        });
        return res.status(201).send({message: "Enrollment created successfully.", enrollment: newEnrollment});
    } catch (error) {
        console.error("Error creating enrollment:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}


const getEnrolledCourses = async(req, res) => {
    console.log("getEnrolledCourses for userId:", req.user.id);
    try {
        const userId = req.user.id;
        const enrollments = await Enrollment.findAll({
            where: {user_id: userId},
        });

        if (enrollments.length === 0) {
            return res.status(404).json({message: "No enrolled courses found."});
        }

        return res.status(200).json(enrollments);
    } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const updateEnrollment = async(req, res) => {
    console.log("updateEnrollment for enrollmentId:", req.params.enrollmentId);
    try {
        const enrollmentId = req.params.enrollmentId;
        const { status } = req.body;

        const enrollment = await Enrollment.findByPk(enrollmentId);
        if (!enrollment) {
            return res.status(404).json({message: "Enrollment not found."});
        }

        enrollment.status = status; 
        await enrollment.save();

        return res.status(200).json({message: "Enrollment updated successfully.", enrollment});
    } catch (error) {
        console.error("Error updating enrollment:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = {createEnrollment, getEnrolledCourses, updateEnrollment};