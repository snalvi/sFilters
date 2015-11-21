var _ = require('lodash-node');
var existingUsers = require('./existing-users');

var dataStore = {};

var services = ["health", "education"];
var users = existingUsers.concat([]);
	
dataStore.addUser = function(user){
	users.push(user);
}

dataStore.getUsers = function(service){
	return users;
}

dataStore.addUserToService = function(service, phoneNumber){
	console.log('addUserToService called  ' + service + "    " + phoneNumber);
	var user = _.find(users, function(user) {
	  return user.phoneNumber === phoneNumber;
	});
	if(user){
		user[service] = true;
	} else {
		var newUser = {};
		newUser["phoneNumber"] = phoneNumber;
		newUser[service] = true;
		users.push(newUser);
		console.log('new user created + ' + phoneNumber);
	}

}

dataStore.getUsersForService = function(service){
	return _.filter(users, function(user) {
  		return user[service] === true;
	});
}

dataStore.getServices = function(){
	return services;
}

dataStore.addService = function(service){
	services.push(service);
}

dataStore.serviceExists = function(service){
	return _.includes(services, service);
}
module.exports = dataStore;
