'use strict'

var fs = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-Pagination');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function saveArtist(req,res){

	var artist = new Artist();

	var params = req.body;

	artist.name =params.name;
	artist.description = params.description;
	artist.image = 'generic.png';

	artist.save((err,artistStored)=>{
		if(err){
			res.status(500).send({mesagge:'Error al guardar el artista'});
		}else{
			if(!artistStored){
				res.status(404).send({mesagge:'No se ha registrado el artista'});
			}else{
				res.status(200).send({artist:artistStored});
			}
		}
	})
}

function getArtist(req,res){

	var artistId = req.params.id;

	Artist.findById(artistId,(err,artist)=>{
		if(err){
			res.status(500).send({mesagge:'Error en la peticion'});
		}else{
			if(artist){
				res.status(200).send({artist});
			}else{
				res.status(404).send({mesagge:'Artista no encontrado'});
			}
		}
	});
}

function getArtists(req,res){

	if(req.params.page){
		var page = req.params.page;
	}else{
		var page = 1;
	}

	var itemsPerPage = 4;

	Artist.find().sort('name').paginate(page,itemsPerPage, (err,artists,total) => {

		if(err){
			res.status(500).send({mesagge:'Error en la peticion'});
		}else{
			if(!artists){
				res.status(404).send({mesagge:'No se encontraron artistas'});
			}else{
				return res.status(200).send({
					total_items:total,
					artists:artists
				});
			}
		}
	});
}


function updateArtist(req,res){

		var artistId = req.params.id;
		var update = req.body;

		Artist.findByIdAndUpdate(artistId,update,(err, artistUpdated)=>{

		if(err){
			res.status(500).send({mesagge:'Error al actualizar el artista'});
		}else{
			if(!artistUpdated){
				res.status(404).send({mesagge:'El artista no se ha podido actualizar'});
			}else{
				res.status(200).send({artist:update});
			}
		}
	});
}

function deleteArtist(req,res){

	var artistId = req.params.id;

	Artist.findByIdAndRemove(artistId,(err, artistRemoved) => {

		if(err){
			res.status(500).send({mesagge:'Error al eliminar el artista'});
		}else{
			if(!artistRemoved){
				res.status(404).send({mesagge:'El artista no se ha podido eliminar'});
			}else{
				Album.find({artist:artistRemoved._id}).remove((err,albumRemoved) => {
					if(err){
						res.status(500).send({mesagge:'Error al los albunes del artista'});
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
									res.status(200).send({artist:artistRemoved});
								     }
							     }
							    });
				             }  
			            }
		           });
	            }
	        }
     });
}


function uploadImage(req,res){
	var artistId = req.params.id;
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
			Artist.findByIdAndUpdate(artistId,{image:file_name},(err,artistUpdated)=>{
				if(!artistUpdated){
				res.status(404).send({mesagge:'El artista no se ha podido actualizar'});
			}else{
				res.status(200).send({artist:artistUpdated});
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
	var pathFile = './uploads/artists/'+imageFile

	fs.exists(pathFile, function(exists){
		if(exists){

		res.sendFile(path.resolve(pathFile));

		}else{
			res.status(200).send({mesagge:'no existe la imagen'});
		}
	})
}

module.exports = {
	saveArtist,
	getArtist,
	getArtists,
	updateArtist,
	deleteArtist,
	uploadImage,
	getImageFile
};