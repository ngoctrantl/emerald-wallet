import { launcher } from '@emeraldwallet/store';
import { Logo } from '@emeraldwallet/ui';
import { CircularProgress, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import * as React from 'react';
import { connect } from 'react-redux';
import InitialSetup from '../InitialSetup';

const getStyles = (theme: any) => ({
  brandPart1: {
    color: theme.palette && theme.palette.primary.main
  },
  brandPart2: {
    color: theme.palette && theme.palette.secondary.main
  }
});

interface IWelcomeProps {
  message: any;
  currentTermsVersion: any;
  level: any;
  needSetup: any;
  classes?: any;
}

const Welcome = (props: IWelcomeProps) => {
  const {
    message, level, needSetup, classes, currentTermsVersion
  } = props;
  let messageBlock = null;
  if (message) {
    const messageStyle = {
      color: '#999'
    };
    if (level === 3) {
      messageStyle.color = '#f66';
    }
    messageBlock = <span style={messageStyle}><CircularProgress size={25}/> {message}</span>;
  }

  if (needSetup) {
    return (
      <Grid container={true} justify='center' alignItems='center'>
        <Grid item={true} xs={10}>
          <InitialSetup currentTermsVersion={currentTermsVersion}/>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container={true} direction='column' justify='center' alignItems='center' style={{ maxWidth: '1150px' }}>
      <Grid item={true} xs={true} style={{ paddingTop: '6%' }}>
        <Logo width='250' height='250'/>
      </Grid>
      <Grid item={true}>
        <Grid container={true} direction='column'>
          <Grid item={true} xs={true}>
            <div style={{ fontSize: '42px' }}>
              <span className={classes.brandPart1}>Emerald </span>
              <span className={classes.brandPart2}>Wallet</span>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item={true} xs={true} style={{ paddingTop: '40px', height: '40px' }}>
        <div>
          {messageBlock}
        </div>
      </Grid>
    </Grid>
  );
};

const StyledWelcome = withStyles(getStyles)(Welcome);

export default connect(
  (state: any, ownProps: IWelcomeProps) => {
    const msg = launcher.selectors.getMessage(state);
    return ({
      ...msg,
      needSetup: state.launcher.get('configured') && (state.launcher.get('terms') !== ownProps.currentTermsVersion)
    });
  },
  null
)(StyledWelcome);
