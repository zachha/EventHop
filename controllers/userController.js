const models = require('../models');

function createUser(userName, password) {
    models.User.create({
        user_name: userName,
        password: password
    }).then((data) => console.log(data.dataValues) );
};

createUser("Trindy", "pword2");
