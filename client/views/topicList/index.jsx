import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types'
import AppState from '../../stores/app-store'

@inject('appState')
@observer
class TopicList extends Component {
  constructor(props) {
    super(props)
    this.handleChangeName = this.handleChangeName.bind(this)
  }

  componentDidMount() {
    // do something here
  }

  asyncBootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 3
        resolve(true)
      })
    })
  }

  handleChangeName(event) {
    this.props.appState.changeName(event.target.value)
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleChangeName} />
        <span>{this.props.appState.msg}</span>
      </div>
    )
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}

export default TopicList
