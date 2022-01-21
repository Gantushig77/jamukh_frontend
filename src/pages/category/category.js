import React, { useState } from 'react';
import Appbar from '../../components/appbar/appbar';
import Footer from '../../components/footer/footer';
import { Alert } from '@mui/lab';
import { Snackbar } from '@mui/material';
import { makeStyles } from "@mui/styles";
import Section from '../../components/listContantainer/section1/Section1'




export default function Category(props) {

  const classes = useStyles(props);


  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: 'Амжилттай илгээлээ',
    severity: 'success',
  });

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarState({ ...snackbarState, open: false });
  };

  return (
    <div
      className={classes.background}
    >
      <Appbar phone={props?.phone} tablet={props?.tablet} />
      {/* Snackbar */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={snackbarState.open}
        autoHideDuration={5000}
        onClose={handleSnackClose}
      >
        <Alert
          onClose={handleSnackClose}
          severity={snackbarState.severity}
          sx={{ width: '100%' }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
      <div className={classes.section}> 
          <Section bg={props?.bg} title={props?.title} phone={props?.phone} tablet={props?.tablet}/>
       </div> 
      <div className={classes.footer}>
           <Footer phone={props?.phone} tablet={props?.tablet} />
       </div>
    </div>
  );
}
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  section:{
    width: (props) => (props?.phone ? '100%' : '1300px'),
  },
  background:{
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'column',
    position:'relative',
    backgroundImage:(props) =>`url(${props?.bg})`,
    backgroundPosition:"center",
    backgroundSize:'cover',
    backgroundRepeat:'no-repeat',
    height:"100vh"
  },
  footer:{
    position:"sticky",
    top: "calc( 100vh - 20px )",
    width:"100%",
  }
})
