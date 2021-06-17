//! import all the models
const User = require('./User');
const List = require('./List');
const Movies = require('./Movies');
const Comments = require('./Comments');
const Vote = require('./Vote');

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
User.hasMany(User);
User.belongsToMany(User);

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
List.hasMany(Movies, {
    foreignKey: 'list_id'
});

// movies belongs to many lists 
Movies.belongsToMany(List, {
    foreignKey: 'list_id'
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
Comments.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// comment belongs to list
Comments.belongsTo(List, {
    foreignKey: 'list_id',
    onDelete: 'SET NULL'
});

// user has many comments 
User.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// list has many comments
List.hasMany(Comments, {
    foreignKey: 'list_id',
    onDelete: 'SET NULL'
});

//! export all models
module.exports = { User, List, Movies, Comments, Vote }