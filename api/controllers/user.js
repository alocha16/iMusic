'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');


function pruebas(req,res){
	res.status(200).send({message:"probando una accion del controller de usaurios del REST"});
}


function saveUser(req,res){
 	
	var params = req.body;

	var user = new User();
	user.name = params.name;
	user.surname = params.surname;
	user.email = params.email;
	user.role = 'ROLE_USER';
	user.image = 'null';

	 if(params.password){

	 	bcrypt.hash(params.password,null,null,function(err,hash){
	 		user.password = hash;
	 		if(user.name != null && user.surname != null && user.email != null){
	 			//guardar el usuario
	 			user.save((err,userStored)=>{
	 				if(err){
	 					res.status(500).send({message:'Introduce los datos'});
	 				}else{
	 					if(!userStored){
	 						res.status(404).send({message:'No se ha registrado el usuario'});
	 					}else{
	 						res.status(200).send({user:userStored});
	 					}
	 				}
	 			})
	 		}else{
	 			res.status(200).send({message:'Introduce todos los datos'});
	 		}
	 	});
	 }else{
	 	res.status(200).send({message:'Introduce el password'});
	 }
}


function loginUser(req,res){

	var params = req.body;

	var email = params.email;
	var password = params.password;

	User.findOne({email:email.toLowerCase()},(err,user) =>{
		if(err){
			res.status(500).send({message:'Error en la peticiomn'});
		}else{
			if(!user){
				res.status(404).send({message:'El usuario no existe'});
			}else{
				bcrypt.compare(password, user.password, (err,check) =>{
					if(check){
						if(params.gethash){
							//devolver token de JWT
							res.status(200).send({
								token:jwt.createToken(user)
							});
						}else{
							res.status(200).send({user});
						}
					}else{
						res.status(404).send({message:'El usuario no ha podido loguearse'});
					}
				})
			}
		}
	})
}


function updateUser(req,res){

	var userId = req.params.id;
	var update = req.body;

	User.findByIdAndUpdate(userId,update,(err, userUpdated)=>{

		if(err){
			res.status(500).send({message:'Error al actualizar el usuario'});
		}else{
			if(!userUpdated){
				res.status(404).send({message:'El usuario no se ha podido actualizar'});
			}else{
				res.status(200).send(userUpdated);
			}
		}
	});
}

function uploadImage(req,res){
	var userId = req.params.id;
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){

			User.findByIdAndUpdate(userId,{image:file_name},(err,userUpdated)=>{

				if(!userUpdated){
				res.status(404).send({message:'El usuario no se ha podido actualizar'});
			}else{
				res.status(200).send({image:file_name, user:userUpdated});
			}

			})

		}else{
			res.status(200).send({message:'Formato no permitido'});
		}
	}else{
		res.status(200).send({message:'Imagen no se ha subido'});
	}

}


function getImageFile(req,res){

	var imageFile = req.params.imageFile;
	var pathFile = './uploads/users/'+imageFile

	fs.exists(pathFile, function(exists){
		if(exists){
		res.sendFile(path.resolve(pathFile));
		}else{
			res.status(200).send({message:'no existe la imagen'});
		}
	})
}

module.exports = {
	pruebas,
	saveUser,
	loginUser,
	updateUser,
	uploadImage,
	getImageFile
};