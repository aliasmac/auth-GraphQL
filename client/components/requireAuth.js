import React, {Component} from 'react'
import {graphql} from 'react-apollo'
import {hashHistory} from 'react-router'

import currentUserQuery from '../queries/CurrentUser'

export default (WrappedComponent) => {
  class RequireAuth extends Component {
    componentDidUpdate() {
      console.log(this.props.data.loading, this.props.data.user)
      if (!this.props.data.loading && !this.props.data.user) {
        hashHistory.push('/login')
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
  
  return graphql(currentUserQuery)(RequireAuth)
}




