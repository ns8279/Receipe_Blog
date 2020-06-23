// const router = require('express').Router();
// const { Recipe, User, Comment, Ingredient, Category } = require('../models');
// const sequelize = require('../../config/connection');
// const withAuth = require('../../utils/auth');

// router.get('/', withAuth, (req, res) => {
//     Recipe.findAll({
//             where: {
//                 user_id: req.session.user_id
//             },
//             attributes: [
//                 'id',
//                 'title',
//                 'recipe_name',
//                 'prep_time',
//                 'cook_time',
//                 'recipte_method',
//                 'pic',
//                 'created_at'
//             ],
//             include: [{
//                     model: Ingredient,
//                     attributes: [
//                         'id',
//                         'recipe_id',
//                         'ingredient_name',
//                         'quantity'
//                     ]
//                 },
//                 {
//                     model: Category,
//                     attributes: [
//                         'id',
//                         'Category_name'
//                     ]
//                 },
//                 {
//                     model: Comment,
//                     attributes: [
//                         'id',
//                         'comment_text',
//                         'user_id',
//                         'recipe_id'
//                     ],
//                     include: {
//                         model: User,
//                         attributes: ['username']
//                     }
//                 },
//                 {
//                     model: User,
//                     attributes: ['username']
//                 }
//             ]
//         })
//         .then(dbRecipeData => {
//             const recipes = dbRecipeData.map(post => post.get({ plain: true }));
//             res.render('dashboard', { recipes, loggedIn: true });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

// router.get('/edit/:id', withAuth, (req, res) => {
//     Recipe.findOne({
//             where: {
//                 id: req.params.id
//             },
//             attributes: [
//                 'id',
//                 'title',
//                 'recipe_name',
//                 'prep_time',
//                 'cook_time',
//                 'recipte_method',
//                 'pic',
//                 'created_at'
//             ],
//             include: [{
//                     model: User,
//                     attributes: ['username']
//                 },
//                 {
//                     model: Ingredient,
//                     attributes: [
//                         'id',
//                         'recipe_id',
//                         'ingredient_name',
//                         'quantity'
//                     ]
//                 },
//                 {
//                     model: Category,
//                     attributes: [
//                         'id',
//                         'Category_name'
//                     ]
//                 },
//                 {
//                     model: Comment,
//                     attributes: [
//                         'id',
//                         'comment_text',
//                         'user_id',
//                         'recipe_id'
//                     ],
//                     include: {
//                         model: User,
//                         attributes: ['username']
//                     }
//                 },
//             ]
//         })
//         .then(dbRecipeData => {
//             if (!dbRecipeData) {
//                 res.status(404).json({ message: 'There was no recipe found with this id' });
//                 return;
//             }
//             const recipe = dbRecipeData.get({ plain: true });
//             res.render('edit-recipe', { post, loggedIn: true });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

// router.get('/new', (req, res) => {
//     res.render('new-recipe');
// });

// module.exports = router;