module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
        name: Sequelize.STRING,
        picUrl: Sequelize.STRING,
    });
    return Category;
}