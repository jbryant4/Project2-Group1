const router = require('express').Router();
// const sequelize = require('../../config/connection');
const { Movie, List } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Movie.findAll({})
        .then(dbMoviesData => res.json(dbMoviesData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
// get movie by movie title
router.get('/:movie', (req, res) => {
    Movie.findOne({
        where: {
            movie_title: req.params.movie
        }
    }).then(dbUserData => res.json(dbUserData))
});
//FIND A WAY TO REMOVE LIST CONTENT
router.get('/:id', (req, res) => {
    Movie.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: List,
                attributes: ['title']
            }
        ]
    })
        .then(dbMoviesData => res.json(dbMoviesData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, (req, res) => {
    // check the session
    if (req.session) {
        Movie.create({
            movie_title: req.body.movie_title,
            description: req.body.description,
            genre: req.body.genre,
            year: req.body.year
        })
            .then(dbMoviesData => res.json(dbMoviesData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

router.delete('/:id', withAuth, (req, res) => {
    Movie.destroy({
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

module.exports = router