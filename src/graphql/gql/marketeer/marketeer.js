import { gql } from "@apollo/client";

export const GET_ACTIVE_PARENT_GOODS = gql`
  query getActiveParentGoods($userId: ID) {
    getActiveParentGoods(userId: $userId) {
      _id
      name
      position
      parentId
      active
      createdUser
      updatedUser
      subCategories
      marketeerPrice
      categoryImg {
        _id
        path
        width
        height
      }
      description
      isUnit
      special
      price
      total
      goodsImg {
        _id
        path
        width
        height
      }
    }
  }
`;

export const CHILD_MARKETEER_GOODS = gql`
  query getActiveChildGoods(
    $parentId: ID
    $marketeerId: ID
    $special: Boolean
    $active: Boolean
    $page: Int
    $perPage: Int
  ) {
    getActiveChildGoods(
      parentId: $parentId
      special: $special
      active: $active
      page: $page
      perPage: $perPage
      marketeerId: $marketeerId
    ) {
      page
      perPage
      pageCount
      marketeerGoods {
        _id
        name
        active
        special
        description
        parentId
        isUnit
        price
        total
        marketeerPrice
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
