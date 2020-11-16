import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { isNull } from 'lodash';
import PropTypes from 'prop-types';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ETrend from '../../../types/ETrend';
import formatPrice from '../../../helpers/formatPrice';
import {
  getCoinPrice,
  removeCoin,
  toggleForceRefresh,
  toggleVisibility,
} from '../actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    lower: {
      color: theme.palette.error.main,
    },
    higher: {
      color: theme.palette.success.main,
    },
  })
);

export function Coin(props) {
  const classes = useStyles();

  useEffect(() => {
    if (isNull(props.price)) {
      props.getCoinPrice(props);
    }
  }, []);

  function onToggleVisibility(slug) {
    props.toggleVisibility(slug);
    props.toggleForceRefresh();
  }

  function onRemoveCoin(slug) {
    return props.removeCoin(slug)
      .then(() => props.toggleForceRefresh());
  }

  const { coin, price, visibility, slug, to, trend } = props;
  const currentPriceDisplayed = !isNull(price) ? `${price}` : 'Loading...';

  return (
    <TableRow key={coin.name}>
      <TableCell component="th" scope="row" size="small">
        {coin.name}
      </TableCell>
      <TableCell
        size="small"
        className={trend === ETrend.LOWER ? classes.lower : classes.higher}
      >
        {formatPrice(currentPriceDisplayed, to)}
        {trend}
      </TableCell>
      <TableCell align="right" size="small">
        <IconButton color="primary" onClick={() => onToggleVisibility(slug)}>
          {visibility ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>

        <IconButton color="primary" onClick={() => onRemoveCoin(slug)}>
          <RemoveCircleIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

Coin.propTypes = {
  exchange: PropTypes.string,
  price: PropTypes.string,
  alert: PropTypes.string,
  coin: PropTypes.shape({}).isRequired,
  visibility: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  trend: PropTypes.string,
  removeCoin: PropTypes.func.isRequired,
  getCoinPrice: PropTypes.func.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  toggleForceRefresh: PropTypes.func.isRequired,
};

Coin.defaultProps = {
  price: null,
  alert: null,
  exchange: 'CCCAGG',
  trend: ETrend.LOWER,
};

const dispatchProps = {
  getCoinPrice,
  removeCoin,
  toggleVisibility,
  toggleForceRefresh,
};

export default connect(null, dispatchProps)(Coin);
