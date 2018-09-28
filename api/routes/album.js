'use strict'

var express = require('express');
var albumController = require('../controllers/album');
var api = express.Router();

var md_auth = require('../middlewares/authenticated');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/albums'});


//GET
api.get('/album/:id',md_auth.ensureAuth,albumController.getAlbum);
api.get('/albums/:artist?',md_auth.ensureAuth,albumController.getAlbums);
api.get('/get-image-album/:imageFile',albumController.getImageFile);

//POST
api.post('/album',md_auth.ensureAuth,albumController.saveAlbum);
api.post('/upload-image-album/:id', [md_auth.ensureAuth,md_upload],albumController.uploadImage);

//PUT
api.put('/album/:id',md_auth.ensureAuth,albumController.updateAlbum);

//DELETE
api.delete('/album/:id',md_auth.ensureAuth,albumController.deleteAlbum);


module.exports = api;