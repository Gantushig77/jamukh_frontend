import gql from 'graphql-tag';

export const GET_LIST_OF_COMBINED_ORDERS = gql`
  query getListOfCombinedOrders($marketeerId: ID, $status: String, $archived: Boolean) {
    getListOfCombinedOrders(
      marketeerId: $marketeerId
      status: $status
      archived: $archived
    ) {
      _id
      marketeerId
      operatorId
      goodsName
      initDate
      deliveryDate
      goodsType
      price
      status
      amountkg
      archived
      paid
      marketeer {
        _id
        name
        coverImg
        star
        phone
        address
      }
      userId
      modifiedDate
      orderedFrom
      user {
        _id
        username
        firstName
        lastName
        email
        avatar {
          path
        }
      }
      priceModified
      locationInfo {
        city
        district
        unit
        email
        fullName
        address
        phone
      }
    }
  }
`;

export const GET_LIST_OF_MARKETEER_ORDERS = gql`
  query getListOfMarketeerOrders($marketeerId: ID, $status: String, $archived: Boolean) {
    getListOfMarketeerOrders(
      marketeerId: $marketeerId
      status: $status
      archived: $archived
    ) {
      _id
      marketeerId
      operatorId
      goodsName
      initDate
      deliveryDate
      goodsType
      price
      status
      amountkg
      archived
      paid
      marketeer {
        _id
        name
        coverImg
        star
        phone
        address
      }
    }
  }
`;

export const GET_SINGLE_MARKETEER_ORDER = gql`
  query getSingleMarketeerOrder {
    getSingleMarketeerOrder {
      _id
      marketeerId
      operatorId
      goodsName
      initDate
      goodsType
      price
      status
      amountkg
      archived
    }
  }
`;

export const CREATE_MARKETEER_ORDER = gql`
  mutation createMarketeerOrder(
    $marketeerId: ID
    $operatorId: ID
    $goodsId: ID
    $goodsName: String
    $goodsType: String
    $price: Float
    $status: String
    $amountkg: Float
    $archived: Boolean
  ) {
    createMarketeerOrder(
      marketeerId: $marketeerId
      operatorId: $operatorId
      goodsId: $goodsId
      goodsName: $goodsName
      goodsType: $goodsType
      price: $price
      status: $status
      amountkg: $amountkg
      archived: $archived
    ) {
      _id
      marketeerId
      operatorId
      goodsName
      initDate
      goodsType
      price
      status
      amountkg
    }
  }
`;

export const UPDATE_MARKETEER_ORDER = gql`
  mutation updateMarketeerOrder(
    $_id: ID
    $marketeerId: ID
    $operatorId: ID
    $goodsId: ID
    $goodsName: String
    $goodsType: String
    $price: Float
    $status: String
    $amountkg: Float
    $archived: Boolean
    $paid: Boolean
    $paidDate: Date
    $orderType: String
  ) {
    updateMarketeerOrder(
      _id: $_id
      archived: $archived
      marketeerId: $marketeerId
      operatorId: $operatorId
      goodsId: $goodsId
      goodsName: $goodsName
      goodsType: $goodsType
      price: $price
      status: $status
      amountkg: $amountkg
      paid: $paid
      paidDate: $paidDate
      orderType: $orderType
    ) {
      _id
      marketeerId
      operatorId
      goodsName
      initDate
      paidDate
      goodsType
      price
      paid
      status
      amountkg
    }
  }
`;

export const DELETE_MARKETEER_ORDER = gql`
  mutation deleteMarketeerOrder($_id: ID) {
    deleteMarketeerOrder(_id: $_id) {
      _id
    }
  }
`;

export const GET_LIST_OF_ALL_GOODS = gql`
  query getListOfAllGoods($active: Boolean) {
    getListOfAllGoods(active: $active) {
      _id
      name
      children {
        _id
        name
        isUnit
        parentId
        price
        total
      }
    }
  }
`;
