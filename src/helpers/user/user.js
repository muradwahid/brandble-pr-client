import { getFromLocalStorage, setToLocalStorage } from "../../utils/local-storage";
import {jwtDecode} from "jwt-decode";

export const storeUserInfo = ({ accessToken }) => {
  setToLocalStorage('accessToken', accessToken);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage('accessToken');
  if (authToken) {
    const decodedData = jwtDecode(authToken);
    return decodedData;
  } else {
    return null;
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage('accessToken');
  return !!authToken;
};

