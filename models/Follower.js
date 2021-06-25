//add sequelize and the connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// attach Follower to sequelize model 
class Follower extends Model { }


// id, user_id, follow_id 
Follower.init(
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
        follow_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'follower'
    }
);

module.exports = Follower;