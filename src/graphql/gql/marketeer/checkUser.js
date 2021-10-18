import gql from 'graphql-tag';

export const CHECK_USER = gql`
  mutation checkUser($_id: ID!) {
    checkUser(_id: $_id) {
      _id
      role
      firstName
      lastName
      status
      serviceType
      service {
        meatAmount
        serviceOption {
          title
          monthlyLimit
          price
          discount
          duration
          time
        }
      }
    }
  }
`;
