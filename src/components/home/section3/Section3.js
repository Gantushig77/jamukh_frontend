import React from 'react';
import { Container, Typography, CircularProgress ,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Divider,} from '@mui/material';
import { makeStyles } from '@mui/styles';
import colors from '../../../constants/colors';
import { useQuery } from '@apollo/client';
import { AVAILABLE_GOODS_WITHOUT_CHILDREN } from '../../../graphql/gql/category/category';
import { useHistory } from 'react-router';
import { stringEllipser } from '../../../helpers/helperFunctions';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Slider from 'react-slick';

const CategoryItem = (props) => {
  const classes = useStyles(props);
  return (
    <Container onClick={props?.onClick} className={classes.categoryContainer}>
      <Typography className={classes.categoryText}>{props.text}</Typography>
    </Container>
  );
};

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
const plc =
  'https://images.ctfassets.net/3s5io6mnxfqz/5GlOYuzg0nApcehTPlbJMy/140abddf0f3f93fa16568f4d035cd5e6/AdobeStock_175165460.jpeg?fm=jpg&w=900&fl=progressive';

export default function Section3(props) {
  const classes = useStyles(props);
  const history = useHistory();
  const settings = {
    infinite: true,
    arrows: props.phone ? false : true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    autoPlay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const { data: availableGoods, loading: availLoading } = useQuery(
    AVAILABLE_GOODS_WITHOUT_CHILDREN,
    {
      onCompleted(data) {
        console.log(data);
      },
      onError(e) {
        console.log(e);
      },
    }
  );

  return (
    <Container maxWidth={false} disableGutters className={classes.root}>
      <Typography className={classes.title}>NEWS</Typography>
      <Typography className={classes.description}>
       
      </Typography>
      <Container disableGutters className={classes.categoryOuterContainer}>
        {availLoading ? (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
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
          </div>
        )}
      </Container>
    </Container>
  );
}
const CardItem = (props) => {
  const classes = useStyles(props);

  return (
    <Card className={classes.cardRoot}>
      <CardActionArea onClick={() => props?.onSelect(props?.id, props?.parentId)}>
        <CardMedia
          className={classes.media}
          image={props?.img ? props.img : plc}
          title={'Many types of meat'}
        />
        <CardContent style={{ height: 120 }}>
          <Typography gutterBottom className={classes.cardTitle}>
            {stringEllipser(props?.title, 14)}
          </Typography>
          <Typography className={classes.cardDesc}>
            {stringEllipser(props?.description, props?.phone ? 70 : 90)}
          </Typography>
        </CardContent>
        <Divider variant='middle' />
          <CardContent>
            <div className={classes.cardPriceContainer}>
              <Typography className={classes.cardPrice}>{props?.price + '₮'}</Typography>
              <Typography className={classes.cardUnit}>
                {props?.isUnit ? ' /1 ш' : ' /1 кг'}
              </Typography>
            </div>
          </CardContent>
      </CardActionArea>
    </Card>
  );
};
const useStyles = makeStyles({
  root: {
    width: '100%',
    paddingTop: 50,
    paddingBottom: 30,
    maxWidth:"1200px"
  },
  categoryOuterContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    maxWidth: 1000,
    marginTop: 20,
    marginBottom: 20,
    cursor: 'pointer',
  },
  categoryContainer: {
    margin: 10,
    width: (props) => (props.phone ? 140 : 215),
    height: (props) => (props.phone ? 90 : 120),
    borderRadius: 14,
    backgroundImage: (props) =>
      `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${props.img})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: (props) => (props.phone ? 16 : 21),
    fontFamily: 'SF Pro Display',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  title: {
    marginBottom: 30,
    textAlign: 'left',
    fontSize: 22,
    paddingLeft:"30px",
    fontFamily: "'Roboto Condensed', sans-serif",
    fontWeight: 'bold',
    color: colors.brandTextColor,
  },
  description: {
    maxWidth: 650,
    paddingRight: 24,
    paddingLeft: 24,
    fontFamily: 'SF Pro Display',
    fontWeight: 'normal',
    fontSize: '14px',
    textAlign: 'center',
    color: colors.gray,
    margin: 'auto',
  },
});
