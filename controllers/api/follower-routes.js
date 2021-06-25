const router = require('express').Router();
const { Follower } = require('../../models');
// const withAuth = require('../../utils/auth');
router.get('/', (req,res) =>{
    Follower.findAll()
    .then(dbListCData => res.json(dbListCData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req,res) =>{
    Follower.findOne({
        where: {
            user_id: req.session.user_id,
            follow_id: req.params.id,
        }
    })
    .then(dbListCData => res.json(dbListCData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.post('/', (req, res) => {
    // check the session
    if (req.session) {

        Follower.create({
            user_id: req.session.user_id,
            follow_id: req.body.follow_id
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

router.delete('/', (req, res) => {
    Follower.destroy({
        where: {
            user_id: req.session.user_id,
            follow_id: req.body.follow_id,
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment found with this id! ' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router