import React from "react";
import { Typography } from "@mui/material";
import * as Yup from "yup";
import { Formik, Form, Field, validateForm, useFormikContext } from "formik";
import { Button, FormControl, Stack, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useCategories } from "_components/services/useCategories";
import { Box } from "@mui/system";

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
  const navigate = useNavigate();
  const param = useParams();
  const categories = useCategories();
  const [categoryToEdit, setCategoryToEdit] = React.useState(initialState);
  const [isEdit, setIsEdit] = React.useState(false);

  const getCategory = async () => {
    await categories.getCategory(param.id).then((res) => {
      res.picture = ""; // to remove the picture from the response
      console.log(res);
      setCategoryToEdit(res);

      setIsEdit(true);
    });
  };

  React.useEffect(() => {
    getCategory();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        New/Edit Category
      </Typography>
      <Box
        sx={{
          minWidth: "300px",
          maxWidth: "600px",
          padding: "3rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          // alignItems: "center",
          webkitBoxShadow: "17px 17px 17px 11px #000000",
          boxShadow: "17px 17px 17px 11px #000000",
        }}
      >
        <Formik
          enableReinitialize={true}
          initialValues={categoryToEdit || initialState}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // console.log(values);
            if (isEdit) {
              categories.updateCategory(param.id, values);
            } else {
              categories.createCategory(values);
            }
            navigate("/dashboard/categories");
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
      </Box>
    </div>
  );
};
