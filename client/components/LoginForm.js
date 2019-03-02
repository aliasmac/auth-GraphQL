import React, { Component } from "react";
import {graphql, compose} from 'react-apollo'
import {hashHistory} from 'react-router'

import mutation from '../mutations/Login'
import query from '../queries/CurrentUser'

import AuthForm from './AuthForm'

class LoginForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
  }

  onSubmit({email, password}) {
    this.props.mutate({
      variables: {email, password},
      refetchQueries: [{query}]
    })
    .catch(res => {
      const errors = res.graphQLErrors.map(err => err.message)
      this.setState({errors})
    })
  }

  componentWillUpdate(nextProps) {
    if (!this.props.data.user && nextProps.data.user) {
      hashHistory.push('/dashboard')
    }
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <AuthForm onSubmit={this.onSubmit.bind(this)} errors={this.state.errors}/>
      </div>
    );
  }
}

export default compose(
  graphql(query),
  graphql(mutation)
)(LoginForm);

