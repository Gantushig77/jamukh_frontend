import gql from 'graphql-tag';

export const GET_LIST_OF_USER_ORDER = gql`
  query getListOfUserOrders(
    $userId: ID
    $marketeerId: ID
    $goodsName: String
    $initDate: Date
    $paidDate: Date
    $shippingDate: Date
    $deliveryDate: Date
    $goodsType: String
    $price: Float
    $status: String
    $amountkg: Float
  ) {
    getListOfUserOrders(
      userId: $userId
      marketeerId: $marketeerId
      goodsName: $goodsName
      initDate: $initDate
      paidDate: $paidDate
      shippingDate: $shippingDate
      deliveryDate: $deliveryDate
      goodsType: $goodsType
      price: $price
      status: $status
      amountkg: $amountkg
    ) {
      _id
      userId
      marketeerId
      goodsName
      initDate
      paidDate
      shippingDate
      deliveryDate
      canceledDate
      goodsType
      price
      paid
      status
      amountkg
      user {
        _id
        firstName
        username
        avatar {
          path
        }
      }
      vat {
        _id
        vat_id
        amount
        vat_amount
        ebarimt_qr_data
        ebarimt_lottery
        created_date
        city_tax_amount
        status
        barimt_status
        g_wallet_id
        g_wallet_customer_id
        ebarimt_receiver_type
        g_merchant_id
        g_payment_id
        paid_by
        object_id
        note
        barimt_status_date
      }
      marketeer {
        _id
        username
        name
        address
      }
    }
  }
`;

export const GET_SINGLE_USER_ORDER = gql`
  query getSingleUserOrder($_id: ID) {
    getSingleUserOrder(_id: $_id) {
      _id
      userId
      marketeerId
      goodsName
      initDate
      paidDate
      shippingDate
      deliveryDate
      canceledDate
      goodsType
      price
      status
      amountkg
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER_ORDER = gql`
  mutation createUserOrder(
    $userId: ID!
    $marketeerId: ID
    $goodsId: ID
    $goodsName: String
    $initDate: Date
    $paidDate: Date
    $shippingDate: Date
    $deliveryDate: Date
    $goodsType: String
    $price: Float
    $status: String
    $amountkg: Float
  ) {
    createUserOrder(
      userId: $userId
      goodsId: $goodsId
      marketeerId: $marketeerId
      goodsName: $goodsName
      initDate: $initDate
      paidDate: $paidDate
      shippingDate: $shippingDate
      deliveryDate: $deliveryDate
      goodsType: $goodsType
      price: $price
      status: $status
      amountkg: $amountkg
    ) {
      _id
      userId
      marketeerId
      goodsName
      initDate
      paidDate
      shippingDate
      deliveryDate
      canceledDate
      orderedFrom
      goodsType
      price
      status
      amountkg
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_USER_ORDER = gql`
  mutation updateUserOrder(
    $_id: ID!
    $userId: ID
    $marketeerId: ID
    $goodsName: String
    $initDate: Date
    $paidDate: Date
    $shippingDate: Date
    $deliveryDate: Date
    $goodsType: String
    $price: Float
    $status: String
    $amountkg: Float
  ) {
    updateUserOrder(
      _id: $_id
      userId: $userId
      marketeerId: $marketeerId
      goodsName: $goodsName
      initDate: $initDate
      paidDate: $paidDate
      shippingDate: $shippingDate
      deliveryDate: $deliveryDate
      goodsType: $goodsType
      price: $price
      status: $status
      amountkg: $amountkg
    ) {
      _id
      userId
      marketeerId
      goodsName
      initDate
      paidDate
      shippingDate
      deliveryDate
      canceledDate
      goodsType
      price
      status
      amountkg
    }
  }
`;

export const DELETE_USER_ORDER = gql`
  mutation deleteUserOrder($_id: ID!) {
    deleteUserOrder(_id: $_id)
  }
`;

export const GET_LIST_OF_GOODS = gql`
  query getListOfMarketeerGoods($userId: ID) {
    getListOfMarketeerGoods(userId: $userId) {
      parent {
        _id
        name
      }
      children {
        _id
        name
        marketeerPrice
        isUnit
        total
        value
        price
      }
    }
  }
`;
