const { parse } = require('querystring')
const tokens = require('../tokens')
const fs = require('fs')

module.exports = (req, res) => {
   const { token, appName, config } = parse(req.body)
   if(!token) return res.end('token cannot be empty')
   if(!appName) return res.end('appName cannot be empty')
   if(!config) return res.end('config cannot be empty')

   const db = require('../db')
   
   //is token exists
   if(!tokens.has(token)) return res.end('wrong token')
   const user = db.get('users').filter({ email: tokens.get(token) }).value()
   if(user.length == 0) return res.end('user not found')
   console.log(user[0].id)
   
   if(!fs.existsSync('confs/' + user[0].id)) {
      fs.mkdir('confs/' + user[0].id, err => {
         if(err) res.end('error accured when creating user directory')
         fs.writeFile('confs/' + user[0].id + '/' + appName + '.json', config, 'utf8', err => {
            if(err) res.end('error accured when saving config to system')
            res.end('ok')
         })
      })
   } else {
      fs.writeFile('confs/' + user[0].id + '/' + appName + '.json', config, 'utf8', err => {
         if(err) res.end('error accured when saving config to system')
         res.end('ok')
      })
   }
}