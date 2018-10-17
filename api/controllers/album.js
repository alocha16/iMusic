'use strict'

var fs = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-Pagination');

var Album = require('../models/album');
var Artist = require('../models/artist');
var Song = require('../models/song');

function saveAlbum(req,res){

	var album = new Album();

	var params = req.body;

	album.title =params.title;
	album.description = params.description;
	album.year = params.year;;
	album.image = 'null';
	album.artist = params.artist;

	album.save((err,albumStored)=>{
		if(err){
			res.status(500).send({mesagge:'Error al guardar el albuma'});
		}else{
			if(!albumStored){
				res.status(404).send({mesagge:'No se ha registrado el albuma'});
			}else{
				res.status(200).send({album:albumStored});
			}
		}
	})
}

function getAlbum(req,res){

	var albumId = req.params.id;

	Album.findById(albumId).populate({path:'artist'}).exec((err,album)=>{
		if(err){
			res.status(500).send({mesagge:'Error en la peticion'});
		}else{
			if(album){
				res.status(200).send({album});
			}else{
				res.status(404).send({mesagge:'album no encontrado'});
			}
		}
	});
}

function getAlbums(req,res){
	var artistId = req.params.artist;

	if(!artistId){
		var find = Album.find({}).sort('title');
	}else{
		var find = Album.find({artist:artistId}).sort('year');
		}

	if(req.params.page){ var page = req.params.page;}else{var page = 1;}
		var itemsPerPage = 3;
			find.populate({path:'artist'}).exec((err,albums) => {
					if(err){
						res.status(500).send({mesagge:'Error en la peticion'});
					}else{
						if(!albums){
							res.status(404).send({mesagge:'No se encontraron album'});
						}else{
							return res.status(200).send({albums:albums});
						}
					}
			});
}

function updateAlbum(req,res){

		var albumId = req.params.id;
		var update = req.body;

		Album.findByIdAndUpdate(albumId,update,(err, albumUpdated)=>{

		if(err){
			res.status(500).send({mesagge:'Error al actualizar el albuma'});
		}else{
			if(!albumUpdated){
				res.status(404).send({mesagge:'El album no se ha podido actualizar'});
			}else{
				res.status(200).send(albumUpdated);
			}
		}
	});
}

function deleteAlbum(req,res){

	var albumId = req.params.id;

	Album.findByIdAndRemove(albumId,(err, albumRemoved) => {
		if(err){
			res.status(500).send({mesagge:'Error al eliminar el album'});
		}else{
			if(!albumRemoved){
				res.status(404).send({mesagge:'El album no se ha podido eliminar'});
			}else{
				Song.find({album:albumRemoved._id}).remove((err,songRemoved)=>{
						if(err){
						res.status(500).send({mesagge:'Error al eliminar las canciones del album'});
					}else{
						if(!songRemoved){
							res.status(404).send({mesagge:'la cancion no se ha podido eliminar'});
						}else{
							res.status(200).send({album:albumRemoved});
							 }
					     }
					 });
	            }
	        }
     });
}


function uploadImage(req,res){
	var albumId = req.params.id;
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
			Album.findByIdAndUpdate(albumId,{image:file_name},(err,albumUpdated)=>{
				if(!albumUpdated){
				res.status(404).send({mesagge:'El album no se ha podido actualizar'});
			}else{
				res.status(200).send({album:albumUpdated});
			}
			})

		}else{
			res.status(200).send({mesagge:'Formato no permitido'});
		}
	}else{
		res.status(200).send({mesagge:'Imagen no se ha subido'});
	}
}


function getImageFile(req,res){

	var imageFile = req.params.imageFile;
	var pathFile = './uploads/albums/'+imageFile

	fs.exists(pathFile, function(exists){
		if(exists){

		res.sendFile(path.resolve(pathFile));

		}else{
			res.status(200).send({mesagge:'no existe la imagen'});
		}
	})
}

module.exports = {
	saveAlbum,
	getAlbum,
	getAlbums,
	updateAlbum,
	deleteAlbum,
	uploadImage,
	getImageFile
};