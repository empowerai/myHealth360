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

const errors = include('src/controllers/errors.js');

//*******************************************************************
// authorize

/**
 * Function to authorize users
 * @param  {Object}   req - Request object
 * @param  {Object}   res - Response object
 * @param  {Function} next - What to call after authorizing user
 */
const authorize = function(req, res, next){

	if (req.decoded.role === 'admin'){
		return next();
	}
	
	errors.send(req, res, 403, 'Forbidden.');
};

//*******************************************************************=
//exports
module.exports = authorize;
