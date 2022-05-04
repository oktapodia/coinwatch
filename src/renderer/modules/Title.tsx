import { Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5),
    flexGrow: 1,
    textAlign: 'center',
  },
}));

type TitleType = { children: string };

function Title({ children }: TitleType) {
  const classes = useStyles();

  return (
    <Typography variant="h5" className={classes.title}>
      {children}
    </Typography>
  );
}

export default Title;
