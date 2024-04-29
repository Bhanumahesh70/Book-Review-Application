const User = require('../models/user');
const bcrypt = require('bcryptjs');

async function createUser(userData) {
    const { username, password } = userData;
    const user = new User({
        username: username,
        password: password
    });
    return user.save();
}

module.exports = {
    createUser
};
