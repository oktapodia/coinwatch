// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { FunctionComponent, useEffect } from 'react';
import { map } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
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
import { getCoins, toggleForceRefresh } from '../actions';
import Title from '../../Title';
import ModalButton from '../../modal/containers/ModalButton';

type CoinsPageProps = {
  coins: string[];
};

const CoinsPage: FunctionComponent<CoinsPageProps> = () => {
  const dispatch = useDispatch();
  const coins = useSelector((state) => state.coins.coins);

  useEffect(() => {
    dispatch(getCoins());
  }, [dispatch]);

  console.log('COINS', coins);

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
                <IconButton color="primary" onClick={() => dispatch(toggleForceRefresh())}>
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

export default CoinsPage;
