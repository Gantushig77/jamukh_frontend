const logout = () => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem('jamukh_auth', 'false');
      localStorage.setItem('jamukh_token', '');
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export { logout };
