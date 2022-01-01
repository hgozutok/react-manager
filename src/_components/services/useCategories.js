import React from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authAtom } from "_state";

const useCategories = () => {
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState([]);
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
  };

  async function getCategories() {
    const response = await axios.get(`${baseUrl}/categories/`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    return response.data;
  }

  async function getCategory(id) {
    const response = await axios
      .get(`${baseUrl}/categories/${id}`)
      .then((res) => {
        setCategory(res.data);
      });
    return response.data;
  }

  async function createCategory(category) {
    const response = await axios
      .post(`${baseUrl}/categories/`, category)
      .then((res) => {
        setCategory(res.data);
      });
    return response.data;
  }

  async function updateCategory(id, category) {
    const response = await axios
      .put(`${baseUrl}/categories/${id}`, category)
      .then((res) => {
        setCategory(res.data);
      });
    return response.data;
  }

  async function deleteCategory(id) {
    const response = await axios
      .delete(`${baseUrl}/categories/${id}`)
      .then((res) => {
        setCategory(res.data);
      });
    return response.data;
  }
};

export { useCategories };
