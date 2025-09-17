const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllProfiles = async (req, res) => {
    //#swagger.tags=['Profiles']
    const result = await mongodb.getDatabase().db().collection('profiles').find();
    result.toArray().then((profiles) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(profiles);
    });
};

const getSingleProfile = async (req, res) => {
    //#swagger.tags=['Profiles']
    const profileId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('profiles').find({ _id: profileId });
    result.toArray().then((profiles) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(profiles[0]);
    });
};

const createProfile = async (req, res) => {
    //#swagger.tags=['Profiles']
    const profile = {
        username: req.body.username,
        email: req.body.email,
        favGenre: req.body.favGenre,
        watchlist: req.body.watchlist
    };
    const response = await mongodb.getDatabase().db().collection('profiles').insertOne(profile);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while adding profile.')
    }
};

const updateProfile = async (req, res) => {
    try {
        const profileId = new ObjectId(req.params.id);

        // Only include fields that are present in req.body
        const updateFields = {};
        if (req.body.username) updateFields.username = req.body.username;
        if (req.body.email) updateFields.email = req.body.email;
        if (req.body.favGenre) updateFields.favGenre = req.body.favGenre;

        const response = await mongodb.getDatabase().db().collection('profiles').updateOne(
            { _id: profileId },
            { $set: updateFields } // only updates these fields
        );

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Profile updated successfully!' });
        } else {
            res.status(404).json({ error: 'Profile not found or no changes made.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteProfile = async (req, res) => {
    //#swagger.tags=['Profiles']
    const profileId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('profiles').deleteOne({ _id: profileId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while deleting profile.')
    }
};

const addAnimeToProfileWatchlist = async (req, res) => {
    //#swagger.tags=['Profiles']
    try {
        const profileId = new ObjectId(req.params.id);
        const animeId = new ObjectId(req.body.animeId); // pass animeId in body

        const response = await mongodb.getDatabase().db().collection('profiles').updateOne(
            { _id: profileId },
            { $push: { watchlist: animeId } } // just store the animeId
        );

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Anime added to watchlist!' });
        } else {
            res.status(404).json({ error: 'Profile not found or update failed.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const removeAnimeFromProfileWatchlist = async (req, res) => {
    //#swagger.tags=['Profiles']
    try {
        const profileId = new ObjectId(req.params.id);
        const animeId = new ObjectId(req.params.animeId);

        const response = await mongodb.getDatabase().db().collection('profiles').updateOne(
            { _id: profileId },
            { $pull: { watchlist: animeId } }
        );

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Anime removed to watchlist!' });
        } else {
            res.status(404).json({ error: 'Profile not found or delete failed.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllProfiles,
    getSingleProfile,
    createProfile,
    updateProfile,
    deleteProfile,
    addAnimeToProfileWatchlist,
    removeAnimeFromProfileWatchlist
}