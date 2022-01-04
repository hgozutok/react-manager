import React from "react";
import { Typography } from "@mui/material";
import * as Yup from "yup";
import { Formik, Form, Field, validateForm, useFormikContext } from "formik";
import { Button, FormControl, Stack, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { useCompanies } from "_components/services/useCompanies";
// "companyID": 0,
//     "companyName": "string",
//     "adress": "string",
//     "country": "string",
//     "currency": "string",
const initialState = {
  companyID: null,
  companyName: "",
  adress: "",
  country: "",
  currency: "",
};
const validationSchema = Yup.object().shape({
  companyName: Yup.string().required("Company Name is required"),
  adress: Yup.string(),
  country: Yup.string(),
  currency: Yup.string(),
});

export const UpsertCompany = () => {
  const navigate = useNavigate();
  const param = useParams();

  const companies = useCompanies();
  const [companyToEdit, setCompanyToEdit] = React.useState(initialState);
  const [isEdit, setIsEdit] = React.useState(false);

  const getCompany = async () => {
    await companies.getCompany(param.id).then((res) => {
      console.log(res);
      setCompanyToEdit(res);

      setIsEdit(true);
    });
  };

  React.useEffect(() => {
    console.log(param.id);
    if (param.id) {
      getCompany();
    }
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        New/Edit Company
      </Typography>
      <Box
        sx={{
          minWidth: "300px",
          maxWidth: "600px",
          padding: "3rem",
          display: "flex",
        }}
      >
        <Formik
          initialValues={initialState || companyToEdit}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            //console.log(values);
            if (isEdit) {
              companies.updateCompany(param.id, values).then((res) => {
                console.log(res);
              });
            } else {
              companies
                .createCompany(values)
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                });
            }

            navigate("/dashboard/company");
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => {
            return (
              <Form>
                <Stack spacing={2}>
                  <FormControl>
                    <TextField
                      label="Company Name"
                      name="companyName"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.companyName}
                      error={errors.companyName && touched.companyName}
                      helperText={errors.companyName}
                    />
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="adress"
                      name="adress"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.adress}
                      error={errors.adress && touched.adress}
                      helperText={errors.adress}
                    />
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="country"
                      name="country"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.country}
                      error={errors.country && touched.country}
                      helperText={errors.country}
                    />
                  </FormControl>
                  <FormControl>
                    <TextField
                      label="currency"
                      name="currency"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.currency}
                      error={errors.currency && touched.currency}
                      helperText={errors.currency}
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    //   disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </div>
  );
};
