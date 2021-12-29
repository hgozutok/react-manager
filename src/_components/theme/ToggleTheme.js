import { React, useState, useContext } from "react";
import Switch from "@mui/material/Switch";
import { darkTheme, lightTheme } from "./Theme";

import IconButton from "@mui/material/IconButton";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useRecoilState } from "recoil";
import { themeAtom } from "_state/theme";

function ToggleTheme() {
  const [theme, setTheme] = useRecoilState(themeAtom);

  const handleModeChange = () => {
    setTheme(!theme);
  };

  return (
    <div>
      <IconButton aria-label="day/night" onClick={handleModeChange}>
        {theme ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
      </IconButton>
    </div>
  );
}

export { ToggleTheme };
