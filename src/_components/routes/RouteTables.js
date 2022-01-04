import { Login } from "login/Login";
import About from "pages/About";
import React from "react";
import { Route, Routes } from "react-router-dom";

import { history } from "_helpers";
import Layout from "_components/layout/Layout";
import { PrivateRoute } from "./PrivateRoute";

import Contact from "pages/Contact";
import { Home } from "pages/Home";
import Dashboard from "pages/dashboard";
import Register from "login/Register";
import { ListCategories } from "pages/dashboard/Category/ListCategories";
import { NeworEditCategory } from "pages/dashboard/Category/NewCategory";
import { LeftMenu } from "_components/layout/LeftMenu";
import ListCompanies from "pages/dashboard/Company/ListCompanies";
import { UpsertCompany } from "pages/dashboard/Company/UpsertCompany";

function RouteTables() {
  return (
    <Routes history={history}>
      <Route
        exact={true}
        path="/"
        element={
          // <PrivateRoute>
          <Layout>
            <Home />
          </Layout>
          // </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Layout>
              {/* <LeftMenu /> */}
              <Dashboard />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/register"
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <About />
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout>
            <Contact />
          </Layout>
        }
      />
      <Route
        path="/dashboard/categories"
        element={
          <Layout>
            <ListCategories />
          </Layout>
        }
      />
      <Route
        path="/dashboard/category/new"
        element={
          <Layout>
            <NeworEditCategory />
          </Layout>
        }
      />
      <Route
        path="/dashboard/category/edit/:id"
        element={
          <Layout>
            <NeworEditCategory />
          </Layout>
        }
      />
      <Route
        path="/dashboard/companies"
        element={
          <Layout>
            <ListCompanies />
          </Layout>
        }
      />
      <Route
        path="/dashboard/company/new"
        element={
          <Layout>
            <UpsertCompany />
          </Layout>
        }
      />
      <Route
        path="/dashboard/company/edit/:id"
        element={
          <Layout>
            <UpsertCompany />
          </Layout>
        }
      />
    </Routes>
  );
}

export default RouteTables;
