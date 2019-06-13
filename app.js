const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')

require('dotenv').config()

const db = require('./config/database')
db.authenticate()
    .then( () => console.log('database connected'))
    .catch( err => console.log(err))

const app = express()

app.use(express.static(path.resolve(__dirname, './static')))
app.use(express.urlencoded({ extended: false }))

app.engine('handlebars', hbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use('/gigs', require('./routes/gigs'))

app.get('/', (req, res)=>{
    res.render('home')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log(`server listens on ${PORT}`))