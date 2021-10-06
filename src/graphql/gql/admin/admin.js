import gql from "graphql-tag";

export const CREATE_ADMIN = gql`
  mutation createAdminUser($username: String!, $role: String!, $password: String!, $firstName: String!, $lastName: String!) {
    createAdminUser(username: $username, role: $role, password: $password, firstName: $firstName, lastName: $lastName) {
      _id
      bio
      username
      email
      role
      firstName
      lastName
      avatar {
        _id
      }
      phone
    }
  }
`;

export const ADMIN_LIST = gql`
  query adminUsers($role: String) {
    adminUsers(role: $role) {
      _id
      bio
      username
      email
      role
      firstName
      lastName
      avatar {
        _id
      }
      status
      phone
    }
  }
`;

export const DELETE_ADMIN_USER = gql`
  mutation deleteAdminUser($_id: ID!) {
    deleteAdminUser(_id: $_id) {
      _id
      role
    }
  }
`;

export const UPDATE_ADMIN_USER = gql`
  mutation updateAdminUser($_id: ID!, $username: String, $role: String, $password: String, $firstName: String, $lastName: String) {
    updateAdminUser(_id: $_id, username: $username, role: $role, password: $password, firstName: $firstName, lastName: $lastName) {
      _id
      bio
      username
      email
      role
      firstName
      lastName
      avatar {
        _id
      }
      phone
    }
  }
`;

export const UPDATE_STATUS = gql`
  mutation updateMyStatus($status: String!) {
    updateMyStatus(status: $status) {
      _id
      status
    }
  }
`;

export const UPDATE_ME_ADMIN = gql`
  mutation updateMeAdmin($firstName: String, $lastName: String, $avatar: String, $bio: String, $email: String, $phone: String) {
    updateMeAdmin(firstName: $firstName, lastName: $lastName, avatar: $avatar, bio: $bio, email: $email, phone: $phone) {
      _id
      username
      email
      role
      firstName
      lastName
      phone
      bio
      avatar {
        _id
        path
        width
        height
      }
      status
    }
  }
`;

export const CHANGE_PASSWORD_ADMIN = gql`
  mutation changePasswordAdmin($password: String!, $newPassword: String!) {
    changePasswordAdmin(password: $password, newPassword: $newPassword)
  }
`;

export const CHANGE_PHONE_ADMIN = gql`
  mutation changePhoneAdmin($phone: String!) {
    changePhoneAdmin(phone: $phone)
  }
`;

export const CHANGE_PHONE_CONFIRM_ADMIN = gql`
  mutation changePhoneConfirmAdmin($otp: String!) {
    changePhoneConfirmAdmin(otp: $otp) {
      _id
      username
      email
      role
      firstName
      lastName
      avatar {
        _id
      }
      status
      phone
    }
  }
`;
