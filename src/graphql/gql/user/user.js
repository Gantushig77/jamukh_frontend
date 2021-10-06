import { gql } from "@apollo/client";

export const ACCOUNT = gql`
  query {
    me {
      _id
      username
      email
      role
      firstName
      lastName
      phone
      bio
      status
      serviceType
      service {
        meatAmount
        serviceOption {
          title
          monthlyLimit
          price
          discount
          duration
          time
        }
      }
      address
      city
      district
      unit
      avatar {
        _id
        path
        width
        height
      }
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

export const SEND_PHONE_OTP = gql`
  mutation SendPhoneOtp {
    sendPhoneOtp
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

export const REGISTER_WITH_PHONE = gql`
  mutation RegisterWithPhone($phone: String!) {
    registerWithPhone(phone: $phone)
  }
`;

export const REQUEST_PASSWORD_CHANGE = gql`
  mutation RequestPasswordChange($phone: String!) {
    requestPasswordChange(phone: $phone)
  }
`;

export const CONFIRM_PASSWORD_CHANGE_REQUEST = gql`
  mutation ConfirmPasswordChangeRequest($phone: String!, $otp: String!) {
    confirmPasswordChangeRequest(phone: $phone, otp: $otp)
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($password: String!) {
    resetPassword(password: $password)
  }
`;

export const CONFIRM_PHONE = gql`
  mutation ConfirmPhone($otp: String!) {
    confirmPhone(otp: $otp)
  }
`;

export const LOGIN = gql`
  mutation Login($loginUser: String!, $password: String!) {
    login(loginUser: $loginUser, password: $password)
  }
`;

export const UPDATE_ME = gql`
  mutation UpdateMe(
    $firstName: String
    $lastName: String
    $avatar: String
    $bio: String
    $address: String
    $city: String
    $district: String
    $unit: String
    # need password
    $phone: String
    $email: String
    $password: String
    $newPassword: String
    $username: String
  ) {
    updateMe(
      firstName: $firstName
      lastName: $lastName
      avatar: $avatar
      bio: $bio
      address: $address
      city: $city
      district: $district
      unit: $unit
      #need password
      newPassword: $newPassword
      username: $username
      email: $email
      phone: $phone
      password: $password
    ) {
      # _id
      username
      email
      role
      firstName
      lastName
      phone
      bio
      address

      city
      district
      unit
      avatar {
        _id
        path
        width
        height
      }
      OTP_Sent
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($oldPassword: String!, $newPassword: String!) {
    updatePassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword($password: String!, $newPassword: String!) {
    changePassword(password: $password, newPassword: $newPassword)
  }
`;

export const CHANGE_PHONE = gql`
  mutation changePhone($phone: String!) {
    changePhone(phone: $phone)
  }
`;

export const CHANGE_PHONE_CONFIRM = gql`
  mutation changePhoneConfirm($otp: String!) {
    changePhoneConfirm(otp: $otp) {
      _id
      username
      email
      role
      firstName
      lastName
      phone
      bio
      address
      city
      district
      unit
      avatar {
        _id
        path
        width
        height
      }
    }
  }
`;

export const UPDATE_PAY_STATUS = gql`
  mutation updatePayStatus($_id: ID!, $status: String!) {
    updatePayStatus(_id: $_id, status: $status) {
      _id
      status
    }
  }
`;

export const CHANGE_AVATAR = gql`
  mutation changeAvatar($image: Upload) {
    changeAvatar(image: $image) {
      _id
      username
      email
      role
      firstName
      lastName
      phone
      bio
      status
      serviceType
      avatar {
        _id
        path
        width
        height
      }
    }
  }
`;

export const CHANGE_USER_SERVICE = gql`
  mutation changeUserSeviceType($serviceType: String!, $_id: ID!) {
    changeUserSeviceType(serviceType: $serviceType, _id: $_id) {
      _id
      username
      serviceType
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
      phone
      bio
      blogCover
      address
      city
      district
      unit
      status
    }
  }
`;
