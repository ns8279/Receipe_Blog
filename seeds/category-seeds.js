const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Cocktails'
  },
  {
    category_name: 'Desserts'
  },
  {
    category_name: 'Breakfast and Brunch'
  },
  {
    category_name: 'Beverages'
  },
  {
    category_name: 'BBQ and Grilling'
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;