import { gql } from "@apollo/client";

export const GET_USER_SERVICE_INFO = gql`
  query getUserServiceInfo($userId: ID!) {
    getUserServiceInfo(userId: $userId) {
      meatAmount
      serviceOption {
        _id
        title
        description
        listTitle
        includedInService
        monthlyLimit
        discount
        price
        duration
        time
      }
    }
  }
`;

export const GET_MY_SERVICE_INFO = gql`
  query getMyServiceInfo {
    getMyServiceInfo {
      meatAmount
      serviceOption {
        _id
        title
        description
        listTitle
        includedInService
        monthlyLimit
        discount
        price
        duration
        time
      }
    }
  }
`;

export const UPDATE_USER_SERVICE_INFO = gql`
  mutation updateUserServiceInfo($serviceOption: ID, $userId: ID!) {
    updateUserServiceInfo(serviceOption: $serviceOption, userId: $userId) {
      meatAmount
      serviceOption {
        _id
        title
        description
        listTitle
        includedInService
        monthlyLimit
        discount
        price
        duration
        time
      }
    }
  }
`;
