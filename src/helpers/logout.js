const logout = () => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem('jamukh_auth', 'false');
      localStorage.setItem('jamukh_token', '');
      setTimeout(() => {
        window.location.reload();
        resolve();
      }, 500);
    } catch (e) {
      reject(e);
    }
  });
};

export { logout };
