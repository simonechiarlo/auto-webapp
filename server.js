const port = process.env.PORT || 3000; // per h
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const fs = require('fs');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()


const initializePassport = require('./passport-config')
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const users = []
users.push(JSON.parse(process.env.DEFAULT_ADMIN))

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs')
})

app.get('/data', checkAuthenticated, (req, res) => {
    res.json([
        JSON.parse(fs.readFileSync('./data/patenti.json')),
        JSON.parse(fs.readFileSync('./data/vetture.json')),
        JSON.parse(fs.readFileSync('./data/manutenzioni.json'))
    ])
})



app.post('/data',checkAuthenticated,jsonParser, (req, res) => {
    console.log(req.body);
    if(req.body.vetture) fs.writeFileSync('./data/vetture.json', JSON.stringify(req.body.vetture));
    if(req.body.patenti) fs.writeFileSync('./data/patenti.json', JSON.stringify(req.body.patenti));
    if(req.body.manutenzioni) fs.writeFileSync('./data/manutenzioni.json', JSON.stringify(req.body.manutenzioni));
})

app.use(express.static(__dirname + '/public'));

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        //console.log(users);
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})

app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

app.listen(port)