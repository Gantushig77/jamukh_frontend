import React, { useContext } from 'react';
import { Container, Card, Divider, Typography } from '@mui/material';
import colors from '../../constants/colors';
import { makeStyles } from '@mui/styles';
import TheContext from '../../context/context';
import online_order from '../../assets/icons/online_order.png';
import shop from '../../assets/icons/shop.png';
import sale from '../../assets/icons/sale.png';
import meal from '../../assets/icons/meal.png';
import { useQuery } from '@apollo/client';
import { GET_USER_SERVICE_INFO } from '../../graphql/gql/userServiceInfo/userSeviceInfo';
import CircularProgressLoader from '../loader/circularProgress';

export default function ServiceInfo() {
  const ContextHook = useContext(TheContext);
  const contextText = ContextHook.contextValue.contextText;
  const account = ContextHook?.account;
  const classes = useStyles();

  const { data: serviceInfo, loading } = useQuery(GET_USER_SERVICE_INFO, {
    fetchPolicy: 'cache-and-network',
    variables: { userId: account?._id },
    onCompleted(data) {
      console.log(data);
    },
    onError(e) {
      console.log(e);
    },
  });

  if (loading) return <CircularProgressLoader />;

  return (
    <Container maxWidth={false} disableGutters className={classes.root}>
      <Typography className={classes.title}>{contextText.service.title}</Typography>
      <Typography className={classes.description}>
        Таны сонгосон багцтай холбоотой дэлгэрэнгүй мэдээллийг энэхүү хэсэгт харуулж
        байна. Үйлчилгээний төгсгөлд та өөрийн байршуулсан мөнгөн дүнгээрээ багцаа дахин
        сунгах эсвэл эргүүлэн авах боломжтой.
      </Typography>
      <Container className={classes.cardContainer}>
        {cardData.map((item, index) => (
          <Card key={'card' + index} className={classes.card}>
            <Container disableGutters className={classes.cardIconContainer}>
              <img alt={'card'} src={item.image} className={classes.cardIcon} />
            </Container>
            <Typography className={classes.cardTitle}>{item.title}</Typography>
            <Typography className={classes.cardDescription}>
              {item.description}
            </Typography>
            <Divider />
            {index === 3
              ? item.list.map((list_item, list_index) => (
                  <Container key={'item' + list_index} className={classes.cardList}>
                    <div
                      className={classes.cardDot}
                      style={{
                        backgroundColor: list_index % 2 === 0 ? '#F95A48' : '#6A67D3',
                      }}
                    />
                    <Typography className={classes.cardListItem}>
                      {serviceInfo?.getUserServiceInfo
                        ? `Сар бүр ${serviceInfo?.getUserServiceInfo[0]?.serviceOption?.monthlyLimit}кг хүртэлх мах 
                      ${serviceInfo?.getUserServiceInfo[0]?.serviceOption?.discount}% хөнгөлүүлэх`
                        : list_item}
                    </Typography>
                  </Container>
                ))
              : index === 2
              ? item.list.map((list_item, list_index) => (
                  <Container key={'item' + list_index} className={classes.cardList}>
                    <div
                      className={classes.cardDot}
                      style={{
                        backgroundColor: list_index % 2 === 0 ? '#F95A48' : '#6A67D3',
                      }}
                    />
                    <Typography className={classes.cardListItem}>
                      {serviceInfo?.getUserServiceInfo
                        ? list_index === 0
                          ? `Сард ${serviceInfo?.getUserServiceInfo[0]?.serviceOption?.monthlyLimit}кг хүртлэх эрхтэй`
                          : list_index === 1
                          ? `${0} кг өмнөх сараас үлдсэн`
                          : `${serviceInfo?.getUserServiceInfo[0]?.meatAmount}кг авах эрх үлдсэн`
                        : list_item}
                    </Typography>
                  </Container>
                ))
              : item.list.map((list_item, list_index) => (
                  <Container key={'item' + list_index} className={classes.cardList}>
                    <div
                      className={classes.cardDot}
                      style={{
                        backgroundColor: list_index % 2 === 0 ? '#F95A48' : '#6A67D3',
                      }}
                    />
                    <Typography className={classes.cardListItem}>{list_item}</Typography>
                  </Container>
                ))}
          </Card>
        ))}
      </Container>
    </Container>
  );
}

const cardData = [
  {
    title: 'Онлайн Захиалга',
    image: online_order,
    description: 'Та хүссэн үедээ захиалга өгөх боломжтой.',
    list: ['Онлайнаар захиал', 'Хүрээ Маркет хүргээд өгнө'],
  },
  {
    title: 'Нэрийн дэлгүүрүүд',
    image: shop,
    description: 'Та манай салбар дэлгүүрүүдээр зочлоорой.',
    list: ['+150 салбар', '+100 Хүргэлттэй'],
  },
  {
    title: 'Хөнгөлөлттэй Мах',
    image: meal,
    description: 'Таны хөнгөлөлттэй авах махны хэмжээ',
    list: ['Сард 30кг мах ', '0кг өмнөх сараас үлдсэн', '30кг авах эрх үлдсэн'],
  },
  {
    title: 'Хөнгөлөлт',
    image: sale,
    description: 'Зах зээлийн үнээс 15% хямд үнээр мах авах боломжтой.',
    list: ['Сар бүр 30кг хүртэлх мах 15% хөнгөлүүлэх'],
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  title: {
    fontFamily: 'SF Pro Display',
    fontSize: 27,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 14,
    marginTop: 20,
  },
  description: {
    maxWidth: 650,
    width: '100%',
    fontFamily: 'SF Pro Display',
    fontWeight: 'normal',
    fontSize: '14px',
    textAlign: 'center',
    color: colors.gray,
    margin: 'auto',
  },
  cardContainer: {
    marginTop: 40,
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'row wrap',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  card: {
    width: 260,
    height: 350,
    minWidth: 255,
    maxHeight: 350,
    backgroundColor: '#f7f7f7',
    border: 'none',
    borderRadius: 17,
    boxShadow: 'none',
    boxSizing: 'borderBox',
    padding: 15,
    paddingTop: 45,
    paddingBottom: 45,
    marginBottom: 20,
  },
  cardIconContainer: {
    width: 120,
    height: 120,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: "'center",
    margin: 'auto',
    backgroundColor: '#ebebf1',
  },
  cardIcon: {
    margin: 'auto',
    objectFit: 'cover',
  },
  cardTitle: {
    fontFamily: 'SF Pro Display',
    fontSize: 21,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  cardDescription: {
    color: '#000',
    fontSize: 14,
    opacity: 0.7,
    fontFamily: 'SF Pro Display',
    marginBottom: 15,
  },
  cardDot: {
    width: 7,
    maxWidth: 7,
    height: 7,
    borderRadius: '50%',
    backgroundColor: '#6A67D3',
    marginRight: 10,
  },
  cardList: {
    marginTop: 20,
    padding: 0,
    textAlign: 'start',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardListItem: {
    fontFamily: 'SF Pro Display',
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
