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

const jwt = require('jsonwebtoken');

const include = require('include')(__dirname);

const errors = include('src/controllers/errors.js');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

//*******************************************************************
// token

/**
 * Verifies that token is a valid token
 * @param  {Object}   req - Request object
 * @param  {Object}   res - Response object
 * @param  {Function} next - What to call after verifying token
 */
const token = function(req, res, next){
    
	const token = req.body.token || req.query.token || req.headers['x-access-token'];
	
	if (token) {

		jwt.verify(token, JWT_SECRET_KEY, function(err, decoded) {      
			if (err) {
				errors.send(req, res, 401, 'Failed to authenticate token.');
			} 
			else {
				req.decoded = decoded;    
				return next();
			}
		});

	} 
	else {
		errors.send(req, res, 403, 'No token provided.');
	}
    
};

//*******************************************************************=
//exports

module.exports = token;
