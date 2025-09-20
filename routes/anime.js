const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');

const animeController = require('../controllers/anime');

router.get('/', animeController.getAllAnime);

router.get('/:id', animeController.getSingleAnime);

router.post('/', validation.saveAnime, animeController.createAnime);

router.put('/:id', validation.updateAnime, animeController.updateAnime);

router.delete('/:id', animeController.deleteAnime);

module.exports = router;