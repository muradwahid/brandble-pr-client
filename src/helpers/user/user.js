import { setToLocalStorage } from "../../utils/local-storage";
import { jwtDecode } from "jwt-decode";

function getCookie(name) {
  const matches = document.cookie.match(new RegExp(
    '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
  ));
  return matches ? decodeURIComponent(matches[1]) : null;
}

const accessToken = getCookie('accessToken');

export const storeUserInfo = ({ accessToken }) => {
  setToLocalStorage('accessToken', accessToken);
};

export const getUserInfo = () => {
  // const authToken = getFromLocalStorage('accessToken');
  if (accessToken) {
    const decodedData = jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};

export const isLoggedIn = () => {
  // const authToken = getFromLocalStorage('accessToken');
  return !!accessToken;
};

export const isAdminLoggedId = () => { 
  const userInfo = getUserInfo()

  if (userInfo.role === 'admin' || userInfo.role === 'super_admin') {
    return true
  }

  return false
}
