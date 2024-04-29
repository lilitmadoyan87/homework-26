const { AdminController } = require("../controller/AdminController")
const { upload } = require("../upload")

const admin = require("express").Router()

admin.get("/users", AdminController.getUsers)
admin.get("/users/:id", AdminController.getUserById)
admin.post("/addCategory", upload.single("image"), AdminController.addCategory)
admin.patch("/updateCategory/:id", upload.single("image"), AdminController.updateCategory)
admin.delete("/deleteCategory/:id", AdminController.deleteCategory)
admin.delete("/deleteUser/:id", AdminController.deleteUserById)
admin.delete("/deleteProduct/:id", AdminController.deleteProductById)
admin.patch("/blockProduct/:id", AdminController.blockProductById)



module.exports = { admin }