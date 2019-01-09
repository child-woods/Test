import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TopicList from '../views/topicList'
import TopicDetail from '../views/topicDetail'
import ApiTest from '../views/test/api-test'

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact key="first" />,
  <Route path="/list" component={TopicList} exact key="list" />,
  <Route path="/detail" component={TopicDetail} key="detail" />,
  <Route path="/test" component={ApiTest} />,
]
