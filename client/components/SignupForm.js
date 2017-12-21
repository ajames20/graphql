import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import mutation from '../mutations/Signup';
import query from '../queries/CurrentUser';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      firstName: '',
      errors: [],
    };
  }

  onSubmit(event) {
    const { email, password, firstName } = this.state;
    event.preventDefault();
    this.onLogin({ email, password, firstName });
  }

  onLogin({ email, password, firstName }) {
    this.props
      .mutate({
        variables: { email, password, firstName },
        refetchQueries: [{ query }],
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(err => err.message);
        this.setState({ errors });
      });
    this.setState({ email: '', password: '', firstName: '', errors: [] });
  }

  render() {
    return (
      <div className="submit-form">
        <h2 className="submit-form__title">Sign Up</h2>
        <form className="submit-form__form" onSubmit={this.onSubmit.bind(this)}>
          <input
            className="submit-form__form--input"
            type="text"
            value={this.state.firstName}
            placeholder="First Name"
            onChange={e => this.setState({ firstName: e.target.value })}
          />
          <input
            className="submit-form__form--input"
            type="text"
            value={this.state.email}
            placeholder="Email"
            onChange={e => this.setState({ email: e.target.value })}
          />

          <input
            className="submit-form__form--input"
            type="password"
            value={this.state.password}
            placeholder="Password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          {this.state.errors.map(err => (
            <p className="submit-form__form--error" key={err}>
              {err}
            </p>
          ))}
          <button className="submit-form__form--button">Submit</button>
        </form>
      </div>
    );
  }
}

export default graphql(mutation)(SignupForm);
