import React from 'react';
// import { ipcRenderer } from 'electron';
import {
  AppBar,
  IconButton,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from '@material-ui/core';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/core/styles';
import image from '../../../assets/appIconLarge.png';
import MainSettings from '../modules/settings/components/MainSettings';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  customizeToolbarHeight: {
    minHeight: theme.spacing(10),
  },
}));

function onClickUpdateButton() {
  window.api.ipcRenderer.checkUpdate();
}

function Navbar() {
  const classes = useStyles();

  const [isDrawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar className={classes.customizeToolbarHeight}>
          <img
            src={image}
            width={50}
            alt="Coin Watch"
            className={classes.logo}
          />
          <Typography variant="h4" className={classes.title}>
            Coin Watch
          </Typography>
          <IconButton color="inherit" onClick={onClickUpdateButton}>
            <SystemUpdateAltIcon />
          </IconButton>
          <IconButton color="inherit" onClick={() => toggleDrawer(true)}>
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
      >
        <MainSettings close={() => toggleDrawer(false)} />
      </SwipeableDrawer>
    </div>
  );
}

export default Navbar;
