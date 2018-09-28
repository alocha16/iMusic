'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.connect('mongodb://localhost:27017/iMusic',(err,res) => {
	if(err){ throw err;}
	else{
		console.log("La conexion base esta  OK");
		app.listen(port,function(){
		  console.log("Servidor del api REST escuchando en localhos:"+port);
		});
	 }
});

