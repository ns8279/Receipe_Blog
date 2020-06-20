const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt'); 

//create user model

class User extends Model {
    //set up method to run on instance data (per user) to check password
    checkPassword(loginPW) {
        return bcrypt.compareSync(loginPW, this.password);
    }
}

//define table and columns
User.init(
    //=========================== object DataTypes =================================================================
    {
        // TABLE COLUMN DEFINITIONS GO HERE

        //define an id column
        id:{
            
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        //define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },

        //define an email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },

        //define a pw column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //the length should be atleast 4
                len: [4]
            }
        }
    },

    //=============================== Object Model ================================================================
    {
        // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

        //hooks for password encryption
        hooks:{
            //Setup beforeCreate lifecycle "hook" functionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;   
            },

            //set up beforeUpdate lifecycle "hook" functionality
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;   
            },
        },


        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;