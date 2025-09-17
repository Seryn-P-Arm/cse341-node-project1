const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World'] 
    res.send('Hello World');
});

router.use('/anime', require('./anime'));

router.use('/profiles', require('./profiles'));

module.exports = router;