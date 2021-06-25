const { ListContent } = require('../models');

const listcontentdata = [
    {
        list_id: 1,
        movie_id: 1
    },
    {
        list_id: 1,
        movie_id: 2
    },
    {
        list_id: 2,
        movie_id: 3
    },
    {
        list_id: 2,
        movie_id: 4
    },
    {
        list_id: 3,
        movie_id: 1
    },
    {
        list_id: 3,
        movie_id: 2
    },
    {
        list_id: 3,
        movie_id: 3
    },
    {
        list_id: 3,
        movie_id: 4
    }
    
];

const seedListContent = () => ListContent.bulkCreate(listcontentdata);

module.exports = seedListContent;