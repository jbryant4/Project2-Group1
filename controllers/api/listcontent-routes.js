const router = require('express').Router();
const { ListContent } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', (req, res) => {
    // check the session
    if (req.session) {
        // expects => {comment_text: "This is the comment", user_id: 1, post_id: 2}
        ListContent.create({
            list_id: req.body.list_id,
            movie_id: req.body.movie_id
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

router.delete('/:id', (req, res) => {
    ListContent.destroy({
        where: {
            list_id: req.body.list_id,
            movie_id:req.body.movie_id
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