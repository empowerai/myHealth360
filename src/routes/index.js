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

const auth = require('./auth');
const api = require('./api');

const token = include('src/controllers/auth/token.js');
const authorize = include('src/controllers/auth/authorize.js');

//*******************************************************************
// router

//router.use('/auth', auth);

//router.use(token);

//router.use(authorize);

router.use('/api', api);

//*******************************************************************
//exports

module.exports = router;
