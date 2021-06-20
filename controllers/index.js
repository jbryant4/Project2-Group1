const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const profileRoutes = require('./profile-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/list', profileRoutes);

router.use((req, res) => {
    res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;