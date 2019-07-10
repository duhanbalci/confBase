const http = require('http')
const HttpDispatcher = require('httpdispatcher')
const dispatcher = new HttpDispatcher();

const registerRoute = require('./components/register')
dispatcher.onPost('/register', registerRoute)

const loginRoute = require('./components/login')
dispatcher.onPost('/login', loginRoute)

const sendRoute = require('./components/send')
dispatcher.onPost('/send', sendRoute)

http.createServer((req, res) => dispatcher.dispatch(req, res))
   .listen(3000, () => console.log(`server started at http://127.0.0.1:3000/`))

/*
if(req.method == 'POST') {
   let body = ''
   req.on('data', data => {
      body += data.toString()
      if(body.length > 1e6) req.connection.destroy()
   })

   req.on('end', () => {
      res.writeHead(200, {'Content-Type': 'text/html'})
      req.body = parse(body)
      
      switch (req.url) {
         case '/user/register':
         case '/user/register/':
            res.end('register')
            break;
         case '/user/login':
         case '/user/login/':
            res.end('login')
            break;
         case '/user/send':
         case '/user/send/':
            res.end('send')
            break;
         case '/user/get':
         case '/user/get/':
            res.end('get')
            break;
         default:
            res.end('not found')
            break;
      }
   })
}
*/
