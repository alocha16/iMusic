'use strict'

var fs = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-Pagination');

var Album = require('../models/album');
var Artist = require('../models/artist');
var Song = require('../models/song');

function saveSong(req,res){

	var song = new Song();

	var params = req.body;

	song.name =params.name;
	song.number = params.number;
	song.duration = params.duration;
	song.file = 'null';
	song.album = params.album;

	song.save((err,songStored)=>{
		if(err){
			res.status(500).send({mesagge:'Error al guardar el song'});
		}else{
			if(!songStored){
				res.status(404).send({mesagge:'No se ha registrado el song'});
			}else{
				res.status(200).send({song:songStored});
			}
		}
	})
}

function getSong(req,res){

	var songId = req.params.id;

	//Song.findById(songId).populate({path:'album', populate : {path:'artist'}}).exec((err,song)=>{
	Song.findById(songId).populate({path:'album'}).exec((err,song)=>{
		if(err){
			res.status(500).send({mesagge:'Error en la peticion'});
		}else{
			if(song){
				res.status(200).send({song});
			}else{
				res.status(404).send({mesagge:'song no encontrado'});
			}
		}
	});
}

function getSongs(req,res){

	var albumId = req.params.album;

	if(!albumId){
		var find = Song.find({}).sort('number');
		}else{
		var find = Song.find({album:albumId}).sort('year');
		console.log('TRUE');
		}
			find.populate({
				path:'album',
				populate:{
					path: 'artist',
					model: 'Artist'}
				}).exec((err,songs) => {
					if(err){
						res.status(500).send({mesagge:'Error en la peticion'});
					}else{
						if(!songs){
							res.status(404).send({mesagge:'No se encontraron song'});
						}else{
							return res.status(200).send({songs});
						}
					}
			});
}



function updateSong(req,res){

		var songId = req.params.id;
		var update = req.body;

		Song.findByIdAndUpdate(songId,update,(err, songUpdated)=>{

		if(err){
			res.status(500).send({mesagge:'Error al actualizar el songa'});
		}else{
			if(!songUpdated){
				res.status(404).send({mesagge:'El song no se ha podido actualizar'});
			}else{
				res.status(200).send(songUpdated);
			}
		}
	});
}

function deleteSong(req,res){

	var songId = req.params.id;

	Song.findByIdAndRemove(songId,(err,songRemoved)=>{
						if(err){
						res.status(500).send({mesagge:'Error al eliminar las canciones del song'});
					}else{
						if(!songRemoved){
							res.status(404).send({mesagge:'la cancion no se ha podido eliminar'});
						}else{
							res.status(200).send({song:songRemoved});
							 }
					     }
					 });
}


function uploadFile(req,res){
	var songId = req.params.id;
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.file.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if(file_ext == 'mp3' || file_ext == 'ogg'){
		  Song.findByIdAndUpdate(songId,{file:file_name},(err,songUpdated)=>{
				if(!songUpdated){
				res.status(404).send({mesagge:'El song no se ha podido actualizar'});
			}else{
				res.status(200).send({song:songUpdated});
			}
			})

		}else{
			res.status(200).send({mesagge:'Formato no permitido'});
		}
	}else{
		res.status(200).send({mesagge:'song no se ha subido'});
	}
}


function getSongFile(req,res){

	var file = req.params.songFile;
	var pathFile = './uploads/songs/'+file

	fs.exists(pathFile, function(exists){
		if(exists){

		res.sendFile(path.resolve(pathFile));

		}else{
			res.status(200).send({mesagge:'no existe la cancion'});
		}
	})
}

module.exports = {
	saveSong,
	getSong,
	getSongs,
	updateSong,
	deleteSong,
	uploadFile,
	getSongFile
};