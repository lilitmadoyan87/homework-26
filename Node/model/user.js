module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: Sequelize.STRING,
        surname: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        emailToken:Sequelize.STRING,
        isVerified: {
            type: Sequelize.TINYINT,
            defaultValue: 0
        },
        refreshToken:Sequelize.STRING,
        type:Sequelize.TINYINT                // նույն role է 
    });
    return User;
}

// type- 0-user, 1-admin