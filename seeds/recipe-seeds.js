const { Recipe } = require('../models');

const recipeData = [
  {
    recipe_name: 'Margarita',
    user_id: 1,
    category_id: 1,
    prep_time: '10 minutes',
    cook_time: '10 minutes',
    recipe_method: '1. Place salt on small shallow plate. Rim two glasses with lime wedge, then dip in salt to coat rim. Divide tequila, triple sec, and lime juice between 2 glasses and stir to combine. Top with ice, garnish with lime, and serve.',
    total_calories: '180 cal'
  },
  {
    recipe_name: 'Chocolate Brownie',
    user_id: 2,
    category_id: 2,
    prep_time: '15 minutes',
    cook_time: '40 minutes',
    recipe_method: 'Preheat oven to 350 degrees F (175 degrees C). Grease and flour an 8-inch square pan. In a large saucepan, melt 1/2 cup butter. Remove from heat, and stir in sugar, eggs, and 1 teaspoon vanilla. Beat in 1/3 cup cocoa, 1/2 cup flour, salt, and baking powder. Spread batter into prepared pan. Bake in preheated oven for 25 to 30 minutes. Do not overcook. To Make Frosting: Combine 3 tablespoons softened butter, 3 tablespoons cocoa, honey, 1 teaspoon vanilla extract, and 1 cup confectioners sugar. Stir until smooth. Frost brownies while they are still warm.',
    total_calories: '309 cal'
  },
  {
    recipe_name: 'Pepporini Pizza',
    user_id: 3,
    category_id: 3,
    prep_time: '15 minutes',
    cook_time: '45 minutes',
    recipe_method: 'Preheat oven to 450 degrees F (230 degrees C). In a medium bowl, dissolve yeast and sugar in warm water. Let stand until creamy, about 10 minutes. Stir in flour, salt and oil. Beat until smooth. Let rest for 5 minutes. Turn dough out onto a lightly floured surface and pat or roll into a round. Transfer crust to a lightly greased pizza pan or bakers peel dusted with cornmeal. Spread with desired toppings and bake in preheated oven for 15 to 20 minutes, or until golden brown. Let baked pizza cool for 5 minutes before serving.',
    total_calories: '650 cal'
  },
];

const seedRecipes = () => Recipe.bulkCreate(recipeData);

module.exports = seedRecipes;