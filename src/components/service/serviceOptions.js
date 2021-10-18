import React, { useContext, useEffect, useState } from 'react';
import { Container, Typography, Divider, Button } from '@mui/material';
import colors from '../../constants/colors';
import { makeStyles } from '@mui/styles';
import TheContext from '../../context/context';
import { GET_SERVICE_OPTIONS_LIST } from '../../graphql/gql/serviceOptions/serviceOptions';
import { UPDATE_USER_SERVICE_INFO } from '../../graphql/gql/userServiceInfo/userSeviceInfo';
import CircularProgressLoader from '../loader/circularProgress';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router';

export default function ServiceOptions(props) {
  const ContextHook = useContext(TheContext);
  const contextText = ContextHook.contextValue.contextText;
  const account = ContextHook.account;
  const classes = useStyles(props);
  const history = useHistory();

  const [serviceData, setServiceData] = useState([]);

  const {
    data: optionData,
    loading,
    refetch,
  } = useQuery(GET_SERVICE_OPTIONS_LIST, {
    fetchPolicy: 'cache-and-network',
    onCompleted(data) {
      console.log(data);
    },
    onError(e) {
      console.log(e);
    },
  });

  const [updateUserService, { loading: updateServiceLoading }] = useMutation(
    UPDATE_USER_SERVICE_INFO,
    {
      onCompleted(data) {
        console.log(data);
        refetch();
      },
      onError(e) {
        console.log(e.message);
      },
    }
  );

  const handleUpdateService = (serviceId) => {
    console.log(serviceId);
    updateUserService({
      variables: {
        serviceOption: serviceId,
        userId: account?._id,
      },
    }).then(() => {
      setTimeout(() => {
        history.push(`/user/payment-service?id=${serviceId}`);
      }, 100);
    });
  };

  useEffect(() => {
    if (loading === false) {
      setServiceData(optionData);
    }
  }, [loading, optionData]);

  return (
    <Container disableGutters className={classes.root}>
      <Container>
        <Typography className={classes.title}>{contextText.service.title}</Typography>
        <Typography className={classes.description}>
          Та доорх үйлчилгээний багцуудаас өөрт нийцүүлэн сонгоод бүтэн жилийн турш сар
          бүр оноосон хэмжээний бүтээгдэхүүнийг 15%-ийн хөнгөлөлттэй үнээр авах эрх
          эдлээрэй.
        </Typography>
      </Container>
      <Container className={classes.optionsContainer}>
        {updateServiceLoading || loading ? (
          <CircularProgressLoader />
        ) : (
          serviceData &&
          serviceData?.getListOfServiceOptions?.map((item, index) => (
            <ServiceOptionItem
              key={'service option item' + index}
              title={item?.title}
              description={item?.description}
              listTitle={item?.listTitle}
              includedInService={item?.includedInService}
              price={item?.price}
              time={item?.time}
              button={contextText?.service?.choose}
              chosen={index === 0}
              onPress={() => (index !== 0 ? handleUpdateService(item?._id) : null)}
            />
          ))
        )}
        <div style={{ height: 50, width: '100%', minWidth: 200 }} />
      </Container>
    </Container>
  );
}

const ServiceOptionItem = (props) => {
  const classes = useStyles(props);
  return (
    <Container className={classes.optionsItem}>
      {props.chosen === true ? (
        <div className={classes.iconOuterDiv}>
          <div className={classes.iconDiv}>
            <CheckRoundedIcon className={classes.icon} htmlColor={'white'} />
          </div>
        </div>
      ) : null}
      <Typography className={classes.itemTitle}>{props.title}</Typography>
      <Typography className={classes.itemDescription}>{props.description}</Typography>
      <Divider className={classes.divider} />
      <Typography className={classes.whatIncluded}>{props.listTitle}</Typography>
      <ul className={classes.ul}>
        {props.includedInService.map((item, index) => (
          <li className={classes.li} key={'service option item' + index}>
            {item}
          </li>
        ))}
      </ul>
      <Container disableGutters className={classes.priceRow}>
        <Typography className={classes.itemTitle} style={{ paddingRight: 7 }}>
          {props.price === 1000000
            ? '1 Сая'
            : props.price === 500000
            ? '500 Мянга'
            : 'Үнэгүй'}
        </Typography>
        <Typography className={classes.time}>{' / ' + props.time}</Typography>
      </Container>
      <Button className={classes.button} onClick={() => props.onPress()}>
        {props.button}
      </Button>
    </Container>
  );
};

const useStyles = makeStyles({
  root: {
    marginBottom: 50,
  },
  iconOuterDiv: {
    height: 30,
    width: 33,
    backgroundColor: 'white',
    position: 'absolute',
    paddingLeft: 6,
    top: -15,
    right: 30,
  },
  iconDiv: {
    backgroundColor: colors.orange,
    borderRadius: '50%',
    height: 27,
    width: 27,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  icon: {
    height: '18px',
    width: '20px',
  },
  title: {
    marginTop: 60,
    fontSize: 27,
    fontWeight: 'bold',
    color: colors.black,
    fontFamily: 'SF Pro Display',
  },
  description: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: 'normal',
    color: colors.black70,
    fontFamily: 'SF Pro Display',
    maxWidth: 560,
    margin: 'auto',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 1100,
    paddingTop: 30,
  },
  optionsItem: {
    width: 300,
    borderRadius: 21,
    border: (props) =>
      props.chosen ? `3px solid ${colors.lightPurple}` : '2px solid lightgray',
    paddingTop: 35,
    paddingBottom: 30,
    marginBottom: 30,
    textAlign: 'left',
    position: 'relative',
    '&:hover': {
      border: `2px solid ${colors.lightPurple}`,
    },
  },
  ul: {
    minHeight: 120,
    paddingLeft: 0,
    marginLeft: 20,
    color: colors.gray,
  },
  li: {
    paddingBottom: 20,
  },
  divider: {
    borderTop: '1px dashed #DADADB',
    backgroundColor: 'transparent',
    marginTop: 15,
    marginBottom: 15,
  },
  whatIncluded: {
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'SF Pro Display',
    textAlign: 'left',
    color: colors.black,
  },
  itemTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    fontFamily: 'SF Pro Display',
    textAlign: 'left',
    color: colors.black,
  },
  itemDescription: {
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'SF Pro Display',
    textAlign: 'left',
    color: colors.gray,
  },
  priceRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 15,
    fontWeight: 'normal',
    fontFamily: 'SF Pro Display',
    textAlign: 'left',
    color: colors.gray,
  },
  button: {
    width: '100%',
    backgroundColor: (props) => (props.chosen ? colors.gray30 : colors.lightPurple),
    color: (props) => (props.chosen ? 'gray' : 'white'),
    marginTop: 25,
    borderRadius: 11,
    height: 38,
    '&:hover': {
      color: 'gray',
      backgroundColor: colors.gray30,
    },
  },
});
