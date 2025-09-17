const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllAnime = async (req, res) => {
    //#swagger.tags=['Anime']
    const result = await mongodb.getDatabase().db().collection('anime').find();
    result.toArray().then((anime) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(anime);
    });
};

const getSingleAnime = async (req, res) => {
    //#swagger.tags=['Anime']
    const animeId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('anime').find({ _id: animeId });
    result.toArray().then((anime) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(anime[0]);
    });
};

const createAnime = async (req, res) => {
    //#swagger.tags=['Anime']
    const animeOne = {
        title: req.body.title,
        description: req.body.description,
        genre: req.body.genre,
        episodes: req.body.episodes,
        rating: req.body.rating,
        releaseYear: req.body.releaseYear,
        streamingPlatform: req.body.streamingPlatform
    };
    const response = await mongodb.getDatabase().db().collection('anime').insertOne(animeOne);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while adding the anime.')
    }
};

const updateAnime = async (req, res) => {
    //#swagger.tags=['Anime']
    const animeId = new ObjectId(req.params.id);
    const animeOne = {
        title: req.body.title,
        description: req.body.description,
        genre: req.body.genre,
        episodes: req.body.episodes,
        rating: req.body.rating,
        releaseYear: req.body.releaseYear,
        streamingPlatform: req.body.streamingPlatform
    };
    const response = await mongodb.getDatabase().db().collection('anime').replaceOne({ _id: animeId }, animeOne);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the anime.')
    }
};

const deleteAnime = async (req, res) => {
    //#swagger.tags=['Anime']
    const animeId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('anime').deleteOne({ _id: animeId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting the anime.')
    }
};

module.exports = {
    getAllAnime,
    getSingleAnime,
    createAnime,
    updateAnime,
    deleteAnime
}