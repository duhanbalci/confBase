const http = require('http')
const HttpDispatcher = require('httpdispatcher')
const dispatcher = new HttpDispatcher();
const fs = require('fs')

const registerRoute = require('./components/register')
dispatcher.onPost('/register', registerRoute)

const loginRoute = require('./components/login')
dispatcher.onPost('/login', loginRoute)

const sendRoute = require('./components/send')
dispatcher.onPost('/send', sendRoute)

const getRoute = require('./components/get')
dispatcher.onPost('/get', getRoute)

http.createServer((req, res) => dispatcher.dispatch(req, res))
   .listen(3000, () => console.log(`server started at http://127.0.0.1:3000/`))

// create confs folder if not exists
if(!fs.existsSync('confs/')) fs.mkdir('confs', err => err ? console.error(err): '')