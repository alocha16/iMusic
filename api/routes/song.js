'use strict'

var express = require('express');
var songController = require('../controllers/song');
var api = express.Router();

var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/songs'});

//GET
api.get('/song/:id',md_auth.ensureAuth,songController.getSong);
api.get('/songs/:album?',md_auth.ensureAuth,songController.getSongs);
api.get('/get-song-file/:songFile',songController.getSongFile);

//POST
api.post('/song',md_auth.ensureAuth,songController.saveSong);
api.post('/upload-file-song/:id', [md_auth.ensureAuth,md_upload],songController.uploadFile);

//PUT
api.put('/song/:id',md_auth.ensureAuth,songController.updateSong);

//DELETE
api.delete('/song/:id',md_auth.ensureAuth,songController.deleteSong);


module.exports = api;