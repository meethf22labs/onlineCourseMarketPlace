const Course = require('../models/course');
const Category = require('../models/category');
const { slug } = require('../utils/slugify');

const getAllCourses = async(req, res) => {
    try {
        const courses = await Course.findAll();
        res.status(200).send(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
}

const getCourseById = async(req, res) => {
    try {
        const {id} = req.params;
        const course = await Course.findAll({where: {id: id}});
        if (course.length === 0) {
            return res.status(404).send({ message: 'Course not found' });
        }

        res.status(200).send(course[0]);
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
}

const createCourse = async(req, res) => {
    try {
        const {title, description, price, thumbnail_url, category } = req.body; 
        let categoryExists = await Category.findOne({ where: { name: category } });
        if (!categoryExists) {
            categoryExists = await Category.create({ 
                name: category,
                slug: slug(category), 
            });
        }

        const newCourse = await Course.create({ 
            title: title, 
            description: description, 
            price: price, 
            thumbnail_url: thumbnail_url,
            instructor_id: req.user.id, // attaching from isAuthenticated middleware
            category_id: categoryExists.id // attaching category id
        });
        res.status(201).send(newCourse);
    } catch (error) {
        console.error('Error creating courses:', error);
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
}

const updateCourse = async(req, res) => {
    try {
        const {id} = req.params;
        const {title, description, price, thumbnail_url } = req.body;

        const findCourse = await Course.findAll({where: {id: id}});
        if (findCourse.length === 0) {
            return res.status(404).send({ message: 'Course not found' });
        }

        const updateCourse = await Course.update({
            title: title,
            description: description,
            price: price,
            thumbnail_url: thumbnail_url
        }, {
            where: { id: id }
        });
        res.status(200).send({ message: 'Course updated successfully'});
    } catch (error) {
        console.error('Error while updating course:', error);
        res.status(500).send({ message: 'Internal server error', error: error.message }); 
    }
}

const deleteCOurse = async(req, res) => {
    try {
        const {id} = req.params;
        const findCourse = await Course.findAll({where: {id: id}});
        if (findCourse.length === 0) {
            return res.status(404).send({ message: 'Course not found' });
        }

        const deleteCourse = await Course.destroy({ where: { id: id } });
        res.status(200).send({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error while deleting course:', error);
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
}


module.exports = {getAllCourses, getCourseById, createCourse, updateCourse, deleteCOurse};