import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: [],
    };
  }

  onSubmit(event) {
    const { email, password } = this.state;
    event.preventDefault();
    this.onLogin({ email, password });
  }

  onLogin({ email, password }) {
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query }],
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(err => err.message);
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div className="login">
        <h2>Login</h2>
        <form className="login__form" onSubmit={this.onSubmit.bind(this)}>
          <input
            type="text"
            value={this.state.email}
            placeholder="Email"
            onChange={e => this.setState({ email: e.target.value })}
          />

          <input
            type="password"
            value={this.state.password}
            placeholder="Password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          {this.state.errors.map(err => <p key={err}>{err}</p>)}
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default graphql(mutation)(LoginForm);
