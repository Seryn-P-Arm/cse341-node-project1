const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');
const profileController = require('../controllers/profiles');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', profileController.getAllProfiles);

router.get('/:id', profileController.getSingleProfile);

router.post('/', isAuthenticated, validation.saveProfile, profileController.createProfile);

router.post('/:id/watchlist', isAuthenticated, profileController.addAnimeToProfileWatchlist);

router.put('/:id', isAuthenticated, validation.updateProfile, profileController.updateProfile);

router.delete('/:id', isAuthenticated, profileController.deleteProfile);

router.delete('/:id/watchlist/:animeId', isAuthenticated, profileController.removeAnimeFromProfileWatchlist);

module.exports = router;