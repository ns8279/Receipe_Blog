const router = require('express').Router();
const { Recipe, User, Comment, Ingredient, Category } = require('../models');
const { Op } = require('sequelize');

// router.get('/', (req,res) => {
//     res.render('search');         // search route works
// });

router.get('/:recipe_name', (req,res) => {
    Recipe.findOne({
        //limit: 10,
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
            }
  
        ]

    })
    .then(dbSearchData => {
        if (!dbSearchData) {
            res.status(404).json({ message: 'There was no recipe found with this name' });
            return;
        }
        //serialize the data
        const recipe = dbSearchData.get({ plain: true });
        console.log(recipe);

        //pasa data to template
        res.render('search', { recipe });
    })
})

module.exports = router;