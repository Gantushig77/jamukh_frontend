import { gql } from '@apollo/client';

export const GET_ALL_MEMBERSHIP_TYPES = gql`
  query getMembershipTypes($type_name: String, $position: Float, $monthly_pay: Float) {
    getAllMembershipTypes(
      type_name: $type_name
      position: $position
      monthly_pay: $monthly_pay
    ) {
      _id
      type_name
      position
      monthly_pay
      member_img {
        path
      }
    }
  }
`;
