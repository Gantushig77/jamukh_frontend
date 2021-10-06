import gql from 'graphql-tag';

export const GET_LIST_OF_USER_BASKET = gql`
  query getListOfUserBasket($userId: ID) {
    getListOfUserBasket(userId: $userId) {
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
      orderedFrom
      price
      paid
      status
      amountkg
      amountkgModified
      priceModified
      modifiedDate
      marketeer {
        name
      }
      userServiceInfo {
        _id
        serviceOption
        meatAmount
      }
      goods {
        _id
        active
        marketeerPrice
        isUnit
        price
        total
      }
    }
  }
`;

export const GET_SINGLE_MULTI_ORDER = gql`
  query getSingleMultiOrder($_id: ID!) {
    getSingleMultiOrder(_id: $_id) {
      _id
      userId
      initDate
      amountkg
      price
      orderIds
      paid
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
    }
  }
`;

export const CREATE_MULTI_ORDER_BASKET = gql`
  mutation createMultiOrderBasket(
    $shippingType: String
    $listOfGoods: [BasketOrderGoodsInput]
    $address: String
    $city: String
    $district: String
    $unit: String
    $email: String
    $fullName: String
    $phone: String
  ) {
    createMultiOrderBasket(
      shippingType: $shippingType
      listOfGoods: $listOfGoods
      address: $address
      city: $city
      district: $district
      unit: $unit
      email: $email
      phone: $phone
      fullName: $fullName
    ) {
      _id
      userId
      initDate
      amountkg
      price
      orderIds
      address
      city
      district
      unit
      email
      fullName
      phone
    }
  }
`;

export const UPDATE_MULTI_ORDER_BASKET = gql`
  mutation updateMultiOrderBasket(
    $multiOrderId: ID!
    $paid: Boolean
    $paidWiwth: String
  ) {
    updateMultiOrderBasket(
      multiOrderId: $multiOrderId
      paid: $paid
      paidWiwth: $paidWiwth
    ) {
      _id
      userId
      initDate
      amountkg
      price
      orderIds
    }
  }
`;

export const DELETE_MULTI_ORDER_BASKET = gql`
  mutation updateMultiOrderBasket($multiOrderId: ID!) {
    updateMultiOrderBasket(multiOrderId: $multiOrderId)
  }
`;
