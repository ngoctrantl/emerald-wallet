import { Blockchains } from '@emeraldwallet/core';
import { addresses, screen } from '@emeraldwallet/store';
import { withStyles } from '@material-ui/styles';
import * as React from 'react';
import { connect } from 'react-redux';
import WalletItem from './WalletItem';
import { Wallet, WalletsOp, WalletOp } from '@emeraldpay/emerald-vault-core';
import {Grid} from "@material-ui/core";


const styles = (theme: any) => ({
  container: {
    marginBottom: '10px'
  },
  hiddenListItem: {
    border: `1px solid ${theme.palette.divider}`,
    opacity: 0.4,
    marginBottom: '10px'
  },
  listItem: {
    border: `1px solid ${theme.palette.divider}`,
    marginBottom: '10px'
  }
});

interface IAccountListProps {
  showFiat: boolean;
  accounts: WalletsOp;
  classes: any;
  openWallet: (wallet: Wallet) => void;
  createTx: (wallet: Wallet) => void;
  showReceiveDialog: (wallet: Wallet) => void;
}

const WalletList = ((props: IAccountListProps) => {
  const {
    accounts, showFiat, classes
  } = props;
  const {
    openWallet, createTx, showReceiveDialog
  } = props;
  return (
    <div className={classes.container}>
      <Grid container={true} spacing={2}>
        {accounts.getWallets().map((wallet: WalletOp) => {
          const className = classes.listItem;
          return (<Grid item={true} xs={6} key={wallet.value.id}>
            <WalletItem
              showFiat={showFiat}
              wallet={wallet}
              openWallet={openWallet}
              createTx={createTx}
              showReceiveDialog={showReceiveDialog}
            />
          </Grid>);
        })}
      </Grid>
    </div>
  );
});

const StyledAccountList = withStyles(styles)(WalletList);

export default connect(
  (state, ownProps) => {
    return {
      accounts: addresses.selectors.all(state),
      showFiat: true
    };
  },
  (dispatch, ownProps) => ({
    createTx: (account: Wallet) => {
      dispatch(screen.actions.gotoScreen('create-tx', account));
    },
    openWallet: (account: Wallet) => {
      dispatch(screen.actions.gotoScreen('wallet', account));
    },
    showReceiveDialog: (account: Wallet) => {
      // TODO vault v3
    //   const address = {
    //     coinTicker: Blockchains[account.blockchain].params.coinTicker,
    //     value: account.id
    //   };
    //   dispatch(screen.actions.showDialog('receive', address));
    }
  })
)((StyledAccountList));
