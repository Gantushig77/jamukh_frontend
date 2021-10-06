import { useMutation, useQuery } from '@apollo/client';
import { Typography, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import AddButton from '../../components/adminComponents/addButton';
import PageAbout from '../../components/adminComponents/pageAbout';
import Appbar from '../../components/appbar/appbar';
import ImgCore from '../../components/core/imgCore';
import OptionsCore from '../../components/core/optionsCore';
import TableCore from '../../components/core/tableCore';
import { CSS_HELPER } from '../../constants/helper';
import {
  CHANGE_USER_SERVICE,
  UPDATE_PAY_STATUS,
  USERS,
} from '../../graphql/gql/user/user';
import closeIcon from '../../assets/icons/close-icon.svg';
import confirm from '../../assets/icons/confirm.svg';
import { PLACE_HOLDER } from '../../constants/placeholder';
import { GET_SERVICE_OPTIONS_LIST } from '../../graphql/gql/serviceOptions/serviceOptions';
import ArrowRight from '../../assets/icons/arrowRight.svg';
import InputBasedModal from '../../components/inputBasedModal/inputBasedModal';
import { toastError } from '../../components/core/toastCore';
import ToastifyBody from '../../components/core/toastCore';

// Users iig harah gishuunchleliig batlah
export default function UserList() {
  const classes = useStyles();
  const [selectedUser, setSelectedUser] = useState();

  const [option, setOption] = useState('');
  const { data, loading } = useQuery(USERS, {
    fetchPolicy: 'cache-and-network',
    variables:
      option === 1
        ? { serviceType: 'gold' }
        : option === 2
        ? { serviceType: 'silver' }
        : null,
    onCompleted(data) {
      console.log(data);
    },
    onError(e) {
      console.log(e);
    },
  });

  const [changeUserService] = useMutation(CHANGE_USER_SERVICE, {
    onError(err) {
      toastError(err.graphQLErrors?.[0]?.message ?? err.message);
    },
  });

  const [changeStatus] = useMutation(UPDATE_PAY_STATUS);

  const { data: serviceData } = useQuery(GET_SERVICE_OPTIONS_LIST, {
    fetchPolicy: 'cache-and-network',
    onCompleted(data) {
      console.log(data);
    },
    onError(e) {
      console.log(e);
    },
  });
  const serviceTypeToMgl = {
    regular: 'Энгийн багц',
    silver: 'Мөнгөн багц',
    gold: 'Алтан багц',
  };
  const serviceTypeToEng = {
    'Энгийн багц': 'regular',
    'Мөнгөн багц': 'silver',
    'Алтан багц': 'gold',
  };

  return (
    <div className={classes.rootContainer}>
      <Appbar />
      <ToastifyBody />
      {selectedUser && (
        <InputBasedModal
          height={'370px'}
          onClose={() => {
            setSelectedUser();
          }}
          title='Хэрэглэгчийн багцийн мэдээлэл засах'
          desc={
            'Хэрэглэгчийн багцын мэдээлэл солих үед өмнө байсан бүх нөөцлөгдсөн мах тиглэгдэн багцийн сарын хэрэглээгээр солигдохыг анхаарна уу.'
          }
          inputs={[
            {
              title: 'Багцын төрөл',
              value: serviceTypeToMgl[selectedUser.serviceType],
              type: 'dropdown',
              options: ['Энгийн багц', 'Алтан багц', 'Мөнгөн багц'],
            },
          ]}
          onSubmit={(e) => {
            changeUserService({
              variables: {
                _id: selectedUser._id,
                serviceType: serviceTypeToEng[e[0].value],
              },
            });
            console.log(e);
            console.log(selectedUser._id);
          }}
        />
      )}
      <div className={classes.root}>
        <div className={classes.about}>
          <PageAbout
            title='Хэрэглэгчид'
            desc={`Системд бүртгүүлсэн хэрэглэгчдийн бүртгэлийн мэдээлэл болон үйлчилгээ авсан онцгой хэрэглэгчдийн мэдээллийг жагсаалтаар харуулж байна.`}
          />
        </div>
        <OptionsCore
          onChange={setOption}
          options={[
            'Нийт',
            ...(serviceData
              ? serviceData.getListOfServiceOptions
                  ?.filter((item, index) => index)
                  .map((item) => item.title)
              : '...'),
          ]}
          marginTop='36px'
        />
        <TableCore
          items={[
            { item: 'ID', width: '102px' },
            { item: 'Хэрэглэгч', width: '217px' },
            { item: 'Хот / аймаг', width: '128px' },
            { item: 'Дүүрэг / Сум', width: '139px' },
            { item: 'Хороо / Баг', width: '120px' },
            { item: 'Төлөв', width: '140px' },
            { item: 'Email', width: '180px' },
            { item: 'Дугаар', width: '94px' },
          ]}
          height='50px'
          backgroundColor='rgba(0,0,0,0.03)'
          marginTop='36px'
          marginBottom='36px'
          marginRight='0'
          stopHover
        />
        <div className={classes.container}>
          {option ? (
            loading ? (
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
              </div>
            ) : data?.users.length < 1 ? (
              <Typography>Илэрц олдсонгүй</Typography>
            ) : (
              data?.users.map((item) => (
                <UserTableSpecial
                  id={item._id.slice(10, 18)}
                  key={item._id}
                  user={{
                    username: item.username,
                    name: `${item.lastName ?? '*'?.slice(0, 1)}.${
                      item.firstName ?? '*******'
                    }`,
                    image: item.avatar?._id,
                  }}
                  email={item.email.includes('@') ? item.email : 'Хоосон'}
                  phone={item.phone}
                  status={item.status === 'paid'}
                  onClickButton={() =>
                    changeStatus({
                      variables: {
                        _id: item._id,
                        status: item.status === 'paid' ? 'pending' : 'paid',
                      },
                    })
                  }
                  normal={item.serviceType}
                />
              ))
            )
          ) : (
            data?.users.map((item) => (
              <UserTableSpecial
                id={item._id.slice(10, 18)}
                key={item._id}
                user={{
                  username: item.username,
                  name: `${item.lastName ?? '*'?.slice(0, 1)}.${
                    item.firstName ?? '*******'
                  }`,
                  image: item.avatar?._id,
                }}
                phone={item.phone}
                stopHover={false}
                normal={item.serviceType}
                status={item.status === 'paid'}
                onClickButton={() =>
                  item.serviceType === 'regular'
                    ? setSelectedUser(item)
                    : changeStatus({
                        variables: {
                          _id: item._id,
                          status: item.status === 'paid' ? 'pending' : 'paid',
                        },
                      })
                }
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function UserTableSpecial({
  id = '*******',
  user = { name: 'Овог.Нэр', username: '[@username]', image: 'hi' },
  city = '**********',
  district = '****** ****',
  khoroo = '******',
  status = false,
  email = 'Хоосон',
  phone = '99******',
  stopHover,
  onClickButton,
  normal,
}) {
  const classes = useStyles();
  return (
    <TableCore
      items={[
        { item: '#' + id, width: '102px' },
        {
          item: (
            <div className={classes.user}>
              <ImgCore
                src={user.image ?? PLACE_HOLDER.user}
                className={classes.userImage}
              />
              <div className={classes.userDiv}>
                <h1 className={classes.userName}>{user.name}</h1>
                <h2 className={classes.userUserName}>@{user.username}</h2>
              </div>
            </div>
          ),
          width: '217px',
        },
        { item: city, width: '128px' },
        { item: district, width: '139px' },
        { item: khoroo, width: '120px' },
        {
          item: status ? (
            <AddButton
              title='Төлсөн'
              color='#6A67D3'
              padding='9px 14px'
              borderRadius='11px'
            />
          ) : (
            <AddButton
              title='Хүлээгдэж буй'
              color='#F95A48'
              padding='9px 14px'
              borderRadius='11px'
            />
          ),
          width: '140px',
        },
        { item: email, width: '180px' },
        { item: phone, width: '94px' },
      ]}
      buttonColor={normal === 'regular' ? '#1FBCD3' : status ? '#F95A48' : '#6A67D3'}
      onClickButton={onClickButton}
      imageSrc={normal === 'regular' ? ArrowRight : status ? closeIcon : confirm}
      stopHover={stopHover}
    />
  );
}

const useStyles = makeStyles(() => ({
  rootContainer: {
    minWidth: 'max-content',
  },
  root: {
    // maxWidth: "1080px",
    width: 'max-content',
    margin: '0 auto',
  },
  about: {
    display: 'flex',
    marginRight: '10px',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '800px',
  },
  addButton: {
    alignSelf: 'flex-end',
    maxHeight: 'max-content',
  },
  container: {
    marginTop: '46px',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },

  // user component
  user: {
    display: 'flex',
    height: '42px',
    // backgroundColor: "cadetblue",
  },
  userImage: {
    borderRadius: '11px',
    objectFit: 'cover',
    height: '42px',
    width: '42px',
    marginRight: '14px',
  },
  userDiv: {
    ...CSS_HELPER.initializeFont,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  userName: {
    ...CSS_HELPER.initializeFont,
    fontSize: '17px',
  },
  userUserName: {
    ...CSS_HELPER.initializeFont,
    color: 'rgba(0,0,0,0.5)',
    fontWeight: '500',
  },
}));
