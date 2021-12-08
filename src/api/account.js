import ax_instance from '../helpers/axios_instance';

const login = (user_cred, password) => {
  return ax_instance.post('/account/login', { user_cred, password });
};

const signUp = (data) => {
  return ax_instance.post('/account/sign-up', data);
};

const getProfile = () => {
  return ax_instance.get('/account/login');
};

export { login, signUp, getProfile };
