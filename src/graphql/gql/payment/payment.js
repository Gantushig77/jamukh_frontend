import { gql } from "@apollo/client";

export const PAYMENT_SUBSCRIPTION = gql`
  subscription payment($billNo: String!) {
    payment(billNo: $billNo) {
      billNo
      invoceId
      paid
    }
  }
`;
