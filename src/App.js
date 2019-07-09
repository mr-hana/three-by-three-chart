import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import amber from '@material-ui/core/colors/amber';
import yellow from '@material-ui/core/colors/yellow';
import MainContainer from './components/MainContainer';
import { StoreProvider } from './store';

const theme = createMuiTheme({
  palette: {
    primary: amber,
    secondary: yellow,
  },
  typography: {
    button: {
      textTransform: "none"
    }
  },
  props: {
    MuiCheckbox: {
      color: "primary"
    },
    MuiRadio: {
      color: "primary"
    },
    MuiSwitch: {
      color: "primary"
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StoreProvider>
        <MainContainer />
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
