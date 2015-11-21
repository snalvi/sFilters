var _ = require('lodash-node');
var existingUsers = require('./existing-users');

var dataStore = {};
var users = existingUsers.concat([]);
	
dataStore.addUser = function(){

}

dataStore.getUsers = function(){
	return users;
}

dataStore.addUserToService = function(){

}

dataStore.getUsersForService = function(){

}

module.exports = dataStore;
