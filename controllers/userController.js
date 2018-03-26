const models = require('../models');

function createUser(userName, password) {
    models.User.create({
        user_name: userName,
        password: password
    })
    .then(data => console.log(data.dataValues))
    .catch(err => console.log(err));
}

function updatePassword(userId, password) {
    models.User.update({
        password: password
    }, {
        where: {
            id: userId
        }})
        // result gives back array with user id in it for some reason, look back at this later (User.get should work?)
        .then(result => console.log(result))
        .catch(err => console.log(err));
}

function createGroup(groupname, userId) {
    models.Groups.create({
        group_name: groupname
    });
    models.User.findbyId(userId).then(user =>
      user.addGroups({
        where: {
          id: userId
        }
      });
    );
}

//updatePassword(1, "NEWPASSSS");
createGroup("NEWGROUP");