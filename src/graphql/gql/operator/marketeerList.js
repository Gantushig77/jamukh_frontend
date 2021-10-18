import gql from "graphql-tag";

export const GET_LIST_OF_MARKETEERS = gql`
    query getListOfMarketeers ($status: String) {
        getListOfMarketeers (
            status: $status
        ) {
            _id
            username
            operatorId
            name
            coverImg
            description
            star
            phone
            openHours
            address
            shipping
            status
            location {
                latitude
                longitude
            }
            createdDate
        }
    }
`;

export const GET_MARKETEER = gql`
    query getMarketeer($_id: ID!) {
        getMarketeer (
            _id: $_id
        ){
            _id
            username
            operatorId
            name
            coverImg
            description
            star
            phone
            openHours
            address
            shipping
            location {
                latitude
                longitude
            }
            createdDate
        }
    }
`;

export const CREATE_MARKETEER = gql`
    mutation createMarketeer (
        $username: String!,
        $password: String!,
        $operatorId: ID!,
        $name: String!,
        # $coverImg: String,
        $description: String,
        # $star: Float,
        $phone: String,
        $openHours: String!,
        $address: String!,
        $shipping: String,
        # $location: Input
    ) {
        createMarketeer(
            username: $username,
            password: $password,
            operatorId: $operatorId,
            name: $name,
            # coverImg: $coverImg,
            description: $description,
            # star: $star,
            phone: $phone,
            openHours: $openHours,
            address: $address,
            shipping: $shipping,
            # location: $location
        ) {
            _id
            username
            operatorId
            name
            coverImg
            description
            star
            phone
            openHours
            address
            shipping
            location {
                latitude
                longitude
            }
            createdDate
        }
    }
`;

export const UPDATE_MARKETEER = gql`
    mutation updateMarketeer (
        $_id: ID!,
        $username: String,
        $operatorId: ID,
        $name: String,
        $coverImg: String,
        $description: String,
        $star: Float,
        $phone: String,
        $openHours: String,
        $address: String,
        $shipping: String,
        $status: String,
        # $location: Input
    ) {
        updateMarketeer(
            _id: $_id,
            username: $username,
            operatorId: $operatorId,
            name: $name,
            coverImg: $coverImg,
            description: $description,
            star: $star,
            phone: $phone,
            openHours: $openHours,
            address: $address,
            shipping: $shipping,
            status: $status,
            # location: $location
        ) {
            _id
            username
            operatorId
            name
            coverImg
            description
            star
            phone
            openHours
            address
            shipping
            status
            # location {
            #     latitude
            #     longitude
            # }
            createdDate
        }
    }
`;

export const DELETE_MARKETEER = gql`
    mutation deleteMarketeer(
        $_id: ID
    ) {
        deleteMarketeer(
            _id: $_id
        )  
    }
`