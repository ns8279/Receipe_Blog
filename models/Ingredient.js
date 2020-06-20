const { Model, DataTypes}  = require('sequelize');
const sequelize = require('../config/connection');

class Ingredient extends Model {}

Ingredient.init(
    {
        //columns will go here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        recipe_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'recipe',
                key: 'id'
            }
        },

        ingredient_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        quantity: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'ingredient'
    }
);


module.exports = Ingredient;