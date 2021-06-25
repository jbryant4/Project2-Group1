const router = require('express').Router();
const sequelize = require('../config/connection');
const { Follower, ListContent, Movie, User, Comment, Vote, List } = require('../models');
const withAuth = require('../utils/auth');

// load user profile
router.get('/', withAuth, (req, res) => {
  let follower = {};
  User.findOne({
    where: {
      id: req.session.user_id
    },
    attributes:['username'],
    include: [{
      model: User,
      attributes:['id','username'],
      through: Follower,
      as: 'follower_list'
    }]
  })
  .then(dbFollowData => {
    // serialize data before passing to template
    const following = dbFollowData.get({ plain: true });
    follower = following;
    // console.log(follower)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

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
      // console.log(lists)
      // pass data to template
      res.render('profilepage-user', { lists, follower, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single profile info
router.get('/:id', withAuth, (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: List,
        attributes: [
          'id',
          'title',
          'created_at'
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'list_id', 'user_id', 'created_at'],
          },
        ]
      },
      {
        model: List,
        attributes: ['title'],
        through: Vote,
        as: 'voted_lists'
      }]
  })
    .then(dbUserData => {
      if (dbUserData) {
        // serialize the data
        // const user = dbUserData.map(list => list.get({ plain: true }));
        const user = dbUserData.get({ plain: true });
        console.log(user);
        res.render('profilepage-public', { //this file name has changed so this should also change
          user,
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