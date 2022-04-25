const express = require('express');
const session = require('express-session');
const path = require('path');
const { auth } = require('express-openid-connect');
require('dotenv').config();

const config = {
	authRequired: false,
	auth0Logout: true,
	secret: process.env.SECRET,
	baseURL: process.env.BASEURL,
	clientID: process.env.CLIENTID,
	issuerBaseURL: process.env.ISSUER
  };

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
app.use(auth(config));

app.get('/loginpage', (req, res) => {
	res.sendFile(path.join(__dirname + '/loginpage.html'));
  });

app.get('/', (req, res) => {
	req.oidc.isAuthenticated() ? res.sendFile(path.join(__dirname + '/home.html')) : res.sendFile(path.join(__dirname + '/loginpage.html'));
});

// app.post('/home', function(request, response) {
// 	response.sendFile(path.join(__dirname + '/home.html'));
// });

app.listen(3000);

// http://localhost:3000/