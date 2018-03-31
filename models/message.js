module.exports = (db,DB) => {
    const Message = db.define('Message', {
        user_name: {
            type: DB.STRING,
            allowNull: false,
            notEmpty: true,
            validate: {
                len: [6, 25]
                // ... 
            }
        },
        message: {
                type: DB.TEXT,
                allowNull: false,
                notEmpty: true,
                validate: {
                    len: [6, 200]                   
                   // ... 
                }
            }
        });
    Message.associate = (models) => {
        Message.belongsTo(models.Groups, {
            through: 'GroupID',
            foreignKey: {
                allowNull: false
            }
        });
        Message.belongsTo(models.User, {
            through: 'UserID',
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Message;
};