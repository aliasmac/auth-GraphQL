import React, { Component } from "react";
import {graphql, compose} from 'react-apollo'
import {hashHistory} from 'react-router'

import mutation from '../mutations/Signup'
import query from '../queries/CurrentUser'

import AuthForm from './AuthForm'


class SignupForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      errors: []
    }
  }

  onSubmit({email, password}) {
    this.props.mutate({
      variables: {email, password},
      refetchQueries: [{query}],
      // awaitRefetchQueries: true,
    })
    .catch(res => {
      const errors = res.graphQLErrors.map(err => err.message)
      this.setState({errors})
    })
  }

  componentWillUpdate(nextProps) {
    // this.props // the old, current set of props
    // nextProps // the next set of props that will be in place when the compoentn rerenders
    if (!this.props.data.user && nextProps.data.user) {
      hashHistory.push('/dashboard')
    }
  }

  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <AuthForm onSubmit={this.onSubmit.bind(this)} errors={this.state.errors}/>
      </div>
    );
  }
}

export default compose(
  graphql(query),
  graphql(mutation)
)(SignupForm);

