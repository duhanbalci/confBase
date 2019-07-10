const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('users.json')
const db = lowdb(adapter)
db.defaults({
   users: [],
   options: {},
}).write()


module.exports = db