const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate')

const animeController = require('../controllers/anime');

router.get('/', animeController.getAllAnime);

router.get('/:id', animeController.getSingleAnime);

router.post('/', isAuthenticated, validation.saveAnime, animeController.createAnime);

router.put('/:id', isAuthenticated, validation.updateAnime, animeController.updateAnime);

router.delete('/:id', isAuthenticated, animeController.deleteAnime);

module.exports = router;