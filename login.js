// const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'images')))

app.get('/', function(request, response) {

	response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/home', function(request, response) {
	response.sendFile(path.join(__dirname + '/home.html'));
});

app.listen(3000);

// http://localhost:3000/