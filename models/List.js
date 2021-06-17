//add sequelize and the connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// create our List model
class List extends Model {
    static upvote(body, models) {
        return models.Vote.create({
            user_id: body.user_id,
            list_id: body.list_id
        }).then(() => {
            return List.findOne({
                where: {
                    id: body.list_id
                },
                attributes: [
                    'id',
                    'list_url',
                    'title',
                    'created_at',
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM vote WHERE list.id = vote.list_id)'),
                        'vote_count'
                    ]
                ],
                include: [
                    {
                        model: models.Comment,
                        attributes: ['id', 'comment_text', 'list_id', 'user_id', 'created_at'],
                        include: {
                            model: models.User,
                            attributes: ['username']
                        }
                    }
                ]
            });
        });
    }
}

// create fields/columns for List model
List.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        movieList: {
            type: DataTypes.STRING,
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
