const models = require("../models");

module.exports = {
  // function for user to create username and password for user authentication
  createUser: (email, userName, password) => {
    models.User.create({
      email: email,
      user_name: userName,
      password: password
    })
    .catch(err => console.log(err))
    .then(data => console.log(data.dataValues));
  },

  // Allows user to change their password
  updatePassword: (userId, password) => {
    models.User.update(
      {
        password: password
      },
      {
        where: {
          id: userId
        }
      }
    )
      .catch(err => console.log(err))
      // result gives back array with user id in it for some reason, look back at this later
      .then(result =>
        console.log("User: " + userId + "'s password was successfully changed!")
      );
  },

  // Allows user to find another user by their user name
  findUser: userId => {
    models.User.findOne({
      where: {
        id: userId
      },
      include: [
        {
          model: models.Groups
        }
      ]
    })
      .catch(err => console.log(err))
      .then(user => user.get({ plain: true }));
  },

  // Allows user to see all other users, in descending order by how many groups the users are in
  searchAllUsers: () => {
    models.User.findAll({
      order: [["number_of_Groups", "DESC"]],
      raw: true
    })
      .catch(err => console.log(err))
      .then(users => console.log(users));
  }
};

/*
module.exports.createUser("guest@gmail.com", "guest", "guest");
module.exports.createUser("zach@email.com", "Zach", "zach");
module.exports.createUser("kaitlyn@email.com", "Kaitlyn", "kaitlyn");
module.exports.createUser("sarah@email.com", "Sarah", "sarah");
module.exports.createUser("john@email.com", "John", "john");
module.exports.createUser("tom@email.com", "Tom", "tom");
*/

//module.exports.searchAllUsers();