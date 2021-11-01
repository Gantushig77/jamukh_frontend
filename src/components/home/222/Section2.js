import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Divider,
  CircularProgress,
} from '@mui/material';
import colorss from '../../../constants/colors';
import { makeStyles } from '@mui/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { stringEllipser } from '../../../helpers/helperFunctions';
import Slider from 'react-slick';
import { useQuery } from '@apollo/client';
import { CHILD_CATEGOREIS } from '../../../graphql/gql/category/category';

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
        <>
          <Typography className={classes.titleWithParentId}>
            Ижил төстэй бараанууд
          </Typography>
          <Typography className={classes.descriptionWithParentId}>
            Эх орны хөрсөнд ургасан үржил шимт тэжээлээр тэжээгдэн, малчны хотхоноос
            бэлтгэн нийлүүлж буй гарал үүслийн гэрчилгээтэй, чанар стандартын дагуу
            лабораторийн шинжилгээнд хамрагдсан үйлдвэрийн аргаар бэлтгэн боловсруулсан
            шинэ мах махан бүтээгдэхүүнийг ТАНАЙ ГЭРТ.
          </Typography>
        </>
      ) : (
        <>
          <div className={classes.title}>CATEGORY</div>
          <Typography className={classes.description}></Typography>
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
    width: '1300px!important',
    overflow: 'hidden',
    backgroundColor: '#252525',
    marginTop: (props) => (props.phone ? -90 : 40),
    fontFamily: "'Roboto Condensed', sans-serif",
  },
  cardRoot: {
    maxWidth: 230,
    height: 360,
    marginBottom: 20,
    textAlign: 'left',
    borderRadius: 17,
    border: '1px solid lightgray',
    marginLeft: 10,
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
