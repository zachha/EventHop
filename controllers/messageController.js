const models = require("../models");

module.exports = {

const findn = (group,n) => {
	return models.Message.findAll({
		where:{
			groupID:group
		},
		limit:n
	});
},const create = (username, groupid, userid, message) => {
	models.Message.create({
       user_name:username,
       message:message,
       groupID:groupid,
       userID:userid
	}).then(data => {
       
	}).catch(err =>{

	});
}


}


