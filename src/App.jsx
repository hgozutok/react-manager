import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import RouteTables from "_components/routes/RouteTables";
import React, { useEffect } from "react";
import { darkTheme, lightTheme } from "_components/theme/Theme";
import { themeAtom } from "_state/theme";
import { useRecoilState } from "recoil";

function ThemeFunction({ children }) {
  const [theme, setTheme] = useRecoilState(themeAtom);

  useEffect(() => {
    setTheme(JSON.parse(localStorage.getItem("theme")));
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);
  return (
    <ThemeProvider theme={theme ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export { App };

function App() {
  return (
    <React.Fragment>
      <ThemeFunction>
        <RouteTables />
      </ThemeFunction>
    </React.Fragment>
  );
}
