const EventEmmiter = require('node:events');

class UserNotifier extends EventEmmiter {}

const notifier = new UserNotifier();

module.exports = notifier;
