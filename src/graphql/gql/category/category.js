import { gql } from "@apollo/client";

export const AVAILABLE_GOODS = gql`
  query GetAvailGoods {
    activeCategoriesWithChildren {
      _id
      name
      description
      categoryImg {
        _id
        path
        width
        height
      }
      childCategories {
        _id
        name
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
      total
    }
  }
`;

export const AVAILABLE_GOODS_WITHOUT_CHILDREN = gql`
  query GetAvailGoods {
    activeCategoriesWithChildren {
      _id
      name
      description
      categoryImg {
        _id
        path
        width
        height
      }
      total
    }
  }
`;

export const GET_ACTIVE_PARENT_CATEGORIES = gql`
  query getActiveParents {
    getActiveParents {
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

export const GET_SINGLE_GOODS = gql`
  query GetSingleGoods($_id: ID) {
    getSingleGoods(_id: $_id) {
      _id
      name
      active
      special
      parentId
      description
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

export const CATEGORIES_WITH_CHILDREN = gql`
  query CategoriesWithChildren($active: Boolean) {
    categoriesWithChildren(active: $active) {
      _id
      name
      description
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

export const SINGLE_UPLOAD = gql`
  mutation SingleUpload($file: Upload!) {
    singleUpload(file: $file)
  }
`;

export const CREATE_CATEGORY_WITH_IMAGE = gql`
  mutation CreateCategoryWithImg(
    $name: String!
    $parentId: String
    $description: String
    $position: Int
    $active: Boolean
    $isUnit: Boolean
    $price: Int
    $image: Upload
    $total: Int
    $goodsImg: [Upload]
  ) {
    createCategoryWithImg(
      name: $name
      parentId: $parentId
      position: $position
      description: $description
      active: $active
      isUnit: $isUnit
      price: $price
      image: $image
      total: $total
      goodsImg: $goodsImg
    ) {
      _id
      name
      active
      special
      parentId
      description
      isUnit
      price
      total
      categoryImg {
        _id
        path
        width
        height
      }
    }
  }
`;

export const DELETE_FROM_GOODS_IMG = gql`
  mutation DeleteFromGoodsImg($categoryId: ID, $imgId: ID) {
    deleteFromGoodsImg(categoryId: $categoryId, imgId: $imgId) {
      _id
      goodsImg {
        _id
        path
        width
        height
      }
    }
  }
`;

export const UPDATE_CATEGORY_WITH_IMAGE = gql`
  mutation UpdateCategoryWithImg(
    $_id: ID!
    $name: String
    $parentId: String
    $description: String
    $position: Int
    $active: Boolean
    $isUnit: Boolean
    $price: Int
    $image: Upload
    $total: Int
    $goodsImg: [Upload]
  ) {
    updateCategoryWithImg(
      _id: $_id
      name: $name
      parentId: $parentId
      description: $description
      position: $position
      image: $image
      active: $active
      price: $price
      isUnit: $isUnit
      total: $total
      goodsImg: $goodsImg
    ) {
      _id
      name
      active
      special
      parentId
      description
      position
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

export const CREATE_CATEGORY = gql`
  mutation CreateCategory(
    $name: String!
    $parentId: String
    $position: Int
    $active: Boolean
    $isUnit: Boolean
    $price: Int
  ) {
    createCategory(
      name: $name
      parentId: $parentId
      position: $position
      active: $active
      isUnit: $isUnit
      price: $price
    ) {
      _id
      name
      active
      special
      parentId
      isUnit
      price
      total
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $_id: ID!
    $name: String
    $active: Boolean
    $price: Int
    $isUnit: Boolean
    $total: Int
    $special: Boolean
  ) {
    updateCategory(
      _id: $_id
      name: $name
      active: $active
      price: $price
      isUnit: $isUnit
      total: $total
      special: $special
    ) {
      _id
      name
      active
      special
      parentId
      isUnit
      price
      total
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($_id: ID!) {
    deleteCategory(_id: $_id)
  }
`;

export const SORT_CATEGORIES = gql`
  mutation SortCategories($params: [String]!) {
    sortCategories(params: $params)
  }
`;

export const CATEGORIES = gql`
  query Categories($parentId: String) {
    categories(parentId: $parentId) {
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

export const ALL_SUB_CATEGORIES = gql`
  query {
    subCategories {
      _id
      name
      active
      special
      parentId
      isUnit
      price
      total
    }
  }
`;

export const CATEGORY_DUPLICATES = gql`
  query CategoryDuplicates($name: String!) {
    categoryDuplicates(name: $name) {
      _id
      name
      active
      special
      parentId
      isUnit
    }
  }
`;

export const CHILD_CATEGOREIS = gql`
  query childCategories(
    $parentId: ID
    $special: Boolean
    $active: Boolean
    $page: Int
    $perPage: Int
  ) {
    childCategories(
      parentId: $parentId
      special: $special
      active: $active
      page: $page
      perPage: $perPage
    ) {
      page
      perPage
      pageCount
      categories {
        _id
        name
        active
        special
        description
        parentId
        isUnit
        price
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
