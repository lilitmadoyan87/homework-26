const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const router = require('./routers/router');
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 8080;
const cors = require('cors');
const { admin } = require('./routers/admin');
const { user } = require('./routers/user');
const { typeUser, typeAdmin } = require('./middleware/type');

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

app.use(cors({
    origin: "http://localhost:3000/*"
}))

// app.use(cors())  բոլորը 
app.use(session({
    secret: 'topSecret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true } // resave, saeUninitialized պետք է լինեն true
}));

app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session())

require('./middleware/passport')(passport);
app.use('/', router);
app.use('/user', passport.authenticate('jwt', { session: false }), typeUser, user);
app.use('/admin', passport.authenticate('jwt', { session: false }), typeAdmin, admin);

app.listen(port, () => console.log(`listening  http://localhost:${port}`))
