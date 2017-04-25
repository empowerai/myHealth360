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

const include = require('include')(__dirname);
const passport = require('passport');  
const Strategy = require('passport-local');
const bcrypt = require('bcrypt-nodejs');

const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

//*******************************************************************
// passport 

passport.use(new Strategy(  

	function(username, password, done) {
		
	}
));

//*******************************************************************

/**
 * Serializes user info
 * @param  {Object}   req - Request object
 * @param  {Object}   res - Response object
 * @param  {Function} next - What to call after serializing user info
 */
const serialize = function(req, res, next) {  

	req.user = {
		id: req.user.id,
		role: req.user.role
	};
	next();
};

/**
 * Creates JWT to return to user
 * @param  {Object}   req - Request object
 * @param  {Object}   res - Response object
 * @param  {Function} next - What to call after creating JWT
 */
const generate = function(req, res, next) {   
	
	req.token = jwt.sign({
		id: req.user.id,
		role: req.user.role
	}, JWT_SECRET_KEY, { expiresIn: 120 * 60 });
	next();
};

/**
 * Responds to user request with token
 * @param  {Object}   req - Request object
 * @param  {Object}   res - Response object
 */
const respond = function(req, res) { 

	res.status(200).json({
		user: req.user,
		token: req.token
	});
};

//*******************************************************************=
//exports

module.exports.passport = passport;
module.exports.serialize = serialize;
module.exports.generate = generate;
module.exports.respond = respond;
