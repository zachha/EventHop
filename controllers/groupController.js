const models = require("../models");

module.exports = {
  // Allows the user to create a group and then links the user to the group
  createGroup: (groupname, userId, route) => {
    models.Groups.create({
      group_name: groupname,
      route: route
    })
      .then(function(group) {
        models.User.findById(userId)
          .then(function(user) {
            user
              .addGroups(group)
              .then(user => {
                console.log(
                  "user: " + userId + " has created group: " + groupname + "!"
                );
              })
              .then(data => {
                return user
                  .increment({
                    number_of_Groups: 1
                  })
                  .get({ plain: true });
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  },

  // Allows user to join a group, increases their group count and the group's user count
  joinGroup: (groupId, userId) => {
    models.User.findById(userId)
      .then(user => {
        models.Groups.findById(groupId)
          .then(group => {
            user
              .addGroups(group)
              .then(data => {
                return user.increment({
                  number_of_Groups: 1
                });
              })
              .then(data => {
                return group.increment({
                  group_members: 1
                });
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  },

  // Allows user to leave a group they are a part of, decrements their group count and the group's user count
  leaveGroup: (groupId, userId) => {
    models.User.findById(userId)
      .then(user => {
        models.Groups.findById(groupId)
          .then(group => {
            user
              .removeGroups(group)
              .then(data => {
                return user.decrement({
                  number_of_Groups: 1
                });
              })
              .then(data => {
                return group.decrement({
                  group_members: 1
                });
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  },

  // Finds and returns the top 5 groups by most users
  searchPopularGroups: (res) => {
    models.Groups.findAll({
      order: [["group_members", "DESC"]],
      limit: 5
      // again brings large array back, will have to select info we need here or server side
    }).then(groups => {
      let top5 = groups.map(group => {
        return { id: group.id, members: group.group_members };
      });
      let dataOut = {};
      if (top5) {
        for (let i = 0; i < top5.length; i++) {
          dataOut[`id${i + 1}`] = top5[i].id;
          dataOut[`count${i + 1}`] = top5[i].members;
        }
      }
      res.render("index", dataOut);
    });
  },

  // Finds and returns a specific group by group name
  findGroups: ids => {
    models.Groups.findAll({
      where: {
        group_name: models.Sequelize.or({ id: ids })
      },
      include: [
        {
          model: models.User,
          through: ["user_name"]
        }
      ]
    })
      .then(function(group) {})
      .catch(err => console.log(err));
  },

  // Allows creation of pre-planned 'events' and allows us to set the price and put a limit oh how many people can join the event [eventSpots])
  createEvent: (groupName, eventCost, eventSpots, route) => {
    models.Groups.create({
      group_name: groupName,
      is_event: true,
      eventCost: eventCost,
      eventSpots: eventSpots,
      route: route
    })
      .then(group =>
        console.log(
          group.get({
            plain: true
          })
        )
      )
      .catch(err => console.log(err));
  },

  findAllEvents: () => {
    models.Groups.findAll({
      where: {
        is_event: true
      }
    })
      .then(function(events) {
        console.log(events); //this info needs to be sifted through after it is sent back to the front end javascript
      })
      .catch(err => console.log(err));
  }
};

/*
module.exports.createGroup("Early Bird", 1,"Saladelia Cafe, 406 Blackwell St, Durham, NC 27701, USA&American Tobacco Campus, 318 Blackwell St, Durham, NC 27701&Bull City Burger and Brewery, 3318, 107 E Parrish St, Durham, NC 27701, USA");
module.exports.createGroup("Streets at Southpoint", 1, "Firebirds Wood Fired Grill, 8030 Renaissance Pkwy, Durham, NC 27713&Barnes and Noble, 8030 Renaissance Pkwy, Durham, NC 27713&The Cheesecake Factory, 8030 Renaissance Pkwy, Durham, NC 27713");
module.exports.createGroup("Nightlife Cabaret", 1, "Fullsteam Brewery, 726 Rigsbee Ave, Durham, NC 27701, USA&NanaSteak, 345 Blackwell St, Durham, NC 27701&West End Wine Bar of Durham, 601 W Main St, Durham, NC 27701, USA");
module.exports.createGroup("Baseball and Brews", 1, "Brightleaf Square, 905 W Main St, Durham, NC 27701&Durham Bulls Athletic Park, 409 Blackwell St, Durham, NC 27701, USA&Tyler's Restaurant & Taproom, 324 Blackwell St, Durham, NC 27701, USA");
module.exports.createGroup("One Night on Broadway", 1, "Bar Virgile, 105 S Mangum St, Durham, NC 27701&Durham Performing Arts Center, 123 Vivian Street, Durham, NC 27701&Luna Rotisserie and Empanadas, 112 W Main St, Durham, NC 27701");
*/

