const router = require('express').Router();

const userRoutes = require('./user-routes');
const listRoutes = require('./list-routes');
const movieRoutes = require('./movie-routes');
const commentRoutes = require('./comment-routes');
const listcontentRoutes = require('./listcontent-routes');
const followerRoutes = require('./follower-routes')

router.use('/users', userRoutes);
router.use('/lists', listRoutes);
router.use('/movies', movieRoutes);
router.use('/comments', commentRoutes);
router.use('/listcontent', listcontentRoutes);
router.use('/follower', followerRoutes);

module.exports = router;