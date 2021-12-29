import { Route, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { authAtom } from "../../_state";

export { PrivateRoute };

// function PrivateRoute({ component: Component, ...rest }) {
//   const auth = useRecoilValue(authAtom);

//   // if (!auth) {
//   // not logged in so redirect to login page with the return url
//   return !auth ? <div>You need to login</div> : <Component {...rest} />;

//   // <Navigate
//   //   to={"/login"}
//   //   // to={{ pathname: "/login", state: { from: props.location } }}
//   // />
//   //);
//   // }

//   // authorized so return component
//   // return <Component {...rest} />;
// }
function PrivateRoute({ children }) {
  const auth = useRecoilValue(authAtom);
  return auth ? children : <Navigate to="/login" />;
}
