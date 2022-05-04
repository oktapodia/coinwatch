// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { FunctionComponent } from 'react';
import { map } from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RefreshIcon from '@material-ui/icons/Refresh';
import Coin from '../components/Coin';
import CoinSettings from './CoinsSettings';
import { toggleForceRefresh } from '../actions';
import Title from '../../Title';
import ModalButton from '../../modal/containers/ModalButton';

type CoinsPageProps = {
  coins: string[];
};

const CoinsPage: FunctionComponent<CoinsPageProps> = ({ coins, ...rest }) => {
  console.log('COINS', coins)
  const followedCoinsDisplay = map(coins, (fc, index) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Coin key={index} {...fc} />
  ));

  return (
    <Container>
      <Title>Coins</Title>
      <TableContainer component={Paper}>
        <Table width="100%">
          <TableHead>
            <TableRow>
              <TableCell>Coin</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align="right">
                <ModalButton component={CoinSettings}>
                  <IconButton color="primary">
                    <AddCircleIcon />
                  </IconButton>
                </ModalButton>
                <IconButton color="primary" onClick={rest.toggleForceRefresh}>
                  <RefreshIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{followedCoinsDisplay}</TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

CoinsPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  coins: PropTypes.array.isRequired,
  toggleForceRefresh: PropTypes.func.isRequired,
};

function mapStateToProps({ coins }) {
  return {
    coins: coins.coins,
  };
}

export default connect(mapStateToProps, { toggleForceRefresh })(CoinsPage);
