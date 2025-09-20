const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');

const profileController = require('../controllers/profiles');

router.get('/', profileController.getAllProfiles);

router.get('/:id', profileController.getSingleProfile);

router.post('/', validation.saveProfile, profileController.createProfile);

router.post('/:id/watchlist', profileController.addAnimeToProfileWatchlist);

router.put('/:id', validation.updateProfile, profileController.updateProfile);

router.delete('/:id', profileController.deleteProfile);

router.delete('/:id/watchlist/:animeId', profileController.removeAnimeFromProfileWatchlist);

module.exports = router;