import { makeStyles } from "@material-ui/core/styles"

import {
    BrowserRouter as Router,
    Switch, Route, Link
  } from "react-router-dom";
  
  import {
    Drawer, List, ListItem,
    ListItemIcon, ListItemText,
    Container, Typography,
  } from "@material-ui/core";
  
  import HomeIcon from "@material-ui/icons/Home";
  import InfoIcon from '@material-ui/icons/Info';
  import Toolbar from '@material-ui/core/Toolbar';

  const useStyles = makeStyles((theme) => ({
    // drawerPaper: { width: 'inherit' },
    drawer: {
        width: 240,
        flexShrink: 0,
      },
      drawerPaper: {
        width: 240,
      },
      drawerContainer: {
        overflow: 'auto',
      },
    link: {
      textDecoration: 'none',
      color: theme.palette.text.primary
    }
  }))
const SideNav = () => {
    const classes = useStyles();
    return (
        <Router>
      <div style={{ display: 'flex' }}>
        <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
           <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <Link to="/" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} />
              </ListItem>
            </Link>
            <Link to="/daily-cash-count" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary={"Daily Cash Count"} />
              </ListItem>
            </Link>
          </List>
          </div>
        </Drawer>
        <Switch>
          <Route exact path="/">
            <Container>
              <Typography variant="h3" gutterBottom>
                Dashboard
              </Typography>
              <Typography variant="body1" gutterBottom>
                Dashboard
              </Typography>
            </Container>
          </Route>
          <Route exact path="/daily-cash-count">
            <Container>
              <Typography variant="h3" gutterBottom>
                Daily Cash Count
              </Typography>
              <Typography variant="body1" gutterBottom>
                Daily Cash Count
              </Typography>
            </Container>
          </Route>
        </Switch>
      </div>
    </Router>
    )
}

export default SideNav
