const express = require ("express")
const ReactSSR = require ("react-dom/server")
const fs = require('fs')  // 读取文件模块
const path = require('path')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const session = require('express-session')

const isDev = process.env.NODE_ENV === 'development'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid',
  resave: false,
  saveUninitialized: false,
  secret: 'react cnode class'
}))

app.use(favicon(path.join(__dirname,'../favicon.ico')))


app.use('/api/user',require('./util/handle-login'))
app.use('/api',require('./util/proxy'))

if(!isDev) {
  const serverEntry = require("../dist/server-entry").default
  console.log(serverEntry)
  // 同步的读取dist/index.html文件
  const template  = fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf8')
  // 静态资源
  app.use('/public',express.static(path.join(__dirname,'../dist')))
  app.get('*',function(req,res){
    const appString = ReactSSR.renderToString(serverEntry)
    res.send(template.replace('<!-- app -->',appString))   // 把template.html下的<app></app>替换成appString
  })
}else {
  const devStatic = require('./util/dev.static')
  devStatic(app)
}


app.listen(3333,function(){
  console.log('http://localhost:3333');
})
