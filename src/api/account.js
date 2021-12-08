import ax_instance from '../helpers/axios_instance';
import { base_url } from '../constants/url';

const login = (user_cred, password) => {
  return ax_instance.post('/account/login', { user_cred, password });
};

const signUp = (data) => {
  return ax_instance.post('/account/sign-up', data);
};

const getProfile = () => {
  return ax_instance.get('/account/profile');
};

const getListOfAccounts = (sort, page, perPage) => {
  return ax_instance.get(
    `/account/get-accounts?sort=${sort}&page=${page}&perPage=${perPage}`
  );
};

const updateProfile = (data) => {
  return ax_instance.post('/account/profile', data);
};

const formDataUpdateProfile = (dataFile, info) => {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    let formData = new FormData();

    console.log('file', dataFile);
    if (dataFile !== undefined || dataFile !== null) {
      formData.append('file', dataFile);
    }
    formData.append('info', JSON.stringify(info));

    req.open('POST', `${base_url}/account/profile`);
    req.setRequestHeader(
      'Authorization',
      `Bearer ${localStorage.getItem('jamukh_token')}`
    );

    try {
      req.send(formData);

      req.onreadystatechange = function () {
        if (req.readyState === 4) {
          if (req.status === 200 || req.status === 202) {
            const res = JSON.parse(req.response);
            resolve(res);
          } else {
            return reject(req.statusText);
          }
        }
      };
    } catch (e) {
      return reject(e);
    }
  });
};

export {
  login,
  signUp,
  getProfile,
  getListOfAccounts,
  updateProfile,
  formDataUpdateProfile,
};
