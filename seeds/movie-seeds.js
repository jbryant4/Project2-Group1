const { Movie } = require('../models');

const moviedata = [
    {
        movie_title: "Finding Nemo",
        description: "fish looks for his boy with another fish who can talk to whales",
        genre: "family",
        year: 2010
    },
    {
        movie_title: "Lilo and Stitch",
        description: "alien befriends girl and learns what it means to be a family",
        genre: "family",
        year: 2005
    },
    {
        movie_title: "300",
        description: "This is SPARTA!!!",
        genre: "action",
        year: 2012
    },
    {
        movie_title: "2012",
        description: "Its the end of the world as we know it",
        genre: "suspense",
        year: 2014,
    },
];

const seedMovies = () => Movie.bulkCreate(moviedata);

module.exports = seedMovies;