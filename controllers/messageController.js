const models = require("../models");

const findn = (group,n) => {
	models.Message.findAll({
		where:{
			groupID:group
		},
		limit:n
	}).then(data => res.json(data.get{plain:true}));
}
