const bcrypt = require("bcrypt")
const UserDto = require('../dtos/user-dto');
const crypto = require("crypto")
const tokenService = require("./../service/token-service");
const { Category, Product, User, Prodimage } = require("../model");
const { Op } = require("sequelize");

class MainController {
    static async getProfile(req, res) {
        try {
            res.send({ user: req.user })
        } catch (e) {
            res.send({ error: "user invalid" })
        }
    }

    static async register(req, res, next) {
        try {
            const { name, surname, email, password } = req.body
            const canditate = await User.findOne({ where: { email: email } })
            if (canditate) {
                return res.status(401).send(`${email} is already exist!`)
            }
            const emailToken = await crypto.randomBytes(3).toString('hex').toUpperCase();

            const user = await User.create({ name, surname, email, password: bcrypt.hashSync(password, 10), emailToken, type: 0 });
            const userDto = new UserDto({ ...user.dataValues })
            const tokens = tokenService.generateToken({ ...userDto });
            await tokenService.saveToken(userDto.id, tokens.refreshToken);
            userDto.refreshToken = tokens.refreshToken;
            res.cookie('refreshToken', userDto.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            })
            res.send(userDto)
        } catch (e) {
            next(e)
        }
    }
    static async login(req, res) {
        try {
            if (req.user.isVerified == 1) {
                let comp = bcrypt.compareSync(req.body.password, req.user.password)
                if (comp) {
                    const userDto = new UserDto(req.user);
                    const tokens = await tokenService.generateToken({
                        ...userDto
                    });
                    await tokenService.saveToken(userDto.id, tokens.refreshToken);
                    res.cookie('refreshToken', tokens.refreshToken, {
                        maxAge: 30 * 24 * 60 * 60 * 1000,
                        httpOnly: true
                    })
                    userDto.refreshToken = tokens.refreshToken
                    res.send(userDto)
                } else {
                    res.send({
                        error: 'Wrong Username and/or Password'
                    })
                }
            } else {
                res.send({
                    verify: 'You have to verify your email'
                })
            }
        } catch (err) { }
    }

    static async getCategory(req, res) {
        try {
            const cat = await Category.findAll()
            res.send(cat)

        } catch (e) {
            res.send({ error: "Can't get categories" })
        }
    }

    static async getCategoryById(req, res) {
        try {
            const cat = await Category.findOne({ where: { id: req.params.id } })
            res.send(cat)
        } catch (e) {
            res.send({ error: "Can't get category" })
        }
    }

    static async getProducts(req, res) {
        try {
            const prods = await Product.findAll({
                where: {
                    active: {
                        [Op.ne]: 1
                    }
                },
                include: [Prodimage]
            })
            res.send({ prods })
        } catch (e) {
            res.send({ error: "Can't get products" })
        }
    }

    static async getProductById(req, res) {
        try {
            const prod = await Product.findOne({
                where: {
                    id: req.params.id,
                    active: {
                        [Op.ne]: 1
                    }
                }, include: [Prodimage]
            })
            res.send({ prod })
        } catch (e) {
            res.send({ error: "Can't get product" })
        }
    }

    static async getProductByCategoryId(req, res) {
        try {
            const cat = await Category.findOne({ where: { name: req.query.name } })
            const prods = await Product.findAll({
                where: {
                    categoryId: cat.id,
                    active: {
                        [Op.ne]: 1
                    }
                }, include: [Prodimage]
            })
            res.send({ prods })
        } catch (e) {
            res.send({ error: "Can't get products" })
        }
    }
}

module.exports = { MainController }