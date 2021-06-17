//add sequelize and the connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// attach Vote to sequelize Mmodel 
class Vote extends Model { }

//Vote Model
// id, user_id, list_id 
Vote.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
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
        modelName: 'vote'
    }
);

module.exports = Vote;