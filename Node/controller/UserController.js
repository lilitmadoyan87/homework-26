const { Product, Prodimage, Wishlist } = require("../model")

class UserController {

    static async addProduct(req, res) {
        try {
            if (req.files) {
                const { image, ...prod } = req.body
                const prodNew = await Product.create({ ...prod, active: 0, userId: req.user.id })
                for (let e in req.files) {
                    await Prodimage.create({ picUrl: req.files[e].filename, productId: prodNew.id })
                }
            } else {
                res.send({ message: "Image is important" })
            }
            res.send({ message: "Product was successfully added" })
        } catch (e) {
            res.send({ message: "Product was not added", error: true })
        }
    }

    static async updateProduct(req, res) {
        try {
            const prod = await Product.findOne({ where: { id: req.params.id } })
            const { image, category, ...prods } = req.body
            if (prod.userId == req.user.id) {
                if (prod.active == 1 && category) {
                    await Product.update({ ...prods, category, active: 0 }, { where: { id: req.params.id } })
                } else if (prod.active == 1 && category == undefined) {
                    res.send({ message: "Category was not updated" })
                    return 
                } else {
                    await Product.update({ ...prods, category }, { where: { id: req.params.id } })
                }
                if (req.files) {
                    for (let e in req.files) {
                        await Prodimage.update({ picUrl: req.files[e].filename }, { where: { productId: req.params.id } })
                    }
                }
                res.send({ message: "Product was successfully updated" })
            } else {
                res.send({ message: "You don't have permition", error: true })
            }
        } catch (e) {
            res.send({ message: "Product was not updated", error: true })
        }
    }

    static async deleteProductById(req, res) {
        try {
            const prod = await Product.findOne({ where: { id: req.params.id } })
            if (prod.userId == req.user.id) {
                await Product.destroy({ where: { id: req.params.id } })
                const image = await Prodimage.findOne({ where: { productId: req.params.id } })
                if (image) {
                    await Prodimage.destroy({ where: { productId: req.params.id } })
                }
                res.send({ message: "Product was successfully deleted" })
            } else {
                res.send({ message: "You don't have permition", error: true })
            }
        } catch (e) {
            res.send({ message: "Product was not deleted", error: true })
        }
    }

    static async getProductMy(req, res) {
        try {
            const data = await Product.findAll({ where: { userId: req.user.id }, include: [Prodimage] })
            res.send(data)
        } catch (e) {
            res.send({
                error: 'user invalid'
            })
        }
    }

    static async addWishlist(req, res) {
        try {
            await Wishlist.create({ productId: req.params.id, userId: req.user.id })
            res.send({ message: "Product was added to wishlist" })
        } catch (e) {
            res.send({ message: "Product was not added to wishlist", error: true })
        }
    }

    static async getWishlistMy(req, res) {
        try {
            const data = await Wishlist.findAll({
                include: {
                    model: Product,
                    where: {
                        userId: req.user.id,
                    }
                }
            })
            res.send({ data })
        } catch (e) {
            res.send({ message: "'user invalid'", error: true })
        }
    }

    static async deleteWishlistById(req, res) {
        try {
            const wish = await Wishlist.findOne({ where: { productId: req.params.id } })
            if (wish.userId == req.user.id) {
                await Wishlist.destroy({ where: { productId: req.params.id } })
                res.send({ message: "Product was successfully deleted form wishlist" })
            } else {
                res.send({ message: "You don't have permition", error: true })
            }
        } catch (e) {
            res.send({ message: "Product was not deleted from wishlist", error: true })
        }
    }
}

module.exports = { UserController }