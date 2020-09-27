import LOGIN_TYPES from "./login.types";

export const login = (userCredential) => ({
  type: LOGIN_TYPES.LOGIN_USER,
  payload: userCredential,
});
