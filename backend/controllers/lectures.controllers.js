const { Course } = require('../models');
const Lectures = require('../models/lecture');

// ref from backend\models\index.js - Associations
// Course.hasMany(Lecture, { foreignKey: 'course_id' });
// Lecture.belongsTo(Course, { foreignKey: 'course_id' });

const getAllLectures = async(req, res) => {
    console.log('Fetching all lectures for course:', req.params.courseId);

    try {
        const {courseId} = req.params;
        const lectures = await Lectures.findAll({where: {course_id: courseId}});
        if (lectures.length === 0) {
            res.status(404).send({ message: 'No lectures found for this course.' });
        }

        res.status(200).send(lectures);
    } catch (error) {
        console.error('Error fetching Lectures:', error);
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
}

const createLectures = async(req, res) => {
    console.log('creating lecture for course:', req.params.courseId);

    try {
        const {courseId} = req.params;
        const { title, video_url, duration } = req.body;

        const findCourse = await Course.findByPk(courseId);
        if (!findCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }  

        const newLecture = await Lectures.create({
            title: title,
            video_url: video_url,
            duration: duration,
            course_id: courseId
        })
        res.status(201).send({ message: 'Lecture created successfully', lecture: newLecture });
    } catch (error) {
        console.error('Error creating Lectures:', error);
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
}

const updateLecture = async(req, res) => {
    console.log('updating lecture for course:', req.params.id);

    try {
        const {id} = req.params;
        const {title, video_url, duration} = req.body;

        const findLecture = await Lectures.findByPk(id);
        if (!findLecture) {
            return res.status(404).json({ message: 'Lecture not found' });
        }

        const update = await Lectures.update({
            title: title,
            video_url: video_url,
            duration: duration
        }, {
            where: { id: id }
        })

        return res.status(200).send({ message: 'Lecture updated successfully', lecture: update });
    } catch (error) {
        console.error('Error while updating Lecture:', error);
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
}


const deleteLecture = async(req, res) => {
    console.log('Deleting lecture for course:', req.params.id);

    try {
        const {id} = req.params;

        const findLecture = await Lectures.findByPk(id);
        if (!findLecture) {
            return res.status(404).json({ message: 'Lecture not found' });
        }

        const update = await Lectures.destroy({where: { id: id }});

        return res.status(200).send({ message: 'Lecture deleted successfully' });
    } catch (error) {
        console.error('Error while deleting Lecture:', error);
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
}

module.exports = {getAllLectures, createLectures, updateLecture, deleteLecture};
