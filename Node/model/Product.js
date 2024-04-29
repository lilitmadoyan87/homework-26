module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        name: Sequelize.STRING,
        price: Sequelize.INTEGER,
        count: Sequelize.INTEGER,
        description: Sequelize.STRING,
        active: Sequelize.TINYINT,

    });
    return Product;
}