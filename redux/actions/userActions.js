export const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
