const router = require('express').Router();
const { Recipe, User, Comment, Ingredient, Category } = require('../models');

router.get('/', (req, res) => {
    Recipe.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'recipe_name',
            'prep_time',
            'cook_time',
            'created_at'
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
                // include: {
                //     model: User,
                //     attributes: ['username']
                // }
            }
        ]
    })
        .then(dbRecipeData => {
            const recipes = dbRecipeData.map(recipe => recipe.get({ plain: true }));
            res.render('personal-recipes', { recipes,
                loggedIn: req.session.loggedIn 
            }); 
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;

