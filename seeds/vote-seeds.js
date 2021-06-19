const { Vote } = require('../models');

const votedata = [
    {
        user_id: 1,
        list_id: 3
    },
    {
        user_id: 2,
        list_id: 1
    },
    {
        user_id: 3,
        list_id: 1
    },
    {
        user_id: 3,
        list_id: 2
    }
];

const seedVotes = () => Vote.bulkCreate(votedata);

module.exports = seedVotes;