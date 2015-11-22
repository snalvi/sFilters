var _ = require('lodash-node');
var existingUsers = require('./existing-users');
var existingTips = require('./tips');


var dataStore = {};

var services = ["Health", "Education", "Agriculture"];
var users = existingUsers.concat([]);
var tips = _.merge({}, existingTips);

dataStore.addUser = function(user){
	users.push(user);
}

dataStore.getUsers = function(service){
	return users;
}

dataStore.addUserToService = function(service, phoneNumber, location){
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
		newUser["location"] = location.toLowerCase().trim();
		users.push(newUser);
		console.log('new user created + ' + phoneNumber);
	}

}

dataStore.getUsersForServiceAndLocation = function(service, location){
	var subscribedUsers = _.filter(users, function(user) {
  		return user[service] === true || user[service.toLowerCase()] == true;
	});

	if(location){
		var localUsers = _.filter(subscribedUsers, function(user) {
			return user['location'] == location.toLowerCase();
		});
		subscribedUsers = localUsers;
	}
	return subscribedUsers;
}

dataStore.getServices = function(){
	return services;
}

dataStore.addService = function(service){
	services.push(service);
}

dataStore.serviceExists = function(service){
	return _.any(services, function(s) {
	  	return s.toLowerCase().trim() == service.toLowerCase().trim();
	});
}

dataStore.getTips = function(){
	return tips;
}

dataStore.addTip = function(key, msg, service){
	tips[key] = {
		"service": service,
		"msg": msg
	};
}

dataStore.tipExists = function(tip) {
	return _.any(tips, function(v, k) {
	  	return k.toLowerCase().trim() == tip.toLowerCase().trim();
	});
	// return !_.isUndefined(tips[tip]);
}

dataStore.getTip = function(tip) {
	return _.find(tips, function(v, k) {
	  	return k.toLowerCase().trim() == tip.toLowerCase().trim();
	});
}

dataStore.getLocations = function(){
	var locations = _.pluck(users, 'location');
	return _.uniq(locations);
}

module.exports = dataStore;
