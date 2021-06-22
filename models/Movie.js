
// Movies Model 
// id, movieTitle, year, genre (whatever else we want to pull from the api), list_id

//add sequelize and the connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// attach Vote to sequelize model 
class Movie extends Model { }// Movies Model 

// id, movieTitle, year, genre (whatever else we want to pull from the api), list_id
Movie.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        movie_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        actors: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        poster: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'movie'
    }
);

module.exports = Movie;

