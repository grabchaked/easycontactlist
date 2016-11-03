var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
//var jwt = require('jsonwebtoken');
var db = mongojs(process.env.MONGODB_URI || 'contactlist',['contactlist']);

// THIS IS SECURE INFORMATION

var secret = 'petooh228';
var adminPassword = 'forcodersonly';

//==============

app.use(express.static(__dirname+'/public'));

app.use(bodyParser.json());

app.get('/contactlist',function(req,res){
	console.log('received a request');

	db.contactlist.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});
});
	 
app.post('/contactlist',function(req,res){
	console.log(req.body);
	db.contactlist.insert(req.body, function(err,doc){
		res.json(doc);
	});
});

app.post('/contactlist/checkAdminPassword', function(req,res) {
	console.log(req.body.pass);
	if (req.body.pass == adminPassword) {
		res.json({result: true});
	} else {
		res.json({result: false});
	}
});

app.get('/contactlist/remove/', function(req,res){
	var id = req.query.id;
	var pass = req.query.pass;
	if (pass != adminPassword) {
		res.json({result: "nope"});
		return;
	}
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	});


});


app.listen(3333);
console.log('Server is running on port 3333');