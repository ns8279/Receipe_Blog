const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Category extends Model {};

//Create the fields and columns for our Category model

Category.init(
    //========================= Object DataType ==================================================
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        
        category_name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
  
    },

    // ==============================Object Model ===============================================
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'category'
    }
);

module.exports = Category;