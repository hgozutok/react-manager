import React from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authAtom } from "_state";

export const useProduct = () => {
  const auth = useRecoilValue(authAtom);

  const [productList, setProductList] = React.useState([]);

  const getProductList = async () => {
    const baseUrl = `${process.env.REACT_APP_API_URL}/api`;
    const response = await axios
      .get(`${baseUrl}/products/`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => res.data);
    return response.data;
  };

  React.useEffect(() => {
    getProductList().then(setProductList);
  }, []);

  return productList, setProductList;
};
