import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

import { authAtom } from "_state";
import { useUserActions } from "_actions";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { FormControl, Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Register from "./Register";
import { typography } from "@mui/system";

export { Login };

function Login({ history }) {
  let navigate = useNavigate();

  const auth = useRecoilValue(authAtom);
  const userActions = useUserActions();

  useEffect(() => {
    // redirect to home if already logged in
    if (auth) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, setError, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit({ username, password }) {
    if (isSubmitting) return;
    if (errors.username || errors.password) return;
    if (!username || !password) return;

    return userActions.login(username, password).catch((error) => {
      setError("apiError", { message: error });
    });
  }

  return (
    // <Box
    //   display="flex"
    //   flexDirection="row"
    //   justifyContent="center"
    //   spacing={2}
    //   margin={2}
    //   padding={2}
    //   gap={5}
    //   minHeight="100vh"
    //   sx={{
    //     alignContent: "space-around",
    //     alignItems: "center",
    //   }}
    // > </Box>

    <Grid
      container
      spacing={2}
      display="flex"
      flexDirection="row"
      justifyContent="center"
      gap={5}
      minHeight="100vh"
      sx={{
        padding: "15px",
        margin: "15px",

        borderRadius: "1px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "20px",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        justifyItems: "center",
        textAlign: "center",
      }}
    >
      <Card
        sx={{
          padding: "50px",
          margin: "50px",
          maxWidth: 475,
          minWidth: 375,
          alignContent: "space-around",
          borderRadius: "5%",
          webkitBoxShadow: "5px 5px 18px 5px #000000",
          boxShadow: "5px 5px 18px 5px #000000",
        }}
      >
        <CardContent>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Please Login
          </Typography>
          <Typography variant="h5" component="div">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <FormControl>
                  <TextField
                    id="username"
                    name="username"
                    label="User Name"
                    variant="outlined"
                    error={errors.username?.message}
                    {...register("username")}
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    id="password"
                    label="password"
                    variant="outlined"
                    type="password"
                    error={errors.password?.message}
                    {...register("password")}
                  />
                </FormControl>
              </Stack>
              <Button type="submit" disabled={isSubmitting} variant="contained">
                Login
              </Button>{" "}
              <Button
                type="Cancel"
                onClick={() => navigate("/")}
                variant="outlined"
              >
                Cancel
              </Button>
              {isSubmitting && <CircularProgress />}
              {errors.apiError && (
                <Alert severity="error">{errors.apiError?.message}</Alert>
              )}
            </form>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Forgot Password?</Button>
        </CardActions>
      </Card>
      <Card
        sx={{
          padding: 2,
          minWidth: "100px",
          minHeight: "100px",
          maxWidth: "100px",
          maxHeight: "100px",
          borderRadius: "50%",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
          backgroundColor: "background.paper",
          webkitBoxShadow: "5px 5px 18px 5px #000000",
          boxShadow: "5px 5px 18px 5px #000000",
        }}
      >
        <Typography variant="h3">OR</Typography>
      </Card>
      <Card
        sx={{
          maxWidth: 675,
          minWidth: 475,
          borderRadius: "5%",
          padding: "50px",
          margin: "50px",
          justifyContent: "center",
          alignContent: "center",
          gap: "5",
          webkitBoxShadow: "5px 5px 18px 5px #000000",
          boxShadow: "5px 5px 18px 5px #000000",
        }}
      >
        <Register />
      </Card>
    </Grid>
  );
}
