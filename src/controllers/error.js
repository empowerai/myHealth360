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

/**
 * Creates JSON response for any error, given a message. Also logs the error.
 * @param  {Object} req     - User request object
 * @param  {String} message - Error message to output
 */
function logging(req, message){

	const attemptedRoute = req.originalUrl;
	const browser = req.get('user-agent');
	const referer = req.get('referer');

	const errorLog = {};
	errorLog.route = attemptedRoute;
	errorLog.browser = browser;
	errorLog.referer = referer;
	errorLog.errorMessage = message;

	console.error(errorLog);

}

/**
 * Returns error message, and any error objects to user
 * @param  {Object} req     - User request object
 * @param  {Object} res     - Response object
 * @param  {integer} code    - Status code to return
 * @param  {String} message - Error message to return
 * @param  {Array} errors  - Array of error objects to return
 */
const sendError = function(req, res, code, message, errors){

	const output = {
		'response': {
			'success' : false,
			'api': 'myHealth360',
			message,
			errors
		}
	};

	logging(req, message);

	res.status(code).json(output);

};

//*******************************************************************
// exports

module.exports.sendError = sendError;
