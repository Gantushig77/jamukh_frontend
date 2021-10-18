import { gql } from '@apollo/client';

export const GET_LIST_OF_M_GOODS = gql`
  query GetListOfMGoods($userId: ID, $active: Boolean) {
    getListOfMGoods(userId: $userId, active: $active) {
      _id
      name
      description
      parentCategoryId
      categoryImg {
        _id
        path
        width
        height
      }
      childCategories {
        _id
        name
        active
        special
        position
        parentId
        isUnit
        price
        description
        total
        categoryImg {
          _id
          path
          width
          height
        }
      }
    }
  }
`;

export const MARKETEER_GOODS = gql`
  query MarketeerGoods($parentId: ID) {
    marketeerGoods(parentId: $parentId) {
      _id
      name
      active
      special
      parentId
      isUnit
      categoryImg {
        _id
        path
        width
        height
      }
      goodsImg {
        path
        width
        height
        _id
      }
      description
      price
      total
      subCategories
    }
  }
`;

export const GET_SINGLE_MARKETEER_GOODS = gql`
  query GetSingleMarketeerGoods($_id: ID) {
    getSingleMarketeerGoods(_id: $_id) {
      _id
      name
      active
      special
      parentId
      description
      marketeerId
      position
      parentCategory {
        _id
        name
        active
      }
      goodsImg {
        _id
        path
        width
        height
      }
      categoryImg {
        _id
        path
        width
        height
      }
      isUnit
      price
      total
    }
  }
`;

export const UPDATE_MARKETEER_GOODS = gql`
  mutation UpdateMarketeerGoods(
    $_id: ID
    $userId: ID
    $active: Boolean
    $marketeerPrice: Float
    $special: Boolean
  ) {
    updateMarketeerGoods(
      _id: $_id
      userId: $userId
      active: $active
      marketeerPrice: $marketeerPrice
      special: $special
    ) {
      _id
      userId
      goodsId
      value
      marketeerPrice
      active
      special
      goodsImg {
        _id
        path
        width
        height
      }
    }
  }
`;
