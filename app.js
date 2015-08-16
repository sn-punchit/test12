var express 	= require('express');
var cons 		= require('consolidate');
var app 		= express();
var admin 		= express();
var secret 		= express();

var users = [];
users.push({ name: 'tobi'});
users.push({ name: 'loki'});
users.push({ name: 'jane'});

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('view', __dirname + '/index');
app.use(express.static('public'));
app.use(['/adm*n'], admin);
admin.use('/secr*t', secret);

/*------app------*/
app.get('/', function(req, res){
	res.render('index', {
		title: 'Consolidate.js'
	});
});
app.get('/users', function(req, res){
	res.render('users', {
		title: 'Users',
		users: users
	});
});
app.delete('/', function(req, res){
	res.send('DELETE Request to home page');
	console.log('DELETE received');
});

/*------admin------*/
admin.get('/', function(req, res){
	console.log('Admin Homepage');
	res.send('Admin Homepage');
});
admin.on('mount', function(parent){
	console.log('Admin mounted');
	console.log(parent);
});

/*------secret------*/
secret.get('/', function(req, res){
	console.log('Secret Page');
	res.send('Secret Page');
});
secret.on('mount', function(parent){
	console.log('Secret mounted');
	console.log(parent);
});

app.listen(3000, function(){
	console.log('Listening...');
});

