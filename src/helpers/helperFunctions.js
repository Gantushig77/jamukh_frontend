const stringEllipser = (str, limit) => {
  if (str?.length > limit) {
    return str.slice(0, limit) + '...';
  } else {
    return str;
  }
};

const isAuthenticated = () => {
  const auth = localStorage.getItem('jamukh_auth') === 'true';
  if (auth) return true;
  else return false;
};

const roleChecker = (roles, check) => {
  return roles.includes(check);
};

function emailValidator(input) {
  let regex = /@*.$1/i;
  return regex.test(input);
}

function numberValidator(input) {
  let regex = /^\d+$/;
  return regex.test(input);
}

export { stringEllipser, isAuthenticated, roleChecker, emailValidator, numberValidator };
