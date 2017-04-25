/*

                    __  __           ____  __   _____ _____ ____ 
   ____ ___  __  __/ / / /__  ____ _/ / /_/ /_ |__  // ___// __ \
  / __ `__ \/ / / / /_/ / _ \/ __ `/ / __/ __ \ /_ </ __ \/ / / /
 / / / / / / /_/ / __  /  __/ /_/ / / /_/ / / /__/ / /_/ / /_/ / 
/_/ /_/ /_/\__, /_/ /_/\___/\__,_/_/\__/_/ /_/____/\____/\____/  
          /____/                                                 

*/

//*******************************************************************

'use strict';

//*******************************************************************
// required modules

const express = require('express');
const router = express.Router();
const include = require('include')(__dirname);
const passport = require('passport');  
const GitHubStrategy = require('passport-github2').Strategy;
const bcrypt = require('bcrypt-nodejs');
const models = include('src/models');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const init = require('./init');

//*******************************************************************
// passport 

passport.use(new GitHubStrategy({
		clientID: process.env.GITHUB_CLIENT_ID,
		clientSecret: process.env.GITHUB_CLIENT_SECRET,
		callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {

  	console.log('Github profile='+JSON.stringify(profile));

  	var responseUser = {};
  	responseUser.token = accessToken;

    var searchQuery = {
      name: profile.displayName
    };

    var updates = {
      name: profile.displayName,
      someID: profile.username
    };

    var options = {
      upsert: true
    };

    models.users.findOne({
		where: {id: profile.username} 
	})
	.then(function(user) {
		if(user){
			responseUser.id = user.id;
			responseUser.healthId = user.recordId;
			done(null, responseUser);	
		}
		else {
			const dbUser = {};
			dbUser.id = profile.username;
			dbUser.userRole = 'patient';
			models.users.create(dbUser)
			.then(function(usr) {
				responseUser.id = usr.id;
				responseUser.heathId = usr.recordId;
				done(null, responseUser);
			})
			.catch(function(err) {
				console.error(err);
				done(err);
			});
		}
		
	})
	.catch(function(err) {
		console.error(err);
		done(err);
	}); 
  }

));

// serialize user into the session
init();

module.exports = passport;

