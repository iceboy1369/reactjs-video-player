import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import logo from './logo.svg';
import './App.css';
import VideoPlayerMain from './VideoPlayer';
import ResponsiveDrawer from './drawer';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <ResponsiveDrawer/>
      {/* <CssBaseline />
      <main><VideoPlayerMain/></main> */}
    </ThemeProvider>
  );
}

export default App;
