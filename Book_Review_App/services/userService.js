const User = require('../models/user');
const bcrypt = require('bcryptjs');

async function createUser(userData) {
    const { username, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        username: username,
        password: hashedPassword
    });
    return user.save();
}

module.exports = {
    createUser
};
