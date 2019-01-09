// 代理
const axios = require('axios')
const querystring = require('query-string')
const baseUrl = 'http://cnodejs.org/api/v1'

module.exports = function(req, res, next) {
  const path = req.path
  const user = req.session.user || {}
  const needAccessToken = req.needAccessToken

  // 判断是否登录
  if(needAccessToken && !user.accessToken) {
    res.status(401).send({
      success: false,
      msg: 'need login'
    })
  }

  const query = Object.assign({}, req.query, {
    accessToken: (needAccessToken && req.method === 'GET') ? user.accessToken : ''
  })
  if(query.needAccessToken) delete query.needAccessToken

  axios(`${baseUrl}${path}`, {
    method: req.method,
    params: query,
    data: querystring.stringify(Object.assign({}, req.body, {
      accessToken: (needAccessToken && req.method === 'POST') ? user.accessToken : ''
    })),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(resq => {
    if(resq.status === 200) {
      res.send(resq.data)
    } else {
      res.status(resq.status).send(resq.data)
    }
  }).catch(err => {
    if(err.response) {
      res.status(500).send(err.rsponse.data)
    } else {
      res.status(500).send({
        success: false,
        msg: '未知错误'
      })
    }
  })
}
