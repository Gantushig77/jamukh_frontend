import { gql } from '@apollo/client';

export const ACCOUNT = gql`
  query {
    getAccount {
      _id
      username
      email
      familyname
      firstname
      lastname
      rating
      avatar {
        _id
        path
        width
        height
      }
      member_type {
        _id
        type_name
        position
        monthly_pay
      }
      subs_info {
        _id
        paid_amount
        paid_date
        valid_through
        mem_type {
          _id
        }
        payment_info {
          _id
          amount
          user_id
          payment_date
          payment_desc
          paid_with
        }
      }
      gender
      role
      phone
      bio
      status
      address
      payment_status
      highSchool
      university
      vocation
      currentJob
      jobTitle
      annualIncome
      country
      city
      district
      phone
    }
  }
`;

export const LOGIN_WITH_FB = gql`
  mutation loginWithFb(
    $fbId: String
    $email: String
    $password: String
    $picture: FBimg
    $gender: String
    $birthDate: String
    $firstName: String
    $lastName: String
  ) {
    loginWithFb(
      fbId: $fbId
      email: $email
      password: $password
      picture: $picture
      gender: $gender
      birthDate: $birthDate
      firstName: $firstName
      lastName: $lastName
    )
  }
`;

export const GET_ALL_ACCOUNTS = gql`
  query getAllAccounts(
    $filter: UserInput
    $pageCount: Int
    $perPage: Int
    $page: Int
    $sort: Int
  ) {
    getAllAccounts(
      filter: $filter
      pageCount: $pageCount
      perPage: $perPage
      page: $page
      sort: $sort
    ) {
      pageCount
      perPage
      page
      sort
      users {
        _id
        username
        email
        phone
        familyname
        firstname
        lastname
        signedUpWithFb
        birthdate
        fb_id
        rating
        member_type {
          _id
          type_name
          position
          monthly_pay
        }
        subs_info {
          _id
          paid_amount
          paid_date
          valid_through
          mem_type {
            _id
            type_name
            position
            monthly_pay
          }
        }
        gender
        avatar {
          _id
          path
          width
          height
        }
        payment_status
        status
        vocation
      }
    }
  }
`;

export const REGISTER_ACCOUNT = gql`
  mutation RegisterMe(
    $username: String!
    $password: String!
    $firstName: String
    $lastName: String
    $birthDate: String
    $gender: String
  ) {
    registerMe(
      username: $username
      password: $password
      firstName: $firstName
      lastName: $lastName
      birthDate: $birthDate
      gender: $gender
    ) {
      _id
      username
      email
      role
      firstName
      lastName
      avatar {
        _id
        path
        width
        height
      }
      blogCover
      token
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(password: $password, username: $username)
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateAccount(
    $_id: ID!
    $role: String
    $familyname: String
    $firstname: String
    $lastname: String
    $bio: String
    $email: String
    $gender: String
    $highSchool: String
    $university: String
    $vocation: String
    $currentJob: String
    $jobTitle: String
    $annualIncome: Float
    $phone: Int
    $city: String
    $district: String
    $unit: String
    $profileImg: Upload
    $birthdate: Date
  ) {
    updateAccount(
      _id: $_id
      role: $role
      familyname: $familyname
      firstname: $firstname
      lastname: $lastname
      bio: $bio
      email: $email
      gender: $gender
      highSchool: $highSchool
      university: $university
      vocation: $vocation
      currentJob: $currentJob
      jobTitle: $jobTitle
      annualIncome: $annualIncome
      phone: $phone
      city: $city
      district: $district
      unit: $unit
      profileImg: $profileImg
      birthdate: $birthdate
    ) {
      _id
      role
      familyname
      firstname
      lastname
      birthdate
      avatar {
        _id
        path
        width
        height
      }
      bio
      email
      gender
      highSchool
      university
      vocation
      currentJob
      jobTitle
      annualIncome
      phone
      city
      district
      unit
    }
  }
`;
