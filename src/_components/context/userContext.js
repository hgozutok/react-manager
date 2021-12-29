import React, { Component, createContext, useState, useContext } from "react";

export const UserContext = createContext({
  lang: "tt",
  toggleLang: () => {},
});

const toggleLang = () => {
  langu = "val";
};
var langu = "en";

export const LanguageContext = React.createContext({
  language: "en",
  setLanguage: () => {},
});

export const MainContext = React.createContext();

export default { UserContext, LanguageContext, useContext, MainContext };
