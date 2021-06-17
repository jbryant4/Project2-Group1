//import all seed files
const seedUsers = require('./user-seeds');
const seedLists = require('./list-seeds');
const seedComments = require('./comment-seeds');
const seedVotes = require('./vote-seeds');
const seedFollowers = require('./follower-seeds');
const seedMovies = require('./movie-seeds');
const seedListContent = require('./listcontent-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('--------------');
    await seedUsers();
    console.log('--------------');

    await seedLists();
    console.log('--------------');

    await seedComments();
    console.log('--------------');

    await seedVotes();
    console.log('--------------');

    await seedMovies();
    console.log('--------------');

    await seedFollowers();
    console.log('--------------');

    await seedListContent();
    console.log('--------------');

    process.exit(0);
};

seedAll();