const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('node_jwt', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

const User = require("./user")(sequelize, Sequelize)
const Category = require("./Category")(sequelize, Sequelize)
const Product = require("./Product")(sequelize, Sequelize)
const Wishlist = require("./Wishlist")(sequelize, Sequelize)
const Prodimage = require("./Prodimage")(sequelize, Sequelize)

Product.belongsTo(User, { onUpdate: "cascade", onDelete: "cascade" })
Product.belongsTo(Category, { onUpdate: "cascade", onDelete: "cascade" })
Prodimage.belongsTo(Product, { onUpdate: "cascade", onDelete: "cascade" })

Wishlist.belongsTo(Product, { onUpdate: "cascade", onDelete: "cascade" })
Wishlist.belongsTo(User, { onUpdate: "cascade", onDelete: "cascade" })

User.hasMany(Product, { onUpdate: "cascade", onDelete: "cascade" })
User.hasMany(Wishlist, { onUpdate: "cascade", onDelete: "cascade" })
Product.hasMany(Prodimage, { onUpdate: "cascade", onDelete: "cascade" })
Category.hasMany(Product, { onUpdate: "cascade", onDelete: "cascade" })






sequelize.sync()
module.exports = {
    User, Category, Product, Prodimage, Wishlist,
    sequelize
}