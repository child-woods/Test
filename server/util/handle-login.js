const router = require('express').Router()
const axios = require('axios')

const baseUrl = 'http://cnodejs.org/api/v1'

router.post('login', function(req, res, next) {
  axios.post(`${baseUrl}/accesstoken`, {
    accesstoken: req.body.accesToken
  })
  .then(resq => {
    if(resq.status === 200 && resq.data.success) {
      req.session.user = {
        accesToken: req.body.accesToken,
        loginName: resq.data.loginname,
        id: resq.data.data,
        avatarUrl: resq.data.avatar_url
      }
      res.json({
        success: true,
        data: resq.data
      })
    }
  })
  .catch(err => {
    if(err.response) {
      res.json({
        success: false,
        data: err.response.data
      })
    }else {
      next(err)
    }
  })
})

module.exports = router
