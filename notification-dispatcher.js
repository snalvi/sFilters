var _ = require('lodash-node');
var ACCOUNT_SID = 'ACe62b50ff563a31a9ce8c79ab7ab29615';
var AUTH_TOKEN  = '5c665e1620dbc60c28d6323a69431622';
var twilio      = require('twilio')(ACCOUNT_SID, AUTH_TOKEN);
var twilioPhoneNumber = '+16474902221';

var notificationDispatcher = {};
    
notificationDispatcher.sendNotificationToUsers = function(message, users, timestamp) {
    _.forEach(users, function(user) {
        sendMessage(user.phoneNumber, message);
    });
};

var sendMessage = function(phoneNumber, message) {
   twilio.sendMessage({
        to:   phoneNumber,
        from: twilioPhoneNumber,
        body: message
    }, function(err, responseData) {
        if (!err) {
            console.log(responseData.from);
            console.log(responseData.body);
        } else {
            console.log("Twilio send error :( ", err);
        }
    });
};

module.exports = notificationDispatcher;
