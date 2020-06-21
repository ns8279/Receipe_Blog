const seedCategories = require('./category-seeds');
const seedUsers = require('./user-seeds');
const seedRecipes = require('./recipe-seeds');
const seedIngredients = require('./ingredient-seeds');
const seedComments = require('./comment-seeds');


const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  
  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedRecipes();
  console.log('\n----- RECIPES SEEDED -----\n');

  await seedIngredients();
  console.log('\n----- INGREDIENTS SEEDED -----\n');

  await seedComments();
  console.log('\n----- COMMENT SEEDED -----\n');



  process.exit(0);
};

seedAll();