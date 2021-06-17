// Movies Model 

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Movie model
// id, movieTitle, year, genre (whatever else we want to pull from the api), list_id

class Movie extends Model {}

Movie.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        movieTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        list_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'list',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'movie'
    }
);

module.exports = Movie;
