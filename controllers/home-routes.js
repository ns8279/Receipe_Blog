const router = require('express').Router();
const sequelize = require('../config/connection');
const { Recipe, User, Comment, Ingredient, Category } = require('../models');
const withAuth = require('../utils/auth.js');



router.get('/', (req, res) => {
    Recipe.findAll({
        attributes: [
            'id',
            'recipe_name',
            'prep_time',
            'cook_time',
            'created_at',
            'items'
        ],
        include: [{
                model: User,
                attributes: ['username']
            },
            {
                model: Category,
                attributes: ['category_name']
            },
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'recipe_id',
                    'user_id',
                    'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: Ingredient,
                attributes: [
                    'id',
                    'recipe_id',
                    'ingredient_name',
                    'quantity',
                    'created_at'
                ],

            }
        ]
    })
        .then(dbRecipeData => {
            const recipes = dbRecipeData.map(recipe => recipe.get({ plain: true }));
            res.render('homepage', { recipes,
                loggedIn: req.session.loggedIn 
            }); 
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    console.log(req.session);
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/recipe/:id', (req, res) => {
    Recipe.findOne({
          where:{
              id: req.params.id
          },
           attributes: [
            'id',
            'recipe_name',
            'prep_time',
            'cook_time',
            'created_at',
            'items'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },

            {
                model: Category,
                attributes: ['category_name']
            },

            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'recipe_id',
                    'user_id',
                    'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },

            {
                model: Ingredient,
                attributes: [
                    'id',
                    'recipe_id',
                    'ingredient_name',
                    'quantity',
                    'created_at'
                ],
                
            }
        ]
    })
        .then(dbRecipeData => {
            if (!dbRecipeData) {
                res.status(404).json({ message: 'There was no recipe found with this id' });
                return;
            }
            //serialize the data
            const recipe = dbRecipeData.get({ plain: true });
            console.log(recipe);

            //pasa data to template
            res.render('single-recipe', { recipe, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/recipes/:id', (req, res) => {
    Recipe.findOne({
          where:{
              id: req.params.id,
              //recipe_method: recipeArr
          },
           attributes: [
            'id',
            'recipe_name',
            'recipe_method',
            'prep_time',
            'cook_time',
            'created_at',
            'total_calories',
            'items'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },

            {
                model: Category,
                attributes: ['category_name']
            },

            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'recipe_id',
                    'user_id',
                    'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },

            {
                model: Ingredient,
                attributes: [
                    'id',
                    'recipe_id',
                    'ingredient_name',
                    'quantity',
                    'created_at'
                ],
                
            }
        ]
    })
        .then(dbRecipeData => {
            if (!dbRecipeData) {
                res.status(404).json({ message: 'There was no recipe found with this id' });
                return;
            }
            //serialize the data
            const recipe = dbRecipeData.get({ plain: true });
            console.log(recipe);

            //pasa data to template
            res.render('recipe', { recipe, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;