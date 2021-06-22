const router = require('express').Router();
const sequelize = require('../config/connection');

// PD: I just included all of the Models here to be safe.  I'm thinking the others that are gray are rightly so and can be deleted here. But I'm not sure and I wanted more eyes here.
const { Follower, List, ListContent, Movie, User, Comment, Vote } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {
    console.log('======================');

    let totals = {}; 
    User.count().then(count => {totals.user =  count});
    List.count().then(count => {totals.list =  count});
    Movie.count().then(count => {totals.movie = count});

    List.findAll({
        attributes: [
            'id',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE list.id = vote.list_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'list_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbListData => {
            const lists = dbListData.map(list => list.get({ plain: true }));

            res.render('homepage', {
                totals,
                lists,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get single post
router.get('/list/:id', (req, res) => {
    List.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE list.id = vote.list_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'list_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Movie,
            }
        ]
    })
        .then(dbListData => {
            if (!dbListData) {
                res.status(404).json({ message: 'No list found with this id' });
                return;
            }

            const list = dbListData.get({ plain: true })
            console.log(list)

            res.render('listpage-public', {
                list,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;
