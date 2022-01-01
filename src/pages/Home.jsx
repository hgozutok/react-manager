import { useEffect } from "react";
import { useRecoilValue } from "recoil";

import { authAtom, usersAtom } from "_state";
import { useUserActions } from "_actions";
import { Typography } from "@mui/material";

export { Home };

function Home() {
  const auth = useRecoilValue(authAtom);
  const users = useRecoilValue(usersAtom);
  //  const userActions = useUserActions();

  useEffect(() => {
    // userActions.getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Home
      </Typography>
      {auth ? (
        <div>
          <Typography variant="h3" gutterBottom>
            Hi {auth?.userName}!
          </Typography>
          <Typography variant="body1" gutterBottom>
            {JSON.stringify(auth)}
          </Typography>
        </div>
      ) : (
        <Typography variant="h3" gutterBottom>
          Hi, Guest! You are not logged in
        </Typography>
      )}
    </>
  );
}
