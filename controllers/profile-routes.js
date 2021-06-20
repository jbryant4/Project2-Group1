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
      //
      //
      //
      //
    ],
    include: [
      {
        //
        //
        //
        //
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
router.get('/list/:id', (req, res) => {
  List.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      //
      //
      //
      //
    ],
    include: [
      {
        //
        //
        //
        //
      }
    ]
  })
    .then(dbListData => {
      if (dbListData) {
        // serialize the data
        const list = dbListData.get({ plain: true });

        res.render('list-page', {
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