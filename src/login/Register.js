import React from "react";
import { Formik, Form, Field, validateForm } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useUserActions } from "_actions";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("LastName is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().required("email is required").email("Invalid email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number and one special character"
    ),

  passwordvalidate: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  image: Yup.string().url("Invalid URL"),
});

const initValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  passwordvalidate: "",
  image: "",
};

function Register(props) {
  const { validate } = props;
  const userActions = useUserActions();
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>

      <Formik
        initialValues={initValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // console.log("object");
          //  if (validate(values)) {
          // console.log(values);
          userActions.register(values).catch((error) => {
            console.log("apiError", { message: error });
          });
          //console.log("usr");
          // }
        }}
      >
        {({ errors, touched, validateField, validateForm }) => (
          <Form>
            <Stack spacing={2}>
              <FormControl>
                <Field
                  label="First Name"
                  name="firstName"
                  error={errors.firstName && touched.firstName}
                  helperText={errors.firstName}
                  as={TextField}
                />
              </FormControl>{" "}
              <FormControl>
                <Field
                  label="Last Name"
                  error={errors.lastName && touched.lastName}
                  helperText={errors.lastName}
                  name="lastName"
                  as={TextField}
                />
              </FormControl>{" "}
              <FormControl>
                <Field
                  label="Username"
                  error={errors.username && touched.username}
                  name="username"
                  helperText={errors.username}
                  as={TextField}
                />
              </FormControl>
              <FormControl>
                <Field
                  label="Email"
                  error={errors.email && touched.email}
                  name="email"
                  type="email"
                  helperText={errors.email}
                  as={TextField}
                />
              </FormControl>
              <FormControl>
                <Field
                  label="Password"
                  error={errors.password && touched.password}
                  name="password"
                  type="password"
                  helperText={errors.password}
                  as={TextField}
                />
              </FormControl>
              <FormControl>
                <Field
                  label="Password Validation"
                  error={errors.passwordvalidate && touched.passwordvalidate}
                  name="passwordvalidate"
                  type="password"
                  helperText={errors.passwordvalidate}
                  as={TextField}
                />
              </FormControl>
              <FormControl>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </FormControl>
            </Stack>
            {/* <button
              type="button"
              onClick={() => validateForm().then((date) => console.log(date))}
            >
              Validate All
            </button> */}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
