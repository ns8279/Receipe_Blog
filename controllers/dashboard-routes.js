const router = require('express').Router();
const { Recipe, User, Comment, Ingredient, Category } = require('../models');
const withAuth = require('../utils/auth.js')

router.get('/', withAuth, (req, res) => {
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

//==========edit recipe===============================================================
router.get('/edit/:id', withAuth, (req,res) => {
    Recipe.findOne({
        where: {
            id: req.params.id
        },

        attributes: ['id', 'recipe_method', 'recipe_name', 'created_at'],

        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'recipe_id', 'user_id', 'created_at'],
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
        if(!dbRecipeData) {
            res.status(404).json({ message: 'No recipes found with this id '});
            return
        }
        //serialize the data
        const recipe = dbRecipeData.get({ plain: true });

        //pass data to the template
        res.render('edit-recipes', { 
            recipe,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

})


module.exports = router;

