import { gql } from "@apollo/client";

export const LOCATION_INFO = gql`
  query {
    locationInfo {
      _id
      cityList
      districtList
      unitList
    }
  }
`;
