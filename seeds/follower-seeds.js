const { Follower } = require('../models');

const followdata = [
    {
        user_id: 1,
        follow_id: 2
    },
    {
        user_id: 2,
        follow_id: 3
    },
    {
        user_id: 2,
        follow_id: 1
    },
    {
        user_id: 3,
        follow_id: 2
    }
];

const seedFollowers = () => Follower.bulkCreate(followdata);

module.exports = seedFollowers;