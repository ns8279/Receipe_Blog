const { Ingredient } = require('../models');

const ingredientData = [
  {
    recipe_id: 1,
    ingredient_name: 'Salt',
    quantity: 'pinch'
    
  },
  {
    recipe_id: 1,
    ingredient_name: 'Frozen Limeade',
    quantity: '6 ounce'
  },
  {
    recipe_id: 1,
    ingredient_name: 'tequila',
    quantity: '6 fluid ounce'
  },
  {
    recipe_id: 2,
    ingredient_name: 'All purpose flour',
    quantity: '3 cups'
  },
  {
    recipe_id: 2,
    ingredient_name: 'Pepporini',
    quantity: '1/2 lb'
  },
  {
    recipe_id: 2,
    ingredient_name: 'Active yeast',
    quantity: '1 tbl spoon'
  },
  {
    recipe_id: 2,
    ingredient_name: 'Cheese',
    quantity: '1 cup'
  },
  {
    recipe_id: 2,
    ingredient_name: 'Pizza sauce',
    quantity: '1 cup'
  },
  {
    recipe_id: 3,
    ingredient_name: 'Chocolate Chips',
    quantity: '1 cup'
  },
  {
    recipe_id: 3,
    ingredient_name: 'Eggs',
    quantity: '2'
  },
  {
    recipe_id: 3,
    ingredient_name: 'Baking Powder',
    quantity: '1 teaspoon'
  },
  {
    recipe_id: 3,
    ingredient_name: 'Baking chocaloate',
    quantity: '400 grams'
  },
];

const seedIngredients = () => Ingredient.bulkCreate(ingredientData);

module.exports = seedIngredients;