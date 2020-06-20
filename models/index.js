const User = require('./User');
const Recipe = require('./Recipe');
const Ingredient = require('./Ingredient');
const Comment = require('./Comment');
const Category = require('./Category');

//User
User.hasMany(Recipe);
Recipe.belongsTo(User);

//Comments
Comment.belongsTo(User);
Comment.belongsTo(Recipe);
User.hasMany(Comment);
Recipe.hasMany(Comment);

//Category
Category.hasMany(Recipe);

//Recipe
Recipe.hasMany(Ingredient);

//Ingredient
//Ingredient.belongsToMany(Recipe);

module.exports = {User, Recipe, Ingredient, Comment, Category}