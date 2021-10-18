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
import colors from '../../../constants/colors';
import { makeStyles } from '@mui/styles';
import { stringEllipser } from '../../../helpers/helperFunctions';
import { useQuery } from '@apollo/client';
import { CHILD_CATEGOREIS } from '../../../graphql/gql/category/category';

const CardItem = (props) => {
  const classes = useStyles(props);
  return (
    <Card className={classes.cardRoot}>
      <CardActionArea onClick={() => props.onSelect(props?.id, props?.parentId)}>
        <CardMedia
          className={classes.media}
          image={props?.img ? props.img : plc}
          title='Many types of meat'
        />
        <CardContent style={{ height: 110 }}>
          <Typography gutterBottom className={classes.cardTitle}>
            {stringEllipser(props?.title, 18)}
          </Typography>
          <Typography className={classes.cardDesc}>
            {stringEllipser(props?.description, 90)}
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

const plc =
  'https://images.ctfassets.net/3s5io6mnxfqz/5GlOYuzg0nApcehTPlbJMy/140abddf0f3f93fa16568f4d035cd5e6/AdobeStock_175165460.jpeg?fm=jpg&w=900&fl=progressive';

export default function Section2(props) {
  const classes = useStyles(props);

  const { data: availableGoods, loading: availLoading } = useQuery(CHILD_CATEGOREIS, {
    variables: { active: true, special: true },
    onCompleted(data) {
      console.log(data);
    },
    onError(e) {
      console.log(e);
    },
  });

  return (
    <Container className={classes.root}>
      <Typography className={classes.title}>Онцлох Бараа</Typography>
      <Typography className={classes.description}>
        Хэрэглэгчдийн таашаалд хамгийн ихээр нийцдэг бараа бүтээгдэхүүнүүдийнхээ нэр
        төрлөөс эрхэм хэрэглэгч та бүхэндээ сонгон харуулж байна. Цаг үе бүрт тохирсон
        бараа бүтээгдэхүүнүүдийг хэрэглэгчиддээ санал болгох болно.
      </Typography>
      <Container className={classes.cardItemContainer}>
        {availLoading ? (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </div>
        ) : (
          // availableGoods?.childCategories?.categories?.length < 0 &&
          availableGoods?.childCategories?.categories?.map((item, index) => {
            return (
              index < 8 && (
                <CardItem
                  id={item?._id}
                  parentId={item?.parentId}
                  onSelect={props?.onCardSelect}
                  key={index}
                  title={item?.name}
                  description={item?.description}
                  img={item?.categoryImg?.path}
                  price={item?.price}
                  isUnit={item?.isUnit}
                  soldBy={item?.selling}
                  phone={props.phone}
                  tablet={props.tablet}
                />
              )
            );
          })
        )}
      </Container>
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    paddingTop: 50,
    width: '100%',
  },
  title: {
    fontFamily: 'SF Pro Display',
    fontSize: 27,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    maxWidth: 650,
    fontFamily: 'SF Pro Display',
    fontWeight: 'normal',
    fontSize: '14px',
    textAlign: 'center',
    color: colors.gray,
    margin: 'auto',
  },
  cardItemContainer: {
    maxWidth: 1000,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingTop: 40,
    paddingBottom: 40,
  },
  cardRoot: {
    maxWidth: (props) => (props.phone ? 400 : 210),
    height: (props) => (props.phone ? 350 : 350),
    width: '100%',
    marginBottom: 20,
    textAlign: 'left',
    borderRadius: 17,
    border: '1px solid lightgray',
    marginLeft: 10,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'SF Pro Display',
  },
  cardDesc: {
    height: (props) => (props.phone ? 70 : 100),
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'SF Pro Display',
    color: 'gray',
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
});
