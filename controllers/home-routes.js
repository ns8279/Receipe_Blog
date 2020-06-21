const router = require('express').Router();
const sequelize = require('../config/connection');
const { Recipe, User, Comment, Ingredient, Category } = require('../models');

router.get('/', (req, res) => {
    Recipe.findAll({
            attributes: [
                'id',
                'title',
                'recipe_name',
                'prep_time',
                'cook_time',
                'recipte_method',
                'pic',
                'created_at'
            ],
            include: [{
                    model: Ingredient,
                    attributes: [
                        'id',
                        'recipe_id',
                        'ingredient_name',
                        'quantity'
                    ]
                },
                {
                    model: Category,
                    attributes: [
                        'id',
                        'Category_name'
                    ]
                },
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'user_id',
                        'recipe_id'
                    ],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbRecipeData => {
            const recipes = dbRecipeData.map(post => post.get({ plain: true }));
            res.render('homepage', { posts, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/recipe/:id', (req, res) => {
    Recipe.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'recipe_name',
                'prep_time',
                'cook_time',
                'recipte_method',
                'pic',
                'created_at'
            ],
            include: [{
                    model: Ingredient,
                    attributes: [
                        'id',
                        'recipe_id',
                        'ingredient_name',
                        'quantity'
                    ]
                },
                {
                    model: Category,
                    attributes: [
                        'id',
                        'Category_name'
                    ]
                },
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'user_id',
                        'recipe_id'
                    ],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbRecipeData => {
            if (!dbRecipeData) {
                res.status(404).json({ message: 'There was no recipe found with this id' });
                return;
            }
            const recipe = dbRecipeData.get({ plain: true });
            console.log(recipe);
            res.render('single-recipe', { recipe, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/recipe-comments', (req, res) => {
    Recipe.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'recipe_name',
                'prep_time',
                'cook_time',
                'recipte_method',
                'pic',
                'created_at'
            ],
            include: [{
                    model: Ingredient,
                    attributes: [
                        'id',
                        'recipe_id',
                        'ingredient_name',
                        'quantity'
                    ]
                },
                {
                    model: Category,
                    attributes: [
                        'id',
                        'Category_name'
                    ]
                },
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'user_id',
                        'recipe_id'
                    ],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbRecipeData => {
            if (!dbRecipeData) {
                res.status(404).json({ message: 'There was no recipe found with this id' });
                return;
            }
            const recipe = dbRecipeData.get({ plain: true });
            res.render('recipe-comments', { recipe, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;