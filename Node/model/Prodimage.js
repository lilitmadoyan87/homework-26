module.exports = (sequelize, Sequelize) => {
    const Prodimage = sequelize.define("prodimage", {
        picUrl: Sequelize.STRING,
    });
    return Prodimage;
}