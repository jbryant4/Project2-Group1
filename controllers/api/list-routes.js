const router = require('express').Router();
const sequelize = require('../../config/connection');
const { List, User, Comment, Vote, Movie } = require('../../models');
const withAuth = require('../../utils/auth');


// get all lists
router.get('/', (req, res) => {
    console.log('======================');
    List.findAll({
        attributes: [
            'id',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE list.id = vote.list_id)'), 'vote_count']
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'list_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
        ]
    })
        .then(dbListData => res.json(dbListData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
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
                model: Movie,
                attributes: ['id', 'movie_title']
            }
        ]
    })
        .then(dbListData => {
            if (!dbListData) {
                res.status(404).json({ message: 'No list found with this id' });
                return;
            }
            res.json(dbListData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, (req, res) => {
    // expects 
    List.create({
        title: req.body.title,
        user_id: req.session.user_id
    })
        .then(dbListData => res.json(dbListData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
//HEY JOEY DOUBLE CHECK THIS LATER
router.put('/upvote', withAuth, (req, res) => {
    //session exists
    if (req.session) {

        console.log("Upvote", req.body);
        // custom static method created in models/List.js
        List.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
            .then(updatedVoteData => res.json(updatedVoteData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    }
});

router.put('/:id', withAuth, (req, res) => {
    List.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbListData => {
            if (!dbListData) {
                res.status(404).json({ message: 'No list found with this id' });
                return;
            }
            res.json(dbListData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    List.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbListData => {
            if (!dbListData) {
                res.status(404).json({ message: 'No list found with this id' });
                return;
            }
            res.json(dbListData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;