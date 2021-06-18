const { List } = require('../models');

const listdata = [
    {
        title: 'Kid Movies',
        user_id: 1
    },
    {
        title: 'Adult Movies',
        user_id: 1
    },
    {
        title: 'Funny Movies',
        user_id: 2
    }
];

const seedLists = () => Post.bulkCreate(listdata);

module.exports = seedLists;