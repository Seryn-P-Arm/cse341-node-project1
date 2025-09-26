const router = require('express').Router();

router.use('/', require('./swagger'));
const passport = require('passport');

// router.get('/', (req, res) => {
//     //#swagger.tags=['Hello World'] 
//     res.send('Hello World');
// });

router.use('/anime', require('./anime'));

router.use('/profiles', require('./profiles'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;