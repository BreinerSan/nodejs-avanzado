require('./listeners/emailListener.js');
require('./listeners/statsListener.js');

const registerUser = require('./userRegistration.js');

const user1 = { id: 1, name: 'Usuario 1', email: 'usuario1@example.com' };
const user2 = { id: 2, name: 'Usuario 2', email: 'usuario2@example.com' };

registerUser(user1);
registerUser(user2);