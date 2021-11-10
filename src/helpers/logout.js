const logout = () => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem('jamukh_auth', 'false');
      localStorage.removeItem('jamukh_auth');
      console.log('logged out');
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export { logout };
