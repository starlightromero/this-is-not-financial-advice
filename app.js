require('dotenv').config()
const path = require('path')
const logger = require('morgan')
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const adviceRoutes = require('./routes/advice')

const app = express()

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(methodOverride('_method'))

app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use(adviceRoutes)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res) => {
  res.status(err.status || 500)
  res.render('error')
})

app.listen(process.env.PORT || 3000)

module.exports = app
