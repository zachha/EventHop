const models = require("../models");

module.exports = {
  // Allows the user to create a group and then links the user to the group
  createGroup: (req, res) => {
    console.log("req: ", req);
    models.Groups.create({
      group_name: req.groupInfo.groupName,
      route: req.groupInfo.route
    })
      .then(function(group) {
        models.User.findById(req.groupInfo.userId)
          .then(function(user) {
            user
              .addGroups(group)
              .then(user => {
                console.log(
                  "user: " + req.groupInfo.userId + " has created group: " + req.groupInfo.groupName + "!"
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
  joinGroup: (req, res) => {
    models.User.findById(req.idInfo.userId)
      .then(user => {
        models.Groups.findById(req.idInfo.groupId)
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
  leaveGroup: (req, res) => {
    models.User.findById(req.idInfo.userId)
      .then(user => {
        models.Groups.findById(req.idInfo.groupId)
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
    })
    .catch(err => console.log(err))
    .then(groups => {
      let top5 = groups.map(group => {
        return { 
          id: group.id,
          members: group.group_members,
          name: group.group_name,
          route: group.route 
        };
      });
      let dataOut = {};
      if (top5) {
        for (let i = 0; i < top5.length; i++) {
          dataOut[`id${i + 1}`] = top5[i].id;
          dataOut[`count${i + 1}`] = top5[i].members;
          dataOut[`name${i + 1}`] = top5[i].name;
          dataOut[`route${i + 1}`] = top5[i].route;
        }
      }
      res.render("index", dataOut);
    });
  },

  // Finds and returns a specific group by group name
  findGroups: (req, res) => {
    models.Groups.findAll({
      where: {
        group_name: req.groupName
      },
      include: [
        {
          model: models.User,
          through: ["user_name"]
        }
      ]
    })
      .catch(err => console.log(err))
      .then(function(group) {
        console.log(group.get({plain: true}))
      });
  },

  findAllGroups: (res) => {
    models.Groups.findAll({
      order: [["id", "DESC"]],
      raw: true
    })
    .catch(err => console.log(err))
    .then(users => console.log(users));
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
    .catch(err => console.log(err))
    .then(group =>
      console.log(
        group.get({
          plain: true
        })
      )
    );
  },

  findAllEvents: (res) => {
    models.Groups.findAll({
      where: {
        is_event: true
      }
    })
      .catch(err => console.log(err))
      .then(function(events) {
        console.log(events); //this info needs to be sifted through after it is sent back to the front end javascript
      });
  },

  deleteGroup: () => {
    models.Groups.destroy({
      where: {
        is_event: true
      }
    })
    .catch(err => console.log(err))
    .then((events) => console.log("events deleted!"));
  }
};

/*
module.exports.createGroup("Early Bird", 1, 5, 11, "Saladelia Cafe, 406 Blackwell St, Durham, NC 27701, USA&American Tobacco Campus, 318 Blackwell St, Durham, NC 27701&Bull City Burger and Brewery, 3318, 107 E Parrish St, Durham, NC 27701, USA");
module.exports.createGroup("South By Southpoint", 1, 6, 11, "Firebirds Wood Fired Grill, 8030 Renaissance Pkwy, Durham, NC 27713&Barnes and Noble, 8030 Renaissance Pkwy, Durham, NC 27713&The Cheesecake Factory, 8030 Renaissance Pkwy, Durham, NC 27713");
module.exports.createGroup("Nightlife Cabaret", 1, 3, 11, "Fullsteam Brewery, 726 Rigsbee Ave, Durham, NC 27701, USA&NanaSteak, 345 Blackwell St, Durham, NC 27701&West End Wine Bar of Durham, 601 W Main St, Durham, NC 27701, USA");
module.exports.createGroup("Baseball and Brews", 1, 10, 11, "Brightleaf Square, 905 W Main St, Durham, NC 27701&Durham Bulls Athletic Park, 409 Blackwell St, Durham, NC 27701, USA&Tyler's Restaurant & Taproom, 324 Blackwell St, Durham, NC 27701, USA");
module.exports.createGroup("One Night on Broadway", 1, 4, 11, "Bar Virgile, 105 S Mangum St, Durham, NC 27701&Durham Performing Arts Center, 123 Vivian Street, Durham, NC 27701&Luna Rotisserie and Empanadas, 112 W Main St, Durham, NC 27701");


module.exports.createGroup("BarHop", 10, 11, "Bull City Burger and Brewery, 3318, 107 E Parrish St, Durham, NC 27701, USA&Motorco Parts and Labor, 723 Rigsbee Ave, Durham, NC 27701&Fullsteam Brewery, 726 Rigsbee Ave, Durham, NC 27701");
module.exports.createGroup("Movie Date Night", 6, 11, "Dos Perros, 200 N Mangum St, Durham, NC 27701&Carolina Theater, 309 W Morgan St, Durham, NC 27701&Pinhook, 117 W Main St, Durham, NC 27701");
module.exports.createGroup("Spa Day", 7, 11, "Posh the Salon, 610 W Main St #101, Durham, NC 27701&Pine Cone Ice Cream and Coffee, 905 W Main St, Durham, NC 27701&James Kennedy Galleries, 905 W Main St, Durham, NC 27701");
module.exports.createGroup("Art and Coffee!", 8, 11, "Pleiades Arts, 109 E Chapel Hill St, Durham, NC 27701&Vega Metals Inc, 214 Hunt Street, Durham, NC 27701, United States, Durham, NC 27701&Beyu Caffe, 341 W Main St, Durham, NC 27701");
module.exports.createGroup("Brunch Crew", 11, 11, "Parker and Otis, 112 S Duke St, Durham, NC 27701&Pine Cone Ice Cream and Coffee, 905 W Main St, Durham, NC 27701&The Retreat at Brightleaf, 2042, 815 W Morgan St, Durham, NC 27701");
*/

//module.exports.deleteGroup();
//module.exports.findAllGroups();
