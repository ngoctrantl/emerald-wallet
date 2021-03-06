import { ButtonGroup, IdentityIcon } from '@emeraldplatform/ui';
import { blockchainByName } from '@emeraldwallet/core';
import { Button, CoinAvatar } from '@emeraldwallet/ui';
import {Card, CardContent, CardHeader, Grid, IconButton} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withStyles, withTheme } from '@material-ui/styles';
import * as React from 'react';
import {WalletOp, Wallet} from '@emeraldpay/emerald-vault-core';

import AccountBalance from '../../common/Balance';
import WalletActions from '../WalletActions';
import {AccountSummary} from '../AccountSummary';
import WalletMenu from "./WalletMenu";

const styles = (theme: any) => ({
  tokensDivider: {
    backgroundColor: '#F5F5F5',
    height: '2px',
    width: '100%',
    border: 'none'
  },
  identityIconContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  actionsContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  card: {
    borderRadius: '1px',
    boxShadow: 'none'
  },
  coinCard: {
    alignItems: 'center'
  },
  identityGrid: {
    marginTop: '40px',
    paddingLeft: '60px'
  },
  headerTitle: {
    fontSize: '1em'
  },
  headerSubtitle: {
    fontSize: '0.8em',
    opacity: '25%'
  },
  gridActions: {
    paddingTop: '40px'
  }
});

interface IAccountProps {
  wallet: WalletOp;
  openWallet: (wallet: Wallet) => void;
  createTx: (wallet: Wallet) => void;
  showReceiveDialog: (wallet: Wallet) => void;
  showFiat: any;
  classes: any;
  theme: any;
}

export class Account extends React.PureComponent<IAccountProps> {

  public onSendClick = () => this.props.createTx(this.props.wallet.value);

  public onAddressClick = () => this.props.openWallet(this.props.wallet.value);

  public handleDepositClick = () => this.props.showReceiveDialog(this.props.wallet.value);

  public render () {
    const {
        wallet, theme, classes, showFiat
      } = this.props;
    const fiatStyle = {
      fontSize: '16px',
      lineHeight: '19px',
      color: theme.palette.text.secondary
    };

    return (
        <Card className={classes.card}>
          <Grid container={true}>
            {/*<Grid item={true} xs={2} classes={{root: classes.identityGrid}}>*/}
            {/*  <IdentityIcon id={wallet.value.id} size={64} />*/}
            {/*</Grid>*/}
            <Grid item={true} xs={12}>
              <CardHeader
                title={wallet.value.name}
                classes={{
                  title: classes.headerTitle,
                  subheader: classes.headerSubtitle
                }}
                action={
                  <WalletMenu wallet={wallet}/>
                  // <IconButton aria-label="details"
                  //             onClick={this.onAddressClick}> {/* TODO show menu with wallet actions? */}
                  //   <MoreVertIcon />
                  // </IconButton>
                }>
              </CardHeader>
              <CardContent>
                <Grid container={true}>
                  <Grid container={true} item={true} xs={12}>
                    <AccountSummary wallet={wallet}/>
                  </Grid>
                </Grid>
                <Grid container={true} classes={{root: classes.gridActions}}>
                  <Grid item={true} xs={2}>
                  </Grid>
                  <Grid item={true} xs={10}>
                    <div className={classes.actionsContainer}>
                      <ButtonGroup>
                        {/*<WalletActions wallet={account} />*/}
                        <Button
                          label='Deposit'
                          // onClick={this.handleDepositClick}
                        />
                        <Button
                          label='Send'
                          // disabled={!account.balance}
                          // onClick={this.onSendClick}
                        />
                        <Button
                          label='Details'
                          onClick={this.onAddressClick}
                        />
                      </ButtonGroup>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
    );
  }
}

export default withTheme(withStyles(styles)(Account));
