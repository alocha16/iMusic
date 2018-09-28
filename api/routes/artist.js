'use strict'

var express = require('express');
var artistController = require('../controllers/artist');
var api = express.Router();

var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/artists'});


//GET
api.get('/artist/:id',md_auth.ensureAuth,artistController.getArtist);
api.get('/artists/:page?',md_auth.ensureAuth,artistController.getArtists);
api.get('/get-image-artist/:imageFile',artistController.getImageFile);

//POST
api.post('/artist',md_auth.ensureAuth,artistController.saveArtist);
api.post('/upload-image-artist/:id', [md_auth.ensureAuth,md_upload],artistController.uploadImage);

//PUT
api.put('/artist/:id',md_auth.ensureAuth,artistController.updateArtist);

//DELETE
api.delete('/artist/:id',md_auth.ensureAuth,artistController.deleteArtist);


module.exports = api;