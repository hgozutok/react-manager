import React from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authAtom } from "_state";

export const useCompanies = () => {
  const [companies, setCompanies] = React.useState([]);
  const [company, setCompany] = React.useState(null);
  const auth = useRecoilValue(authAtom);

  const baseUrl = `${process.env.REACT_APP_API_URL}/api`;

  return {
    getCompanies,
    getCompany,
    createCompany,
    updateCompany,
    deleteCompany,
    companies,
    setCompanies,
    company,
  };

  async function getCompanies() {
    var data = null;
    const response = await axios

      .get(`${baseUrl}/companies/`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        setCompanies(res.data);
        console.log(res.data);
        data = res.data;
        return res.data;
      });
    return data;
  }

  async function getCompany(id) {
    var data = null;
    await axios

      .get(`${baseUrl}/companies/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setCompany(res.data);
        // console.log(company);
        data = res.data;
        return res.data;
      });

    return data;
  }

  async function createCompany(company) {
    var data = null;
    await axios

      .post(`${baseUrl}/companies/`, company, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        setCompany(res);
        console.log(res);
        data = res;
        return res;
      });

    return data;
  }

  async function updateCompany(id, company) {
    var data = null;
    await axios

      .put(`${baseUrl}/companies/${id}`, company, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        setCompany(res);
        console.log(res);
        data = res;
        return res;
      });

    return data;
  }

  async function deleteCompany(id) {
    var data = null;
    await axios

      .delete(`${baseUrl}/companies/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      .then((res) => {
        setCompany(res);
        console.log(res);
        data = res;
        return res;
      });

    return data;
  }
};
