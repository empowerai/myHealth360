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

const fs = require('fs');
const path = require('path');
const url = require('url');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);

const db = {};

console.log('DATABASE_URL='+process.env.DATABASE_URL);

const sequelizeOptions = {
	dialect: url.parse(process.env.DATABASE_URL, true).protocol.split(':')[0]
};

if (url.parse(process.env.DATABASE_URL, true).hostname !== 'localhost') {
	sequelizeOptions.dialectOptions = {
		ssl: true
	};
}

const sequelize = new Sequelize(process.env.DATABASE_URL, sequelizeOptions);

fs
  .readdirSync(__dirname)
  .filter(function(file) {
	return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
  .forEach(function(file) {
	const model = sequelize.import(path.join(__dirname, file));
	db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
