const router = require('express').Router();
const sequelize = require('../../config/connection');
const { List, User, Comments, Vote, Movies } = require('../../models');

router.get('/', (req, res) => {
    Movies.findAll()
        .then(dbMoviesData => res.json(dbMoviesData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    // check the session
    if (req.session) {
        Movies.create({
            movie_title: req.body.movie_text,
            description: req.body.movie_id,
            genre: req.body.movie_genre,
            year: req.body.movie_year
        })
            .then(dbMoviesData => res.json(dbMoviesData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

router.delete('/:id', (req, res) => {
    Movies.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbMoviesData => {
            if (!dbMoviesData) {
                res.status(404).json({ message: 'No movies found with this id!' });
                return;
            }
            res.json(dbMoviesData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});