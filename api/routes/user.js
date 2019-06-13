const express = require('express');
const UserController = require('../controllers/user');

const api = express.Router();
const md_auth = require('../midelware/authenticated');

api.get('/home', UserController.home);
api.get('/pruebas', md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);



module.exports = api;