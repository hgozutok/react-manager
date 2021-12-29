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
import { FormControl } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card sx={{ maxWidth: 475, minWidth: 375 }}>
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
    </Box>
  );
}
