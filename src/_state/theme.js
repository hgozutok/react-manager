import { atom } from "recoil";

const themeAtom = atom({
  key: "darkTheme",
  default: true,
});

export { themeAtom };
