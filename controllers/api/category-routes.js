const router = require('express').Router();
const { Recipe, User, Comment, Ingredient, Category } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Category.findAll({
        include: [
            {
              model: Recipe,
              attributes: ['id', 'recipe_name', 'prep_time', 'cook_time'] //the selected attributes will be displayed in the GET Route
            }
          ]
    })
        .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.get('/:id', (req, res) => {
    Category.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                  model: Recipe,
                  attributes: ['id', 'recipe_name', 'prep_time', 'cook_time'] //the selected attributes will be displayed in the GET Route
                }
              ]
        })
        .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:category_name', (req, res) => {
    Category.findOne({
        where:{
            category_name: req.params.category_name
        },
        include: [
            {
              model: Recipe,
              attributes: ['id', 'recipe_name', 'prep_time', 'cook_time'] //the selected attributes will be displayed in the GET Route
            }
          ]
    })
    .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Category.create({
                Category_name: req.body.Category_name,
                user_id: req.session.user_id
            })
            .then(dbCategoryData => res.json(dbCategoryData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

router.put('/:id', withAuth, (req, res) => {
    Category.update({
            Category_name: req.body.Category_name
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(dbCategoryData => {
            if (!dbCategoryData) {
                res.status(404).json({ message: 'There was no category found with this id' });
                return;
            }
            res.json(dbCategoryData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    Category.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbCategoryData => {
            if (!dbCategoryData) {
                res.status(404).json({ message: 'There was no category found with this id' });
                return;
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;