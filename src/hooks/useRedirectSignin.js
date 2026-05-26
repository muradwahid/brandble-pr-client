import { useNavigate } from "react-router";
export const useRedirectSignin = () => {
  const navigation = useNavigate();
  const redirectToSignin = () => {
    navigation(`/signin`);
  };

  return redirectToSignin;
}