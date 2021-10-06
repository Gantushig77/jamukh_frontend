import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Divider,
  CircularProgress,
  useMediaQuery,
  Snackbar,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Pagination from '@mui/lab/Pagination';
import { Alert } from '@mui/lab';
import json2mq from 'json2mq';
import Appbar from '../../components/appbar/appbar';
import Footer from '../../components/footer/footer';
import PageAbout from '../../components/adminComponents/pageAbout';
import { stringEllipser } from '../../helpers/helperFunctions';
import { useQuery, useLazyQuery } from '@apollo/client';
import {
  GET_ACTIVE_PARENT_GOODS,
  CHILD_MARKETEER_GOODS,
} from '../../graphql/gql/marketeer/marketeer';
import { useHistory, useLocation } from 'react-router';
import colors from '../../constants/colors';
import CustomDropdown from '../../components/customDropdown/customDropdown';

const plc =
  'https://images.ctfassets.net/3s5io6mnxfqz/5GlOYuzg0nApcehTPlbJMy/140abddf0f3f93fa16568f4d035cd5e6/AdobeStock_175165460.jpeg?fm=jpg&w=900&fl=progressive';

export default function AvailableGoods() {
  const history = useHistory();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  const phoneSize = useMediaQuery('(max-width: 767px)');
  const tabletSize = useMediaQuery(
    json2mq({
      minWidth: 768,
      maxWidth: 1023,
    })
  );
  const classes = useStyles({ phone: phoneSize, tablet: tabletSize });
  const [parentCategory, setParentCategory] = useState();
  const [page, setPage] = useState(1);
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

  const [getChildren, { data: childCategories, loading: childLoading }] = useLazyQuery(
    CHILD_MARKETEER_GOODS,
    {
      onCompleted(data) {
        console.log(data);
      },
      onError(e) {
        console.log(e);
      },
    }
  );

  const { data: parentCategories, loading: parentLoading } = useQuery(
    GET_ACTIVE_PARENT_GOODS,
    {
      fetchPolicy: 'cache-and-network',
      variables: { userId: id },
      onCompleted(data) {
        console.log(data);
        getChildren({
          variables: {
            active: true,
            marketeerId: id,
            parentId: data?.getActiveParentGoods[0]?._id,
          },
        });
      },
      onError(e) {
        console.log(e);
      },
    }
  );

  const handleCategoryChange = useCallback(
    (parentId) => {
      localStorage.setItem('marketGoodsCategory', id);
      setParentCategory(parentId);
      getChildren({
        variables: {
          active: true,
          marketeerId: id,
          parentId: parentId,
        },
      });
    },
    [setParentCategory, getChildren, id]
  );

  const handlePagination = (page) => {
    let p = page ? parseInt(page) : 1;
    setPage(p);
    getChildren({
      variables: {
        active: true,
        parentId: parentCategory,
        page: p,
      },
    });
  };

  useEffect(() => {
    let localId = localStorage.getItem('marketGoodsCategory');
    if (localId !== null && localId.length > 0) {
      handleCategoryChange(localId);
    } else if (
      parentLoading === false &&
      parentCategories?.getActiveParentGoods?.length > 0
    )
      setParentCategory(parentCategories?.getActiveParentGoods[0]?._id);
  }, [parentLoading, parentCategories, handleCategoryChange]);

  return (
    <>
      <Appbar phone={phoneSize} tablet={tabletSize} />
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
      {/* Body */}
      <Container className={classes.body}>
        <PageAbout
          title={'Бараа'}
          desc={`Манай дэлгүүрийн олон нэр төрлийн мах махан бүтээгдэхүүнийг сонирхож, 
            хүссэн бараагаа сонгоод гэртээ хүргүүлэн аваарай. Сонгосон барааныхаа 
            дээр дарж ороод дэлгэрэнгүй мэдээлэлтэй нь танилцана уу.`}
          marginBottom='0'
          marginLeft={phoneSize ? 20 : 30}
          descWidth={phoneSize ? '250px' : '600px'}
        />
        <Container maxWidth={false} className={classes.goodsListContainer}>
          {/* Parent category list */}
          {!phoneSize ? (
            <Container maxWidth={false} disableGutters className={classes.parentList}>
              <List component='nav' aria-label='secondary mailbox folders'>
                {parentLoading ? (
                  <div className={classes.parentLoading}>
                    <CircularProgress />
                  </div>
                ) : (
                  parentCategories?.getActiveParentGoods?.length > 0 &&
                  parentCategories?.getActiveParentGoods.map((item, index) => (
                    <div key={'category' + index}>
                      <ListItem onClick={() => handleCategoryChange(item?._id)} button>
                        <ListItemText
                          className={
                            parentCategory === item?._id
                              ? classes.listTextActive
                              : classes.listText
                          }
                          primary={item?.name}
                        />
                      </ListItem>
                      <Divider />
                    </div>
                  ))
                )}
              </List>
            </Container>
          ) : (
            <div style={{ marginBottom: 30 }}>
              {parentCategories?.getActiveParents?.length > 0 && (
                <CustomDropdown
                  onChange={(e) => handleCategoryChange(e?._id)}
                  options={parentCategories?.getActiveParents}
                  notOnRender={true}
                />
              )}
            </div>
          )}
          {/* Child category list */}
          <div className={classes.childrenGoodsContainer}>
            <Container maxWidth={false} className={classes.cardContainer}>
              {childLoading ? (
                <div className={classes.childLoading}>
                  <CircularProgress />
                </div>
              ) : (
                childCategories?.getActiveChildGoods?.marketeerGoods?.length > 0 &&
                childCategories?.getActiveChildGoods?.marketeerGoods?.map(
                  (item, index) => (
                    <CardItem
                      onSelect={() =>
                        history.push(`/user/market-goods-detail?id=${item?._id}`)
                      }
                      key={'child category' + index}
                      id={item?._id}
                      parentId={item?.parentId}
                      title={item?.name}
                      img={item?.categoryImg?.path}
                      description={item?.description}
                      isUnit={item?.isUnit}
                      price={item?.marketeerPrice}
                      soldBy={item?.soldBy}
                    />
                  )
                )
              )}
            </Container>
            {!childLoading && childCategories?.childCategories?.categories?.length > 0 && (
              <div className={classes.paginationDiv}>
                <Pagination
                  page={page}
                  count={childCategories?.childCategories?.pageCount}
                  color='primary'
                  onChange={(e, v) => handlePagination(v)}
                />
              </div>
            )}
          </div>
        </Container>
      </Container>
      <Footer phone={phoneSize} tablet={tabletSize} />
    </>
  );
}

