import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2377de',
    },
    secondary: {
      main: green[700],
    },
  },
  
});


export default theme;