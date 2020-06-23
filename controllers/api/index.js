const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const recipeRoutes = require('./recipe-routes.js');
const commentRoutes = require('./comment-routes.js');
const ingredientRoutes = require('./ingredient-routes.js');
const categoryRoutes = require('./category-routes.js');

router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/comments', commentRoutes);
router.use('/ingredients', ingredientRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;