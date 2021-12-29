import { createTheme  } from '@mui/material/styles'
import { amber, deepOrange, grey } from '@mui/material/colors';
import { createStyles, makeStyles } from '@mui/styles';





const baseThemee = createTheme({
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 14,
    fontFamilySecondary: "'Roboto Condensed', sans-serif"
    
  }
})


 const darkTheme = createTheme({
  ...baseThemee,

 
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    text: {
      primary: '#f9f4f5',
      secondary: grey[500],
    },
    overrides: {
    textField: {
      textColor: "#ffffff",
      backgroundColor: "rgba(255, 255, 255, 0.02)",
      floatingLabelColor: "rgba(255, 255, 255, 0.54)"
  }
},
  },
  
})
const lightTheme = createTheme({
  ...baseThemee,
  palette: {
    mode: "light",
    primary: {
      main: "#3f51b5"
    },
    secondary: {
      main: "#26a27b"
    },
   
  }
})




export { darkTheme, lightTheme  }

