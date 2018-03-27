const models = require('../models');

// function for user to create username and password for user authentication
function createUser(userName, password) {
    models.User.create({
        user_name: userName,
        password: password
    })
    .then(data => console.log(data.dataValues))
    .catch(err => console.log(err));
}

// Allows user to change their password
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
// Allows the user to create a group and then links the user to the group
// FIX CONSOLE.LOG AT SOME POINT !! 
function createGroup(groupname, userId) {
    models.Groups.create({
        group_name: groupname
    })
    .then( function(group) { 
        models.User.findById(userId)
        .then( function (user) {
            user.addGroups(group).then( user => {
                console.log("user: " + userId + " has created group: " + groupname + "!");
            });
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));      
}

// FINISH THIS FUNCTION
/*
function leaveGroup(groupId, userId) {
    models.User.findById(userId)
    .then( user => {
        models.Groups.findById(groupId)
        .then( group => {
            user.
        })
    })
}
*/

// Finds and returns the top 5 groups by most users
function searchPopularGroups() {
    models.Groups.findAll({
        order: [
            ['group_members', 'DESC']
        ],
        limit: 3
        // again brings large array back, will have to select info we need here or server side
    }).then( groups => console.log(groups));
}

function searchGroup(groupName) {
   models.Groups.findOne({
     where: {
       group_name: groupName
     },
   }).then(function(group) {
     console.log(group.dataValues);
   }).catch(err => console.log(err)); 
}


function findAllEvents() {
    models.Groups.findAll({
        where: {
            is_event: true
        }
    }).then(function (events) {
        console.log(events); //this info needs to be sifted through after it is sent back to the front end javascript    
    })
    .catch(err => console.log(err));
}
// Allows creation of pre-planned 'events' and allows us to set the price and put a limit oh how many people can join the event [eventSpots])
function createEvent(groupName, eventCost, eventSpots, route) {
    models.Groups.create({
        group_name: groupName,
        is_event: true,
        eventCost: eventCost,
        eventSpots: eventSpots,
        route: route
    }).then(group => console.log(group.get({
        plain: true
    }))).catch(err => console.log(err));
}

function groupIncrement() {

}
