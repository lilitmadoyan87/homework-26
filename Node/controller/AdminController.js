const { Op } = require("sequelize")
const { Category, Product, User } = require("../model")

class AdminController {

    static async addCategory(req, res) {
        try {
            const { name } = req.body
            const cat = await Category.findOne({ where: { name } })
            if (cat) {
                res.send({ message: "Category exists", error: true })
            } else {
                if (req.file) {
                    await Category.create({ name, picUrl: req.file.filename })
                    res.send({ message: "Categoy was succesfully added" })
                } else {
                    res.send({ message: "Category image is important", error: true })

                }
            }
        } catch (e) {
            res.send({ message: "Category was not added", error: true })
        }
    }

    static async updateCategory(req, res) {
        try {
            const { name } = req.body
            const cat = await Category.findOne({ where: { name } })
            if (cat) {
                res.send({ message: "Category exists", error: true })
            } else {
                if (req.file) {
                    await Category.update({ name, picUrl: req.file.filename }, { where: { id: req.params.id } })
                    res.send({ message: "Categoy was succesfully updated" })
                } else {
                    res.send({ message: "Category image is important", error: true })

                }
            }
        } catch (e) {
            res.send({ message: "Category was not updated", error: true })
        }
    }

    static async deleteCategory(req, res) {
        try {
            await Category.destroy({ where: { id: req.params.id } })
            res.send({ message: "Category was successfully deleted", error: true })
        } catch (e) {
            res.send({ message: "Category was not deleted", error: true })
        }
    }

    static async deleteUserById(req, res) {
        try {
            await User.destroy({ where: { id: req.params.id } })
            res.send({ message: "User was deleted", error: true })
        } catch (e) {
            res.send({ message: "User was not deleted", error: true })
        }
    }

    static async deleteProductById(req, res) {
        try {
            await Product.destroy({ where: { id: req.params.id } })
            res.send({ message: "Product was deleted", error: true })
        } catch (e) {
            res.send({ message: "Product was not deleted", error: true })
        }
    }

    static async blockProductById(req, res) {
        try {
            await Product.update({active: 1}, {where: {id: req.params.id}})
            res.send({ message: "Product was blocked", error: true })
        } catch (e) {
            res.send({ message: "Product could not be blocked", error: true })
        }
    }

    static async getUsers(req, res) {
        try {
            const users = await User.findAll({
                where: {
                    id: {
                        [Op.ne]: req.user.id
                    }
                }
            })
            res.send(users)
        } catch (e) {
            res.send({ message: "Can't get users", error: true })
        }
    }

    static async getUserById(req, res) {
        try {
            const user = await User.findOne({ where: { id: req.params.id } })
            res.send(user)
        } catch (e) {
            res.send({ message: "Can't get user", error: true })
        }
    }
}

module.exports = { AdminController }