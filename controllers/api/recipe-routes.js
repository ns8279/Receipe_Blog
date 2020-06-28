const router = require('express').Router();
const { Recipe, User, Comment, Ingredient } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

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
            order: [
                ['created_at', 'DESC']
            ],
            include: [{
                    model: User,
                    attributes: ['username']
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
        .then(dbRecipeData => res.json(dbRecipeData.reverse()))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Recipe.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                //'title',
                'recipe_name',
                'prep_time',
                'cook_time',
                //'pic',
                'created_at',
                'items'
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Ingredient,
                    attributes: [
                        'id',
                        'recipe_id',
                        'ingredient_name',
                        'quantity',
                        'created_at'
                    ]
                    
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
        .then(dbRecipeData => {
            if (!dbRecipeData) {
                res.status(404).json({ message: 'There was no recipe found with this id' });
                return;
            }
            res.json(dbRecipeData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.post('/', withAuth, (req, res) => {
    Recipe.create({
        recipe_name: req.body.recipe_name,
        prep_time: req.body.prep_time,
        cook_time: req.body.cook_time,
        recipe_method: req.body.recipe_method,
        items: req.body.items,
        user_id: req.session.user_id
    })
    .then(dbRecipeData => res.json(dbRecipeData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
    Recipe.update({
            recipe_name: req.body.recipe_name,
            recipe_method: req.body.recipe_method
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(dbRecipeData => {
            if (!dbRecipeData) {
                res.status(404).json({ message: 'There was no recipe found with this id' });
                return;
            }
            res.json(dbRecipeData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req,res)=>{
    Recipe.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbRecipeData => {
        if(!dbRecipeData){
            res.status(404).json({ message: 'No such post found' });
            return;
        }
        res.json(dbRecipeData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
    
});


module.exports = router;