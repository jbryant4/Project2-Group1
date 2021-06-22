const router = require('express').Router();
const sequelize = require('../config/connection');
const { Follower, ListContent, Movie, User, Comment, Vote, List } = require('../models');
// const withAuth = require('../utils/auth');

// get all lists from profile page
router.get('/', (req, res) => {
  List.findAll({
    where: {
      user_id: req.session.user_id
    },
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
      }
    ]
  })
    .then(dbListData => {
      // serialize data before passing to template
      const lists = dbListData.map(list => list.get({ plain: true }));
      // pass data to template
      res.render('profile-page', { lists, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single list
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
      if (dbListData) {
        // serialize the data
        const list = dbListData.get({ plain: true });

        res.render('list-page', { //this file name has changed so this should also change
          list,
          loggedIn: true
      });
    } else {
      res.status(404).end();
    } 
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;