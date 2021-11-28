import { gql } from '@apollo/client';

export const GET_ALL_MEMBERSHIP_TYPES = gql`
  query getMembershipTypes {
    getAllMembershipTypes {
      _id
      type_name
      position
      monthly_pay
      listFeatures
      member_img {
        path
      }
    }
  }
`;
