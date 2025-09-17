const express = require('express');
const router = express.Router();

const animeController = require('../controllers/anime');

router.get('/', animeController.getAllAnime);

router.get('/:id', animeController.getSingleAnime);

router.post('/', animeController.createAnime);

router.put('/:id', animeController.updateAnime);

router.delete('/:id', animeController.deleteAnime);

module.exports = router;