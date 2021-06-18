//! import all the models
const User = require('./User');
const List = require('./List');
const Movie = require('./Movie');
const Comment = require('./Comment');
const Vote = require('./Vote');
const Follower = require('./Follower')
const ListContent = require('./ListContent')

//!Associations
//user has many list 
User.hasMany(List, {
    foreignKey: 'user_id'
});

// list belongs to user
List.belongsTo(User, {
    foreignKey: 'user_id'
});

//! need help user to user association
// user has many users
User.belongsToMany(User, {
    through: Follower,
    as: 'follow_list',

    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// user belongs to many lists through vote (ref)
User.belongsToMany(List, {
    through: Vote,
    as: 'voted_lists',

    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// list belongs to many users through vote (ref)
List.belongsToMany(User, {
    through: Vote,
    as: 'voted_lists',

    foreignKey: 'list_id',
    onDelete: 'SET NULL'
});

//list has many movies
List.hasMany(Movie, {
    
});

// movies belongs to many lists (might need help here) 
Movie.belongsToMany(List, {
    through: ListContent,

    onDelete: 'SET NULL'
});

// vote belongs to user
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

// vote belongs to list 
Vote.belongsTo(List, {
    foreignKey: 'list_id'
});

// user has many votes
User.hasMany(Vote, {
    foreignKey: 'user_id'
});

//list has many votes
List.hasMany(Vote, {
    foreignKey: 'list_id'
});

// comments belongs to user
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// comment belongs to list
Comment.belongsTo(List, {
    foreignKey: 'list_id',
    onDelete: 'SET NULL'
});

// user has many comments 
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// list has many comments
List.hasMany(Comment, {
    foreignKey: 'list_id',
    onDelete: 'SET NULL'
});

// export all models
module.exports = { User, List, Movie, Comment, Vote }