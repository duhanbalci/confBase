const { parse } = require('querystring')
const uuid = require('uuid/v4')

module.exports = (req, res) => {
   const {email, password} = parse(req.body)
   if(!email) res.end('email cannot be empty')
   if(!password) res.end('password cannot be empty')

   const db = require('../db')
   
   //is user exists
   const user = db.get('users').filter({email, password}).value()
   if(user.length > 0) {
      const token = uuid()
      require('../tokens').set(token, user[0].email)
      return res.end(token)
   } else { 
      return res.end('wrong email or password')
   }

   
}