var _ = require('lodash-node');
var existingUsers = require('./existing-users');

var dataStore = {};
var users = existingUsers.concat([]);
	
dataStore.addUser = function(user){
	users.push(user);
}

dataStore.getUsers = function(service){
	return users;
}

dataStore.addUserToService = function(service, name){
	console.log('addUserToService called  ' + service + "    " + name);
	var user = _.find(users, function(user) {
	  return user.name === name;
	});
	if(user){
		user[service] = true;
	};

}

dataStore.getUsersForService = function(service){
	return _.filter(users, function(user) {
  		return user[service] === true;
	});
}

module.exports = dataStore;
