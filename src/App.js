import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import ResponsiveDrawer from './drawer';



const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <ResponsiveDrawer/>
    </ThemeProvider>
  );
}

export default App;
