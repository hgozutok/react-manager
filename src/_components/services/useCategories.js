import React from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authAtom } from "_state";

const useCategories = () => {
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState(null);
  const auth = useRecoilValue(authAtom);

  const baseUrl = `${process.env.REACT_APP_API_URL}/api`;

  return {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    categories,
    setCategories,
    category,
  };

  async function getCategories() {
    var data = null;
    const response = await axios
      .get(`${baseUrl}/categories/`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        setCategories(res.data);
        console.log(res.data);
        data = res.data;
        return res.data;
      });
    return data;
  }

  async function getCategory(id) {
    var data = null;
    await axios
      .get(`${baseUrl}/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setCategory(res.data);
        // console.log(category);
        data = res.data;
        return res.data;
      });

    return data;
  }

  async function createCategory(category) {
    delete category.categoryID;
    delete category.picture;
    const response = await axios
      .post(`${baseUrl}/categories/`, category, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        setCategory(res);
      });
    return response;
  }

  async function updateCategory(id, category) {
    const response = await axios
      .put(`${baseUrl}/categories/${id}`, category, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        setCategory(res);
        console.log(res);
      });
    return response;
  }

  async function deleteCategory(id) {
    const response = await axios
      .delete(`${baseUrl}/categories/${id}`)
      .then((res) => {
        setCategory(res);
      });
    return response;
  }
};

export { useCategories };
