// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { isNull } from 'lodash';
import PropTypes from 'prop-types';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ETrend from '../../../../types/ETrend';
import formatPrice from '../../../../main/helpers/formatPrice';
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

interface IProps {
  coin: string;
  price: number;
  visibility: boolean;
  slug: string;
  to: string;
  trend: string;
  getCoinPrice: any;
}

function Coin(props: IProps) {
  const classes = useStyles();

  useEffect(() => {
    if (isNull(props.price)) {
      props.getCoinPrice(props);
    }
  }, [getCoinPrice]);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  function onToggleVisibility(slug) {
    props.toggleVisibility(slug);
    props.toggleForceRefresh();
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  function onRemoveCoin(slug) {
    return props.removeCoin(slug).then(() => props.toggleForceRefresh());
  }

  // eslint-disable-next-line @typescript-eslint/no-redeclare
  const { price, coin, trend, slug, to, visibility } = props;

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
  // eslint-disable-next-line react/no-unused-prop-types
  exchange: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  price: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  coin: PropTypes.any.isRequired,
  visibility: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  trend: PropTypes.any,
  removeCoin: PropTypes.func.isRequired,
  getCoinPrice: PropTypes.func.isRequired,
  toggleVisibility: PropTypes.func.isRequired,
  toggleForceRefresh: PropTypes.func.isRequired,
};

Coin.defaultProps = {
  price: 0,
  exchange: 'CCCAGG',
  trend: ETrend.LOWER,
};

export default connect(null, {
  getCoinPrice,
  removeCoin,
  toggleVisibility,
  toggleForceRefresh,
})(Coin);
