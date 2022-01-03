import { useRecoilValue, useSetRecoilState } from "recoil";

import { history, useFetchWrapper } from "_helpers";
import { authAtom, usersAtom } from "_state";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export { useUserActions };

function useUserActions() {
  let navigate = useNavigate();
  const baseUrl = `${process.env.REACT_APP_API_URL}/api`;
  // const baseUrl = `http://localhost:4000/users`;
  //const fetchWrapper = useFetchWrapper();
  const setAuth = useSetRecoilState(authAtom);
  const auth = useRecoilValue(authAtom);
  const setUsers = useSetRecoilState(usersAtom);

  return {
    login,
    logout,
    getAll,
    register,
  };

  function login(email, password) {
    console.log(baseUrl);
    return axios
      .post(baseUrl + "/user/token", { email, password })
      .then((usr) => {
        // console.log(user);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(usr.data));
        setAuth(usr.data);

        // get return url from location state or default to home page
        const { from } = history.location.state || { from: { pathname: "/" } };
        navigate(from);
      });
  }

  function logout() {
    // axios.defaults.headers.common["Authorization"] = "Bearer " + auth.token;
    // axios.get(`${baseUrl}/categories/`).then((res) => {
    //   console.log(res.data);
    // });

    setAuth(null);
    navigate("/");
    let token = auth.token;
    axios.post(`${baseUrl}/user/revoke-token/`, { token });

    // remove user from local storage, set auth state to null and redirect to login page
    localStorage.removeItem("user");
    setAuth(null);
    navigate("/");
  }

  function getAll() {
    return axios.get(baseUrl).then(setUsers);
  }
  async function register(user) {
    console.log(JSON.stringify(user));
    delete user.passwordvalidate;
    return await axios
      .post(`${baseUrl}/user/register`, JSON.stringify(user), {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      })
      .then((usr) => {
        if (usr.status === 200) {
          var userRes = JSON.stringify(usr.data);
          if (
            userRes.includes(" already registered") ||
            userRes.includes("Registered with username")
          ) {
            alert("User already registered with this email or username");
          } else {
            console.log(user, "created");
            localStorage.setItem("user", userRes);
            setAuth(usr);

            const { from } = history.location.state || {
              from: { pathname: "/" },
            };
            navigate(from);
          }
        }

        // login(usr.email, usr.password);
      });
  }
}
