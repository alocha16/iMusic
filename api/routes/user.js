'use strict'

var express = require('express');
var userController = require('../controllers/user');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/users'});

//GET
api.get('/probando-controlador',md_auth.ensureAuth,userController.pruebas);
api.get('/get-image-user/:imageFile',userController.getImageFile);

//POST
api.post('/register',userController.saveUser);
api.post('/login', userController.loginUser);
api.post('/upload-image-user/:id', [md_auth.ensureAuth,md_upload],userController.uploadImage);

//PUT
api.put('/update-user/:id', md_auth.ensureAuth,userController.updateUser);

module.exports = api;
