module.exports.typeUser = (req, res, next)=>{
    if(req.user.type == 0){
        return next()
    }
    return res.send("user type invalid")
}
module.exports.typeAdmin = (req, res, next)=>{
    if(req.user.type == 1){
        return next()
    }
    return res.send("admin type invalid")
}