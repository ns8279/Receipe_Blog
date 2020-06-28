const router = require('express').Router();
const { Recipe, User, Comment, Ingredient, Category } = require('../models');
const { Op } = require('sequelize');

// router.get('/', (req,res) => {
//     res.render('search');         // search route works
// });

router.get('/:recipe_name', (req,res) => {
    Recipe.findAll({
        limit: 10,
        where: {
            recipe_name: {
                [Op.like]: '%' + req.params.recipe_name + '%'
            }
        },

        attributes: [
            'id',
            'recipe_name',
            'prep_time',
            'cook_time',
            'created_at',
            'items'
        ]

    })
    .then(dbSearchData => {
        const recipes = dbSearchData.map(recipe => recipe.get({ plain: true }));
        res.render('search', { recipes }); 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router;