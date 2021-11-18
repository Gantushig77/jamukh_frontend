import { gql } from '@apollo/client';

export const ACCOUNT = gql`
  query {
    getAccount {
      _id
      username
      email
      firstname
      lastname
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
      role
      phone
      bio
      status
      address
      payment_status
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

export const USERS = gql`
  query users($status: String, $serviceType: String) {
    users(status: $status, serviceType: $serviceType) {
      _id
      username
      email
      role
      firstName
      lastName
      phone
      serviceType
      bio
      status
      avatar {
        _id
        path
        width
        height
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
    $firstName: String
    $lastName: String
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
  ) {
    updateAccount(
      _id: $_id
      role: $role
      familyname: $familyname
      firstName: $lastName
      lastName: $lastName
      avatar: $avatar
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
    ) {
      _id
      role
      familyname
      firstName
      lastName
      avatar
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
