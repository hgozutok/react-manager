import React from "react";
import { Typography } from "@mui/material";
import * as Yup from "yup";
import { Formik, Form, Field, validateForm, useFormikContext } from "formik";
import { Button, FormControl, Stack, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { useCategories } from "_components/services/useCategories";

//  "categoryID": 0,
//     "parentID": 0,
//     "categoryName": "string",
//     "description": "string",
//     "picture": "string"

const initialState = {
  categoryID: null,
  parentID: 0,
  categoryName: "",
  description: "",
  picture: "",
};
const validationSchema = Yup.object().shape({
  categoryName: Yup.string().required("Category Name is required"),
  description: Yup.string(),
  picture: Yup.string().nullable(true).url("Invalid URL"),
});

export const NeworEditCategory = (props) => {
  // const { values } = useFormikContext();
  const param = useParams();
  const categories = useCategories();
  const [categorytoEdit, setCategorytoEdit] = React.useState(initialState);
  const [isEdit, setIsEdit] = React.useState(false);

  const getCategory = async () => {
    // await categories.getCategory(param.id);
    return await categories.getCategory(param.id);
  };

  React.useEffect(() => {
    getCategory().then((res) => {
      res.picture = ""; // to remove the picture from the response
      console.log(res);
      setCategorytoEdit(res);

      setIsEdit(true);
    });
  }, []);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        New Category
      </Typography>
      <Formik
        enableReinitialize={true}
        initialValues={categorytoEdit || initialState}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          //  console.log(values);
        }}
      >
        {({
          values,
          //   setValues,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          //   setFieldValue,
          //  props,
        }) => {
          //console.log(values);
          // setFieldValue("categoryName", categorytoEdit.categoryName);
          //setValues(categorytoEdit);

          // setCategorytoEdit(values);
          //  console.log(values);
          return (
            <Form>
              <Stack>
                <FormControl>
                  <TextField
                    label="Category Name"
                    name="categoryName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.categoryName}
                    error={errors.categoryName && touched.categoryName}
                    helperText={errors.categoryName}
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    label="Description"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    error={errors.description && touched.description}
                    helperText={errors.description}
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    label="Picture"
                    name="picture"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.picture}
                    error={errors.picture && touched.picture}
                    helperText={errors.picture}
                  />
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
