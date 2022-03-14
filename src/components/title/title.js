import React from 'react';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TopArrow from '../../assets/arrow/topArrow.png'


export default function Title(props) {
  const classes = useStyles(props);

  return (
     <Container>
        <div className={classes.titleSlider}>
            <div className={classes.textSlide}>{props?.name}</div>
                <img src={TopArrow} alt=""/>
            </div>
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    minHeight: (props) => (props.phone ? 780 : 560),
    width: '100%',
    zIndex: '1',
    fontFamily: 'Roboto, sans-serif',
    fontWeight:100,
    marginTop:'120px',
  },
  textSlide:{
    borderBottom:'2px solid #C6824D',
    marginBottom:'10px',
    paddingBottom:'5px'
  },
  titleSlider: {
    display: 'flex',
    flexDirection:'column',
    alignItems: 'center',
    fontSize: (props) => (props?.phone ? '42px' : '65px'),
    color:'white',
    textAlign:'center'
  },
});
