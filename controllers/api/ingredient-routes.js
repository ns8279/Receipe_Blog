const router = require('express').Router();
const { Recipe, User, Comment, Category, Ingredient } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Ingredient.findAll({
            attributes: [
                'id',
                'ingredient_name',
                'quantity',
                'created_at'
            ],
            order: [
                ['created_at', 'DESC']
            ],
            include: [
                // {
                //     model: User,
                //     attributes: ['username']
                // },
                {
                    model: Recipe,
                    attributes: ['recipe_id']
                }
            ]
        })
        .then(dbIngredientData => res.json(dbIngredientData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.get('/:id', (req, res) => {
    Ingredient.findAll({
            where: {
                recipe_id: req.params.recipe_id
            }
        })
        .then(dbIngredientData => res.json(dbIngredientData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.put('/', withAuth, (req, res) => {
    if (req.session) {
        Ingredient.create({
                recipe_id: req.body.recipe_id,
                ingredient_name: req.body.ingredient_name,
                quantity: req.body.quantity,
                user_id: req.session.user_id
            })
            .then(dbIngredientData => res.json(dbIngredientData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

router.put('/:id', withAuth, (req, res) => {
    Ingredient.update({
            ingredient_name: req.body.ingredient_name,
            quantity: req.body.quantity
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(dbIngredientData => {
            if (!dbIngredientData) {
                res.status(404).json({ message: 'There was no ingredient found with this id' });
                return;
            }
            res.json(dbIngredientData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    Ingredient.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbIngredientData => {
            if (!dbIngredientData) {
                res.status(404).json({ message: 'There was no ingredient found with this id' });
                return;
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;