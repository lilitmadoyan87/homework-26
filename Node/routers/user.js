const { UserController } = require("../controller/UserController")
const { upload } = require("../upload")

const user = require("express").Router()

user.get("/myProducts", UserController.getProductMy)
user.get("/myWishlist", UserController.getWishlistMy)
user.post("/addProduct", upload.array("image"), UserController.addProduct)
user.post("/addWishlist/:id", UserController.addWishlist)
user.patch("/updateProduct/:id", upload.array("image"), UserController.updateProduct)
user.delete("/deleteProduct/:id", UserController.deleteProductById)
user.delete("/deleteWishlist/:id", UserController.deleteWishlistById)


module.exports = {user}