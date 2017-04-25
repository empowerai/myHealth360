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

require('dotenv').config();

const express = require('express');
const router = express.Router();
const path = require('path');
const include = require('include')(__dirname);

const controller = include('src/controllers');

const X_ACCESS_TOKEN = process.env.X_ACCESS_TOKEN;

//*******************************************************************

router.use('/auth/', function(req, res){

	res.json({'x-access-token': X_ACCESS_TOKEN});
});

router.get('/patients/:patientID/', function(req, res){

	controller.get.patients(req, res);	
});

router.get('/patients/:patientID/diagnostics/', function(req, res){

	controller.get.diagnostics(req, res);	
});

//*******************************************************************
//exports

module.exports = router;
