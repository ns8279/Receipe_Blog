const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipe extends Model {};

//Create the fields and columns for our Recipe model

Recipe.init(
    //========================= Object DataType ==================================================
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            
        },

        recipe_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },

        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'category',
                key: 'id'
            }
        },

        prep_time: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        cook_time: {
            type: DataTypes.STRING,
            allowNull: false
        },

        recipe_method: {
            type: DataTypes.STRING,
            allowNull: false
        },

        pic: { 
            type: Sequelize.BLOB,
            allowNull: true
        }
  
    },

    // ==============================Object Model ===============================================
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'recipe'
    }
);

module.exports = Recipe;