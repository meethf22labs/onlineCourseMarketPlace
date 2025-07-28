const Category = require('../models/category');

const getAllCategories = async(req, res) => {
    console.log('Fetching all categories');
    try {
        const categories = await Category.findAll();
        res.status(200).send(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).send({ message: 'Internal server error', error: error.message });
    }
}

module.exports = { getAllCategories };