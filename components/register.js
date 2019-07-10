const { parse } = require('querystring')
const fs = require('fs')

module.exports = (req, res) => {
   const {email, password} = parse(req.body)
   if(!email) res.end('email cannot be empty')
   if(!password) res.end('password cannot be empty')

   const db = require('../db')
   
   //is user exists
   if(db.get('users').filter({email}).value().length > 0) return res.end('email already in use')
   

   const id = require('uuid/v1')()
   db.get('users').push({id, email, password}).write()
   fs.mkdir('confs/' + id, err => {
      if(err) res.end('error when creating user directory')
      res.end('ok')
   })

   
}