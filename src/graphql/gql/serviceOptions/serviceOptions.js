import { gql } from "@apollo/client";

export const GET_SERVICE_OPTIONS_LIST = gql`
  query getListOfServiceOptions {
    getListOfServiceOptions {
      _id
      title
      description
      listTitle
      includedInService
      price
      time
    }
  }
`;
export const GET_SERVICE_OPTION_DETAIL = gql`
  query getServiceOption($_id: ID) {
    getServiceOption(_id: $_id) {
      _id
      title
      description
      listTitle
      includedInService
      price
      time
      duration
      monthlyLimit
    }
  }
`;
