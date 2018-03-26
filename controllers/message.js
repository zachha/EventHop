/*
module.exports = (sequelize, DataTypes) => {
	const Message = sequelize.define('Message',{
		user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true,
            validate: {
                len: [6, 25]
                // ... 
            }
        },
	    message: {
	        type: DataTypes.TEXT,
	        allowNull: false,
	        notEmpty: true,
	        validate: {
                len: [6, 200]
	                // ... 
	            }
            }
        });
	    Message.associate = (models) => {
            Groups.belongsToOne(models.Group, {

                through: 'UserGroups',
                foreignKey: {
                    allowNull: false
                }
            });
            Groups.belongsToOne(models.User, {
                through: 'UserGroups',
                foreignKey: {
                    allowNull: false
                }
            });
        };
	return Message;
};
*/