import { useRecoilValue, useSetRecoilState } from "recoil";

import { history, useFetchWrapper } from "_helpers";
import { authAtom, usersAtom } from "_state";
import { useNavigate } from "react-router-dom";
import { LineAxis } from "@mui/icons-material";
import axios from "axios";

export { useUserActions };

function useUserActions() {
  let navigate = useNavigate();
  const baseUrl = `${process.env.REACT_APP_API_URL}/api`;
  // const baseUrl = `http://localhost:4000/users`;
  const fetchWrapper = useFetchWrapper();
  const setAuth = useSetRecoilState(authAtom);
  const auth = useRecoilValue(authAtom);
  const setUsers = useSetRecoilState(usersAtom);

  return {
    login,
    logout,
    getAll,
  };

  function login(email, password) {
    return fetchWrapper
      .post(`${baseUrl}/user/token`, { email, password })
      .then((user) => {
        // console.log(user);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));
        setAuth(user);

        // get return url from location state or default to home page
        const { from } = history.location.state || { from: { pathname: "/" } };
        navigate(from);
      });
  }

  function logout() {
    axios.defaults.headers.common["Authorization"] = "Bearer " + auth.token;
    axios.get(`${baseUrl}/categories/`).then((res) => {
       console.log(res.data);});

    // setAuth(null);
    // navigate("/");
    let token = auth.token;
    fetchWrapper.post(`${baseUrl}/user/revoke-token/`, { token });

    // remove user from local storage, set auth state to null and redirect to login page
    localStorage.removeItem("user");
    setAuth(null);
    navigate("/");
  }

  function getAll() {
    return fetchWrapper.get(baseUrl).then(setUsers);
  }
}
