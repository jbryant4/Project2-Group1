
//add sequelize and the connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// attach Vote to sequelize Mmodel 
class Movies extends Model { }// Movies Model 

// id, movieTitle, year, genre (whatever else we want to pull from the api), list_id
Movies.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        movieTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'list'
    }
);

module.exports = List;