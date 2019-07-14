import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import routes from '../routes';
import { Store } from '../store';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  },
  appBar: {
    height: 'auto',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MainContainer () {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { getters } = useContext(Store);
  const isCreation = getters.isCreation();
  const contentRoutes = isCreation
    ? routes
    : routes.filter(route => !route.onlyCreated);
  const menuRoutes = contentRoutes
    .filter(route => route.isMenu);
  const renderLink = React.forwardRef((itemProps, ref) => (
    <Link {...itemProps} ref={ref} />
  ));

  function handleMenu (event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose () {
    setAnchorEl(null);
  }

  return (
    <Router
      basename="/three-by-three-chart">
      <div className={classes.root}>
        <div className={classes.appBar}>
          <AppBar position="static" >
            <Toolbar>
              <IconButton edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}>
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                {menuRoutes.map((route, index) => (
                  <MenuItem key={index} to={route.path} onClick={handleClose} component={renderLink}>
                    {route.name}
                  </MenuItem>
                ))}
              </Menu>
              <Typography variant="h6" className={classes.title}>
                Three by three chart
          </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <div style={{ flex: 1, padding: "10px" }}>
          {contentRoutes.map(route => (
            <Route
              key={route.name}
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </div>
      </div >
    </Router>
  );
}