const CardItem = (props) => {
  const classes = useStyles(props);
  return (
    <Card className={classes.cardRoot}>
      <CardActionArea onClick={() => props?.onSelect(props.id, props.parentId)}>
        <CardMedia
          className={classes.media}
          image={props?.img ? props.img : plc}
          title='Many types of meat'
        />
        <CardContent style={{ height: 160 }}>
          <Typography gutterBottom className={classes.cardTitle}>
            {stringEllipser(props?.title, 18)}
          </Typography>
          <Typography className={classes.cardDesc}>
            {stringEllipser(props?.description, 110)}
          </Typography>
        </CardContent>
        <Divider variant='middle' />
        <CardContent>
          <div className={classes.cardPriceContainer}>
            <Typography className={classes.cardPrice}>{props?.price + ' ₮'}</Typography>
            <Typography className={classes.cardUnit}>
              {props?.isUnit ? ' /ш' : ' /кг'}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const useStyles = makeStyles({
  body: {
    marginBottom: 50,
    maxWidth: 1440,
  },
  listTextActive: {
    fontWeight: 'bolder',
    color: colors.lightPurple,
  },
  listText: {
    color: 'black',
  },
  childrenGoodsContainer: {
    width: '100%',
    marginTop: 20,
  },
  paginationDiv: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: 30,
  },
  parentLoading: {
    paddingTop: 50,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  childLoading: {
    marginTop: 100,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  goodsListContainer: {
    display: 'flex',
    flexDirection: (props) => (props?.phone ? 'column' : 'row'),
    width: '100%',
    marginTop: 30,
    marginBottom: 50,
  },
  parentList: {
    width: '20%',
  },
  cardContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: (props) => (props?.phone ? 'center' : 'flex-start'),
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  toggleButton: {
    backgroundColor: 'rgba(106, 103, 211, 0.25)',
    marginBottom: 10,
  },
  colCardTitle: {
    fontFamily: 'SF Pro Display',
    fontSize: 27,
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
  },
  titleToggleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '1px solid lightgray',
    marginBottom: 30,
    marginTop: 30,
  },
  cardRoot: {
    maxWidth: 210,
    maxHeight: 400,
    width: '100%',
    height: 400,
    marginBottom: 20,
    textAlign: 'left',
    borderRadius: 17,
    border: '1px solid lightgray',
    marginLeft: 20,
    marginRight: 20,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'SF Pro Display',
  },
  cardDesc: {
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'SF Pro Display',
    color: 'gray',
    paddingRight: 32,
    margin: 0,
    height: 100,
  },
  cardSold: {
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'SF Pro Display',
    color: 'gray',
    margin: 0,
    // paddingRight: 32,
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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10%',
    marginLeft: '10%',
    outline: 'none',
    border: 'none',
  },
  qrScannerContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    borderRadius: 21,
    padding: 0,
    backgroundColor: 'white',
    maxWidth: 450,
    width: '100%',
    maxHeight: '100%',
    outline: 'none',
    border: 'none',
    overflow: 'hidden',
  },
  orderRegisterModalBody: {
    height: '100%',
    textAlign: 'left',
    padding: '30px',
    '& .MuiFormLabel-root': {
      fontSize: 14,
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 11,
      fontSize: 14,
      backgroundColor: colors.lightGray,
    },
  },
  addOrderUsername: {
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 17,
    marginTop: 25,
  },
  kilCounterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  modalButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: '100%',
    position: 'sticky',
    bottom: 0,
    backgroundColor: 'white',
    boxShadow: '0px -10px 5px #ededed',
    paddingTop: 20,
    paddingBottom: 20,
  },
  cancelButton: {
    backgroundColor: 'white',
    color: 'gray',
    borderRadius: 11,
    paddingRight: 20,
    paddingLeft: 20,
    textTransform: 'none',
    textDecoration: 'none',
    fontSize: 14,
    font: 'SF Pro Display',
    fontWeight: 'normal',
    '&:hover': {
      backgroundColor: 'blue',
      color: 'white',
    },
  },
  submitButton: {
    backgroundColor: colors.lightPurple,
    marginRight: 20,
    marginLeft: 10,
    color: 'white',
    borderRadius: 11,
    paddingRight: 20,
    paddingLeft: 20,
    textTransform: 'none',
    textDecoration: 'none',
    fontSize: 14,
    font: 'SF Pro Display',
    fontWeight: 'normal',
    '&:hover': {
      backgroundColor: 'blue',
    },
  },
  shopMeatText: {
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    paddingLeft: 20,
    color: 'black',
    opacity: '0.5',
  },
  possibleKilo: {
    fontStyle: 'italic',
    textAlign: 'left',
    color: 'black',
    opacity: '0.5',
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: 'SF Pro Display',
    fontSize: 14,
  },
});
