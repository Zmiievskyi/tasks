import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';


import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from "./redux/store";

const defaultTheme = createTheme();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
<BrowserRouter 
 >
  <ThemeProvider theme={defaultTheme}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />

      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
    </BrowserRouter>
);

reportWebVitals();
