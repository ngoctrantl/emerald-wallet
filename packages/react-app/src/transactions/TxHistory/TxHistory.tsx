import { addresses, txhistory } from '@emeraldwallet/store';
import Header from '@emeraldwallet/ui/lib/components/tx/TxHistory/Header';
import { withStyles } from '@material-ui/styles';
import * as React from 'react';
import { connect } from 'react-redux';
import List from '../List';

const styles = (theme?: any) => ({
  container: {
    padding: '30px 30px 20px',
    backgroundColor: 'white',
    border: `1px solid ${theme.palette.divider}`
  }
});

interface IProps {
  accountId: string;
  transactions: any;
  accounts: any;
  classes: any;
}

interface IState {
  txFilter: string;
  displayedTransactions: any;
}

class TransactionsHistory extends React.Component<IProps, IState> {
  constructor (props: IProps) {
    super(props);
    this.state = {
      txFilter: 'ALL',
      displayedTransactions: this.props.transactions
    };
  }

  public UNSAFE_componentWillReceiveProps (nextProps: IProps) {
    if (nextProps.transactions) {
      this.setState({
        ...this.state,
        displayedTransactions: txhistory.selectors.filterTransactions(
          this.state.txFilter, this.props.accountId, nextProps.transactions, this.props.accounts)
      });
    }
  }

  public onSearchChange = (e: any) => {
    return this.setState({
      displayedTransactions: txhistory.selectors.searchTransactions(e.target.value, this.props.transactions)
    });
  }

  public onTxFilterChange = (event: any, value: any) => {
    const { accountId, transactions, accounts } = this.props;
    this.setState({
      txFilter: value,
      displayedTransactions: txhistory.selectors.filterTransactions(value, accountId, transactions, accounts)
    });
  }

  public render () {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Header
          onTxFilterChange={this.onTxFilterChange}
          txFilterValue={this.state.txFilter}
          onSearchChange={this.onSearchChange}
        />
        <List
          transactions={this.state.displayedTransactions}
          accountId={this.props.accountId}
        />
      </div>
    );
  }
}

const StyledTransactionsHistory = withStyles(styles)(TransactionsHistory);

export default connect(
  (state, ownProps: any) => {
    const txs = ownProps.transactions || txhistory.selectors.allTrackedTxs(state);
    return {
      transactions: txs.sortBy((tx: any) => tx.get('timestamp')).reverse(),
      accounts: addresses.selectors.all(state),
      accountId: ownProps.accountId
    };
  },
  (dispatch, ownProps) => ({})
)(StyledTransactionsHistory);
