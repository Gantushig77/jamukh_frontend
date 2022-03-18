import React from 'react';
import { makeStyles } from '@mui/styles';
import './section.css';
import Background from '../../../assets/images/background.jpg';




export default function Section2(props) {
  const classes = useStyles(props);
  console.log(props.posts.account_list,"props.posts.account_list")

  return (
    <div className={classes.container}>
        <div className={classes.root}>
            {props.posts.account_list.map((realtor) =>
              <div className={classes.realtor}>
                 <img src={realtor.avatar.url} className={classes.avatar} alt=""/>
              </div>
            )}
        </div>  
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    display:'flex',
    justifyContent:'center',
    width:'100%'
  },
  root: {
    display: 'grid',
    fontSize: '0',
    gridTemplateColumns: "25% 25% 25% 25%",
    width: '1300px',
    zIndex: '1',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 100,
    marginTop: '120px',
    backgroundImage:`url(${Background})`,
    backgroundRepeat: "no-repeat, repeat",
    backgroundPosition: "center",
    height:'auto',
    backgroundSize: 'cover',

  },
  realtor:{
    display:'flex',
    justifyContent:'center'
  },
  avatar:{
    height:'100px',
    width:'100px',
    borderRadius:'100%'
  },

});
