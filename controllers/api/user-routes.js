const router = require('express').Router();
const { User, Recipe, Comment, Ingredient, Category } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
            attributes: { exclude: ['password'] }
        })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            },
            include: [{
                    model: Recipe,
                    attributes: [
                        'id',
                        'title',
                        'recipe_name',
                        'prep_time',
                        'cook_time',
                        'recipe_method',
                        'pic',
                        'created_at'
                    ]
                },
                {
                    model: Ingredient,
                    attributes: [
                        'id',
                        'ingredient_name',
                        'quantity'
                    ],
                    include: {
                        model: Recipe,
                        attributes: ['title']
                    }
                },
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'created_at'
                    ],
                    include: {
                        model: Recipe,
                        attributes: ['title']
                    }
                },
                {
                    model: Recipe,
                    attributes: ['title']
                }
            ]
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'There was no user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    User.create({
            username: req.body.username,
            password: req.body.password
        })
        .then(dbUserData => {
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;
                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/login', (req, res) => {
    User.findOne({
            where: {
                username: req.body.username
            }
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'There was no user found with that username!' });
                return;
            }
            const validatePassword = dbUserData.checkPassword(req.body.password);
            if (!validatePassword) {
                res.status(400).json({ message: 'Wrong password!' });
                return;
            }
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;
                res.json({ user: dbUserData, message: 'Log in successful!' });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.put('/:id', (req, res) => {
    User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'There was no user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData1) {
                res.status(404).json({ message: 'There was no user found with this id' });
                return;
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;