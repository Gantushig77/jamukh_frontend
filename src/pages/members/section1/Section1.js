import React, { useRef, useContext } from 'react';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import colors from '../../../constants/colors';
import TheContext from '../../../context/context';
import Friend from '../friend/friend';
import Avatar from '../../../assets/images/avatar.jpg';

export default function Section1(props) {
  const classes = useStyles(props);
  let slider = useRef(null);

  const ContextHook = useContext(TheContext);
  const account = ContextHook.account;

  return (
    <Container disableGutters maxWidth={false} className={classes.root}>
      <SliderItem
        dots={1}
        sliderRef={slider}
        phone={props?.phone}
        avatar={''}
        admin={'Grand Marshal'}
        time={'12min'}
        area={'MKV 4,500,000$'}
        title={'Gantumur Batmunkh'}
        email={`batmunkh@gmail.com`}
        buttonText={account ? 'Үйлчилгээ харах' : 'SEE ALL >'}
        backgroundImg={Avatar}
        link={account ? '/user/services' : '/sign-up'}
      />
    </Container>
  );
}

const SliderItem = (props) => {
  const classes = useStyles(props);
  // const path = (
  //   <svg
  //     width='50'
  //     height='78'
  //     viewBox='0 0 80 108'
  //     fill='none'
  //     xmlns='http://www.w3.org/2000/svg'
  //   >
  //     <g filter='url(#filter0_d)'>
  //       <path d='M4 0H76V100L40.792 82L4 100V0Z' fill='#D38F63' />
  //       <path
  //         d='M40.5723 81.5509L4.5 99.1988V0.5H75.5V99.1828L41.0196 81.5548L40.7969 81.441L40.5723 81.5509Z'
  //         stroke='black'
  //       />
  //     </g>
  //     <defs>
  //       <filter
  //         id='filter0_d'
  //         x='0'
  //         y='0'
  //         width='80'
  //         height='108'
  //         filterUnits='userSpaceOnUse'
  //         color-interpolation-filters='sRGB'
  //       >
  //         <feFlood flood-opacity='0' result='BackgroundImageFix' />
  //         <feColorMatrix
  //           in='SourceAlpha'
  //           type='matrix'
  //           values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
  //           result='hardAlpha'
  //         />
  //         <feOffset dy='4' />
  //         <feGaussianBlur stdDeviation='2' />
  //         <feComposite in2='hardAlpha' operator='out' />
  //         <feColorMatrix
  //           type='matrix'
  //           values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
  //         />
  //         <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow' />
  //         <feBlend
  //           mode='normal'
  //           in='SourceGraphic'
  //           in2='effect1_dropShadow'
  //           result='shape'
  //         />
  //       </filter>
  //     </defs>
  //   </svg>
  // );
  return (
    <Container disableGutters maxWidth={false}>
      <div className={classes.rootRow}>
        <div className={classes.sliderItemBackImg} />
        <div className={classes.sliderItemContainer}>
          <div className={classes.memberContantainer}>
            <div className={classes.memberContantainerCenter}>
              <div className={classes.memberTitle}>Members</div>
              <div className={classes.tabs}>
                <div className={classes.tabActive}>PLATINIUM</div>
                <div className={classes.tab}>MEMBERS REQUEST</div>
              </div>
              <div className={classes.friendColumn}>
                <Friend
                  name='Temuujin'
                  img={Avatar}
                  rate='4.5'
                  button={<div className={classes.deleteBtn}>Delete</div>}
                />
                <Friend
                  name='Temuujin'
                  img={Avatar}
                  rate='4.5'
                  button={
                    <div>
                      <div className={classes.acceptBtn}>Accept</div>
                      <div className={classes.deleteBtn}>Decline</div>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

const useStyles = makeStyles({
  rootRow: {},
  acceptBtn: {
    color: 'white',
    marginBottom: '5px',
    padding: '5px',
    background:
      'linear-gradient(178.42deg, #F8D4A0 -60.84%, #E49461 1.15%, #954D1D 75.77%, #C0703D 139.77%)',
  },
  deleteBtn: {
    padding: '5px',
    border: '1px solid #D3D3D3',
  },
  friendColumn: {
    display: 'flex',
    padding: '20px',
  },
  tabs: {
    display: 'flex',
    padding: '40px',
  },
  tabActive: {
    padding: '12px',
    background:
      'linear-gradient(178.42deg, #F8D4A0 -60.84%, #E49461 1.15%, #954D1D 75.77%, #C0703D 139.77%)',
    color: 'white',
    boxSizing: 'border-box',
    cursor: 'not-allowed',
  },
  tab: {
    padding: '12px',
    boxSizing: 'border-box',
    opocity: '0.5',
    color: '#0000004D',
    cursor: 'pointer',
  },

  root: {
    minHeight: (props) => (props.phone ? 780 : 560),
    width: '100%',
    fontFamily: 'Roboto Condensed',
    backgroundColor: colors.backgroundColor,
  },
  memberTitle: {
    color: '#D38F63',
    fontSize: '38px',
    fontWeight: 'bold',
  },
  memberContantainerCenter: {
    width: '1000px',
    backgroundColor: 'white',
    height: '1000px',
    padding: '80px 0px',
    border: '1px solid green',
  },
  memberContantainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '100px',
  },
  sliderItemBackImg: {
    boxShadow:
      ' rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
    backgroundImage: (props) =>
      `linear-gradient(rgba(0, 0, 0, 0.5),rgba(37,37,37,1) 100%), url(${props.backgroundImg})`,
    backgroundPosition: 'center',
    filter: 'blur(0px)',
    '-webkit9-filter': 'blur(0px)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: (props) => (props?.phone ? '600px' : '500px'),
    marginBottom: 60,
    width: '100%',
    justifyContent: 'center',
  },
  sliderItemContainer: {
    dislay: 'flex',
    alignItems: 'center',
    position: 'relative',
    zIndex: 99,
    transform: 'translate(0px, -100%)',
    height: (props) => (props?.phone ? '600px' : '500px'),
    marginBottom: 10,
    width: '100%',
  },
});
