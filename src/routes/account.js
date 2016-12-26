const express = require('express')
const router = express.Router()

router.get('/register', (req, res) => {
  res.render('register.html')
})

router.get('/login', (req, res) => {
  res.render('login.html')
})

export default router
