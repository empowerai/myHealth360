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

require('dotenv').config();

const include = require('include')(__dirname);
const _ = require('lodash');

const request = require('request');

const errors = include('src/controllers/errors.js');

//*******************************************************************

const FIHR_BASE_URL = process.env.FIHR_BASE_URL;
const MED_BASE_URL = process.env.MED_BASE_URL;

//*******************************************************************

function validatePatientID(patientID) {

	const re = /^(Patient-[0-9]{3,7})/;

	if (patientID.match(re)) {
		return true;
	}
	else {
		return false;
	}
}

//*******************************************************************

const get = {};

get.patients = function(req, res){

	const output = {
		api: 'myHealth360 Patients'
	};

	const patientID = req.params.patientID;
	output.patientID = patientID;

	if (!validatePatientID(patientID)) {

		errors.send(req, res, 400, 'Invalid patientID');

	}
	else {

		request(FIHR_BASE_URL + '/Patient?_id=' + patientID, function (error, response, body) {
			
			if (error) {
				errors.send(req, res, 404, 'patientID not found');
			}
			else if (response.statusCode !== 200) {
				errors.send(req, res, response.statusCode, 'patientID error');
			}
			else {
				console.log('statusCode:', response && response.statusCode); 
				console.log('body:', body);

				const patientJSON = JSON.parse(body);

				output.success = true;
				output.patient = patientJSON;

				res.json(output);
			}
		});
	}

};

get.diagnostics = function(req, res){

	const output = {
		api: 'myHealth360 Diagnostics'
	};

	const patientID = req.params.patientID;
	output.patientID = patientID;

	if (!validatePatientID(patientID)) {

		errors.send(req, res, 400, 'Invalid patientID');

	}
	else {

		const diagnosticReportReq = FIHR_BASE_URL + '/DiagnosticReport?patient=' + patientID;
		console.log('diagnosticReportReq:', diagnosticReportReq);

		request(diagnosticReportReq, function (error, response, body) {
			
			if (error) {
				errors.send(req, res, 404, 'patientID not found');
			}
			else if (response.statusCode !== 200) {
				errors.send(req, res, response.statusCode, 'patientID error');
			}
			else {
				console.log('statusCode:', response && response.statusCode); 
				//console.log('body:', body);

				const diagnosticReportJSON = JSON.parse(body);

				let diagnosisSystem = _.get(diagnosticReportJSON, 'entry[0].resource.codedDiagnosis[0].coding[0].system');
				const diagnosisCode = _.get(diagnosticReportJSON, 'entry[0].resource.codedDiagnosis[0].coding[0].code');

				console.log('diagnosisSystem:', diagnosisSystem);
				console.log('diagnosisCode:', diagnosisCode);

				if ((diagnosisSystem) && (diagnosisCode)) {

					diagnosisSystem = diagnosisSystem.slice(8);

					const medicalLibraryReq = MED_BASE_URL + '?mainSearchCriteria.v.cs=' + diagnosisSystem + '&mainSearchCriteria.v.c=' + diagnosisCode + '&knowledgeResponseType=application/json';
					console.log('medicalLibraryReq:', medicalLibraryReq);

					request(medicalLibraryReq, function (error, response, body) {

						if (error) {
							errors.send(req, res, 404, 'diagnosisCode not found');
						}
						else if (response.statusCode !== 200) {
							errors.send(req, res, response.statusCode, 'diagnosisCode error');
						}
						else {

							console.log('statusCode:', response && response.statusCode); 
							//console.log('body:', body); 

							const medicalLibraryJSON = JSON.parse(body);

							output.success = true;
							output.medicalLibrary = medicalLibraryJSON;

							res.json(output);
						}

					});
				}
				else {
					errors.send(req, res, 500, 'diagnosticReport error');
				}
	
			}
		});

	}

};

//*******************************************************************
// exports

module.exports.get = get;
