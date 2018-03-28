module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        user_name: {
            type: DataTypes.STRING,
            notNull: false,
            validate: {
                len: [1, 50]
                // will have to escape out of coding characters here
            }
        },
        // There are some more validations through sequelize we can use, not sure how it will work with passport or jwt yet though
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true,
            validate: {
                len: [1, 50]
                // ... 
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
            validate: {
                len: [1, 50],
                isEmail: true
            }
        },
        user_route_one: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        user_route_two: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        user_route_three: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        number_of_Groups: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }

    });

    User.associate = function(models) {
        models.User.belongsToMany(models.Groups, {
            through: 'UserGroups'
        });
    };

    return User;
}