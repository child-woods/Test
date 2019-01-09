import React, { Component } from 'react'
import axios from 'axios'
/* eslint-disable */
class ApiTest extends Component {

  getTopics() {
    axios.get('/api/topics')
    .then(resq => {
      console.log(resq)
    }).catch(err => {
      console.log(err)
    })
  }

  login() {
    axios.post('/api/user/login', {
      accessToken:'GFJJJGMK'
    }).then(resq => {
      console.log(resq)
    }).catch(err => {
      console.log(err)
    })
  }

  markAll() {
    axios.post('/api/message/mark_all?needAccesssToken=true')
    .then(resq => {
      console.log(resq)
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <button onClick = {this.getTopics}>topics</button>
        <button onClick = {this.login}>login</button>
        <button onClick = {this.markAll}>markAll</button>
      </div>
    )
  }
}
export default ApiTest

/* eslint-enable */
