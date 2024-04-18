const express = require('express')
const app = express()

app.use(express.static('assets'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Session opsætning
// secret = salt
const session = require('express-session')
app.use(session({
  secret: 'D97048B8-ABB9-424F-8FD3-7D0673417394'
}))

// Viewengine opsætning
app.set('view engine', 'pug')

app.get('/', (request, response)=>{
  response.render('home', {title: 'welcome to the pleasure dome', knownUser: request.session.isLoggedIn})
})

app.get('/login',(request, response)=>{
  response.render('login', {title: 'login', knownUser: request.session.isLoggedIn})
})

// Login
app.post('/auth', (request, response) => {
  const username = request.body.username
  const password = request.body.password
  if (username == 'ksd' && password == '123') {
    request.session.isLoggedIn = true
    request.session.username = username
    response.redirect('/')
    response.end()
  } else {
    response.redirect('http://www.dr.dk/nyheder')
  }
})

app.get('/logout', (request, response)=>{
  request.session.destroy()
  response.redirect('/')
})

app.get('/secretpage', (request, response)=>{
  if (request.session.isLoggedIn) {
    response.render('secret', {title: 'SECRET😳', knownUser: true})
  } else {
    response.redirect('/login')
  }
})

app.listen(8000, () => { console.log("Serveren kører") })