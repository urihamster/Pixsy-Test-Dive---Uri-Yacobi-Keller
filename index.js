var express=require('express')
var app = express();
var server = require('http').createServer(app);
var path = require('path');
var body_parser = require('body-parser');
var React = require('react');
var _=require('underscore');

require("node-jsx").install();

var reactLogin = React.createFactory(require('login'));

var accounts = require('accounts');


app.set('view engine', 'ejs');

app.set('views', path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'bower_components')))

app.use(body_parser());


app.get('/', function(req, res){
	res.send("heya, why don't you head over to the login page? ");
});

app.get('/login', function(req, res){
	var login = React.renderToString(reactLogin({}));
	res.render('login.ejs',{loginOutput:login});
});

app.post('/login', function(req, res){

	var message='Email and password do not match. So so sad';

	var	found = _.where(accounts,{email:req.body.email,password:req.body.password});

	if (found.length) message='Hooray! Found you! Welcome to this amazing wonderful app!';
	
	res.send(message);
	
});

app.listen(3000, function(){
	console.log('Now listening to port 3000');
});
