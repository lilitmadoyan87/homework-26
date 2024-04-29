const express = require("express")
const { User } = require("../model/index")
const router = express.Router()
const passport = require('passport');
const { MainController } = require("../controller/MainController");
const Local = require("passport-local").Strategy

router.get('/profile', passport.authenticate('jwt', { session: false }), MainController.getProfile)
router.get('/categories', passport.authenticate('jwt', { session: false }), MainController.getCategory)
router.get('/categories/:id', passport.authenticate('jwt', { session: false }), MainController.getCategoryById)
router.get('/getProducts', passport.authenticate('jwt', { session: false }), MainController.getProducts)
router.get('/getProducts/:id', passport.authenticate('jwt', { session: false }), MainController.getProductById)
router.get('/getProductByCategory/?', passport.authenticate('jwt', { session: false }), MainController.getProductByCategoryId)


router.post('/register', MainController.register)

router.post('/login',
    passport.authenticate('local'), MainController.login);


passport.use('local', new Local(
    async function (username, password, done) {
        try {
            let user = await User.findOne({
                where: {
                    email: username
                }
            })
            if (user) {
                done(null, user)
            } else {
                done(null, false)
            }
        } catch (err) { }
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    let user = await User.findOne({
        where: {
            id: id
        }
    });
    done(null, user);
});

module.exports = router