const validator = require('../helpers/validate');

// CREATE Anime
const saveAnime = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    description: 'required|string',
    genre: 'required|string',
    episodes: 'required|integer',
    rating: 'required|numeric',
    releaseYear: 'required|integer',
    streamingPlatform: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

// UPDATE Anime (partial, no required)
const updateAnime = (req, res, next) => {
  const validationRule = {
    title: 'string',
    description: 'string',
    genre: 'string',
    episodes: 'integer',
    rating: 'numeric',
    releaseYear: 'integer',
    streamingPlatform: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

// CREATE Profile
const saveProfile = (req, res, next) => {
  const validationRule = {
    username: 'required|string',
    email: 'required|email',
    favGenre: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

// UPDATE Profile (partial, no required)
const updateProfile = (req, res, next) => {
  const validationRule = {
    username: 'string',
    email: 'email',
    favGenre: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveAnime,
  updateAnime,
  saveProfile,
  updateProfile
};