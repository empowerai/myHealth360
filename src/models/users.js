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
module.exports = function(sequelize, DataTypes) {
	const users = sequelize.define('users', {
		id: { type: DataTypes.STRING, field: 'id', primaryKey: true },
		email: { type: DataTypes.STRING, field: 'email' },
		recordId: { type: DataTypes.STRING, field: 'recordid' },
		userRole: { type: DataTypes.STRING, field: 'userrole' },
		createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'created' },
		updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'updated' }
	}, {
		timestamps  : true
	});
	return users;
};
