import gql from 'graphql-tag';

export default gql`
  mutation Signup($email: String, $password: String, $firstName: String) {
    signup(email: $email, password: $password, firstName: $firstName) {
      email
      id
      firstName
    }
  }
`;
