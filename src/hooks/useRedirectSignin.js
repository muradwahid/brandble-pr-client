import config from "../config";

export const useRedirectSignin = () => {
  const redirectToSignin = () => {
    const baseUrl = config.rootClientUrl
    window.location.replace(`${baseUrl}/signin`);
  };

  return redirectToSignin;
}