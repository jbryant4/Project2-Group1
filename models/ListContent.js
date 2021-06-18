//add sequelize and the connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// attach Vote to sequelize Mmodel 
class ListContent extends Model { }

//Vote Model
// id, user_id, list_id 
ListContent.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        list_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'list',
                key: 'id'
            }
        },
        movie_id: {
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
        modelName: 'listcontent'
    }
);

module.exports = ListContent;