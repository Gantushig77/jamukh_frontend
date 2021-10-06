const stringEllipser = (str, limit) => {
  if (str?.length > limit) {
    return str.slice(0, limit) + "...";
  } else {
    return str;
  }
};

const isAuthenticated = () => {
  const auth = localStorage.getItem("authenticated") === "true";
  if (auth) return true;
  else return false;
};

const roleChecker = (roles, check) => {
  return roles.includes(check);
};

export { stringEllipser, isAuthenticated, roleChecker };
