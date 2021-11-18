import React from 'react';
import { Container, Card, CircularProgress } from '@mui/material';
import colorss from '../../../constants/colors';
import { makeStyles } from '@mui/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Slider from 'react-slick';
import { useQuery } from '@apollo/client';
import { CHILD_CATEGOREIS } from '../../../graphql/gql/category/category';
import Test from '../../../assets/images/test4.png';

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div
      style={{
        backgroundColor: '#6A67D3',
        position: 'absolute',
        right: -30,
        zIndex: 888,
        top: '45%',
        cursor: 'pointer',
        height: 50,
        width: 50,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
      onClick={onClick}
    >
      <ArrowForwardIosIcon htmlColor={'white'} style={{ marginLeft: 3 }} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      style={{
        backgroundColor: '#6A67D3',
        position: 'absolute',
        zIndex: 888,
        left: -70,
        top: '45%',
        cursor: 'pointer',
        height: 50,
        width: 50,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
      onClick={onClick}
    >
      <ArrowBackIosIcon
        htmlColor={'white'}
        style={{
          marginLeft: 10,
        }}
      />
    </div>
  );
}

export default function Section2(props) {
  const classes = useStyles(props);

  const { data: availableGoods, loading: availLoading } = useQuery(CHILD_CATEGOREIS, {
    variables: { active: true, ...(props?.parentId && { parentId: props?.parentId }) },
    onCompleted(data) {
      console.log(data);
    },
    onError(e) {
      console.log(e);
    },
  });

  const settings = {
    infinite: true,
    arrows: props.phone ? false : true,
    speed: 500,
    slidesToShow: props.phone
      ? 2
      : props.tablet || availableGoods?.childCategories?.categories?.length <= 8
      ? 3
      : 4,
    slidesToScroll: 1,
    dots: false,
    autoPlay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <Container className={classes.root}>
      {props?.parentId ? (
        <></>
      ) : (
        <>
          <Container className={classes.cardContent}>
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
            <CardItem />
          </Container>
        </>
      )}
      <Container className={classes.sliderContainer}>
        {availLoading ? (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </div>
        ) : availableGoods?.childCategories?.categories?.length <= 2 ? (
          <div style={{ display: 'flex' }}>
            {availableGoods?.childCategories?.categories?.map((item, index) => (
              <div key={index} style={{ margin: 20, marginLeft: 0 }}>
                <CardItem
                  id={item?._id}
                  parentId={item?.parentId}
                  phone={props?.phone}
                  tablet={props?.tablet}
                  title={item?.name}
                  onSelect={props?.onCardSelect}
                  description={item?.description}
                  img={item?.categoryImg?.path}
                  price={item?.price}
                  isUnit={item?.isUnit}
                  soldBy={''}
                />
              </div>
            ))}
          </div>
        ) : (
          <Slider {...settings}>
            {availableGoods?.childCategories?.categories?.map((item, index) => (
              <CardItem
                id={item?._id}
                parentId={item?.parentId}
                key={index}
                phone={props?.phone}
                tablet={props?.tablet}
                title={item?.name}
                onSelect={props?.onCardSelect}
                description={item?.description}
                img={item?.categoryImg?.path}
                price={item?.price}
                isUnit={item?.isUnit}
                soldBy={''}
              />
            ))}
          </Slider>
        )}
      </Container>
    </Container>
  );
}

const CardItem = (props) => {
  const classes = useStyles(props);

  return (
    <Card className={classes.cardRoot}>
    <div style={{backgroundSize:"cover",width:"100%",backgroundRepeat:"no-repeat",backgroundPosition:"center",height:"100%",backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.1) 5%,rgba(37,37,37,0.9) 85%),url("${Test}")`,position:"relative"}}>
      <div className={classes.cardProperty}>
          PROPERTY  
      </div>
    </div>
  </Card>
  );
};

const useStyles = makeStyles({
  root: {
    width: (props) => (props?.phone ? '100%' : '1300px!important') ,
    overflow: 'hidden',
    backgroundColor: '#252525',
    marginTop: (props) => (props.phone ? 100 : 40),
    fontFamily: "'Roboto Condensed', sans-serif",
  },
  cardProperty:{
    color:"white",
    fontWeight:"bold",
    fontSize:"22px",
    position:"absolute",
    bottom:"15px",
    left:"15px"
  },
  cardContent: {
    display: 'flex',
    maxWidth: '1300px',
    justifyContent: 'center',
    width: '100%',
    flexWrap: 'wrap',
  },
  card: {
    width: '100px',
  },
  cardRoot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 260,
    width: 330,
    height: 360,
    marginBottom: 20,
    textAlign: 'left',
    margin: 5,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'SF Pro Display',
  },
  cardDesc: {
    height: 100,
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'SF Pro Display',
    color: 'gray',
    paddingRight: 32,
  },
  cardSold: {
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'SF Pro Display',
    color: 'gray',
  },
  cardPriceContainer: {
    display: 'flex',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  cardPrice: {
    fontSize: 17,
    fontWeight: '500',
    fontFamily: 'SF Pro Display',
    color: '#6A67D3',
    paddingRight: 5,
  },
  cardUnit: {
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'SF Pro Display',
    color: 'gray',
  },
  media: {
    height: 140,
  },
  sliderContainer: {
    maxWidth: 1000,
    paddingTop: 50,
    paddingBottom: 50,
    overflow: (props) => (props.phone ? 'hidden' : 'visible'),
    minWidth: (props) => (props.phone ? 500 : 0),
    paddingRight: (props) => (props.phone ? 0 : 24),
    paddingLeft: (props) => (props.phone ? 0 : 24),
  },
  title: {
    marginBottom: 30,
    textAlign: 'left',
    fontSize: 22,
    fontFamily: "'Roboto Condensed', sans-serif",
    fontWeight: 'bold',
    color: colorss.brandTextColor,
  },
  titleWithParentId: {
    marginBottom: 10,
    textAlign: 'left',
    fontSize: 26,
    fontFamily: 'SF Pro Display',
    fontWeight: 'bold',
    color: 'black',
    marginLeft: (props) => (props.phone ? 10 : props.tablet ? 40 : 80),
  },
  description: {
    margin: 'auto',
    textAlign: 'center',
    fontFamily: 'SF Pro Display',
    fontWeight: 'normal',
    fontSize: '14px',
    color: 'black',
    maxWidth: 650,
    marginLeft: (props) => (props.phone ? -8 : 'auto'),
    width: '99%',
  },
  descriptionWithParentId: {
    textAlign: 'left',
    fontFamily: 'SF Pro Display',
    fontWeight: 'normal',
    fontSize: '14px',
    color: 'black',
    maxWidth: 550,
    marginLeft: (props) => (props.phone ? 10 : props.tablet ? 40 : 80),
    width: '90%',
  },
});
