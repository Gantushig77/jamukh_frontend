import React, { useContext } from 'react';
import { Container, Button } from '@mui/material';
import { useHistory } from 'react-router';
import { makeStyles } from '@mui/styles';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import colors from '../../constants/colors';
import TheContext from '../../context/context';

export default function Footer(props) {
  const classes = useStyles(props);
  const history = useHistory();
  const ContextHook = useContext(TheContext);
  const contextText = ContextHook.contextValue.contextText;

  return (
    <Container disableGutters className={classes.root}>
      <Container disableGutters className={classes.flexContainer}>
        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
          disableElevation
          startIcon={<PhoneIcon />}
        >
          {contextText.footer.phone}
        </Button>
        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
          disableElevation
          startIcon={<MailOutlineIcon />}
        >
          {contextText.footer.email}
        </Button>
        <Button
          onClick={() => history.push('/terms-and-conditions')}
          variant='contained'
          color='secondary'
          className={classes.button}
          disableElevation
        >
          {contextText.footer.terms}
        </Button>
      </Container>

      <Button
        variant='contained'
        color='secondary'
        disableElevation
        className={classes.buttonLegal}
      >
        {contextText.footer.legal}
      </Button>
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    borderTop: '1px solid gray',
    display: 'flex',
    flexDirection: (props) => (props.phone ? 'column' : 'row'),
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 1440,
  },
  flexContainer: {

    marginRight: 15,
    marginLeft: 15,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: (props) => (props.phone ? 'center' : 'flex-start'),
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'transparent',
    color: colors.gray,
    fontSize: (props) => (props.tablet ? '14px' : props.phone ? '12px' : '17px'),
    fontFamily: 'SF Pro Display',
    fontWeight: 'normal',
    textDecoration: 'none',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  buttonLegal: {
    marginTop: (props) => (props.phone ? 0 : 30),
    marginBottom: 30,
    backgroundColor: 'transparent',
    color: colors.gray,
    fontSize: (props) => (props.tablet ? '14px' : props.phone ? '12px' : '17px'),
    fontFamily: 'SF Pro Display',
    fontWeight: 'normal',
    textTransform: 'none',
    maxWidth: 340,
    width: '100%',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
});
