const models = require("../models");

const findn = (group,n) => {
	return models.Message.findAll({
		where:{
			groupID:group
		},
		limit:n
	});
}
