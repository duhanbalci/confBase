const { parse } = require('querystring')
const tokens = require('../tokens')
const fs = require('fs')

module.exports = (req, res) => {
   const { token, appName, config } = parse(req.body)
   if(!token) return res.end('token cannot be empty')
   if(!appName) return res.end('appName cannot be empty')

   const db = require('../db')
   
   //is token exists
   if(!tokens.has(token)) return res.end('wrong token')
   const user = db.get('users').filter({ email: tokens.get(token) }).value()
   if(user.length == 0) return res.end('user not found')
   
   const path = 'confs/' + user[0].id + '/' +  appName

   if(!fs.existsSync(path)) {
         res.end('there is not config for this app')
   } else {
      fs.readFile(path, 'utf8', (err, data) => {
         if(err) res.end('an error accured when reading the config file')
         res.end(data)
      })
   }
}