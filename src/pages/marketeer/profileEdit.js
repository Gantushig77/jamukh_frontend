import { useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import Appbar from '../../components/appbar/appbar';
import { CSS_HELPER } from '../../constants/helper';
import UserCard from '../../components/cards/userCard';
import PageAbout from '../../components/adminComponents/pageAbout';
import InputCore from '../../components/core/inputCore';
import { useQuery } from '@apollo/client';
import { ACCOUNT } from '../../graphql/gql/user/user';
// eslint-disable-next-line
import { PLACE_HOLDER } from '../../constants/placeholder';
import DropdownCore from '../../components/core/dropdownCore';
import json2mq from 'json2mq';

export default function ProfileEdit() {
  const phoneSize = useMediaQuery('(max-width: 767px)');
  const tabletSize = useMediaQuery(
    json2mq({
      minWidth: 768,
      maxWidth: 1023,
    })
  );
  // eslint-disable-next-line
  const [name, setName] = useState();
  // eslint-disable-next-line
  const [lastname, setLastname] = useState();
  // eslint-disable-next-line
  const [email, setEmail] = useState();
  // eslint-disable-next-line
  const [username, setUsername] = useState();
  const classes = useStyles();
  const { data: me } = useQuery(ACCOUNT);
  useEffect(() => {
    if (me?.me) {
      setName(me?.me.firstName);
      setLastname(me?.me.lastName);
      setUsername(me?.me.username);
    }
  }, [me]);
  return (
    <div className={classes.root}>
      <Appbar phone={phoneSize} tablet={tabletSize} />
      <div className={classes.main}>
        <div className={classes.userCard}>
          <UserCard />
        </div>
        <div className={classes.container}>
          <PageAbout
            title='Мэдээлэл засах'
            marginTop={0}
            marginLeft={0}
            marginBottom={46}
            descWidth={'100%'}
            descMaxWidth={'505px'}
          />
          <div className={classes.inputContainer}>
            <h1 className={classes.inputContainerTitle}>Дэлгүүрийн Нэр</h1>
            <InputCore placeholder='Дэлгүүрийн Нэр' />
          </div>
          <div className={classes.inputContainer}>
            <h1 className={classes.inputContainerTitle}>Нэвтрэх нэр</h1>
            <InputCore placeholder='Нэвтрэх Нэр' />
          </div>
          <div className={classes.inputContainer}>
            <h1 className={classes.inputContainerTitle}>И-Мэйл</h1>
            <InputCore placeholder='И-Мэйл' />
          </div>
          <div className={classes.inputContainer}>
            <h1 className={classes.inputContainerTitle}>Холбогдох дугаар</h1>
            <InputCore placeholder='Холбогдох дугаар' />
          </div>
          <h1>Энд Тухай ба Хүргэлтийн хэсэгийг оруулна!!!</h1>
          <PageAbout
            title='Нууцлал'
            marginTop={0}
            marginLeft={0}
            marginBottom={46}
            descWidth={'100%'}
            descMaxWidth={'505px'}
          />

          <div className={classes.inputContainer}>
            <h1 className={classes.inputContainerTitle}>Нууц үг</h1>
            <InputCore placeholder='Нууц Үг' type='password' />
          </div>
          {/* <div className={classes.inputContainer}>
            <h1 className={classes.inputContainerTitle}>Нууц Үг Батлах</h1>
            <InputCore placeholder="Нууц Үг Батлах" type="password" />
          </div> */}
          <PageAbout
            title='Хаяг'
            marginTop={0}
            marginLeft={0}
            marginBottom={36}
            descWidth={'100%'}
            descMaxWidth={'505px'}
          />
          <div className={classes.inputContainer}>
            <h1 className={classes.inputContainerTitle}>Хот / Аймаг</h1>
            <DropdownCore />
          </div>
          <div className={classes.inputContainer}>
            <h1 className={classes.inputContainerTitle}>Дүүрэг / Сум</h1>
            <DropdownCore />
          </div>
          <div className={classes.inputContainer}>
            <h1 className={classes.inputContainerTitle}>Хороо / Баг</h1>
            <DropdownCore />
          </div>
          <div className={classes.buttons}>
            <h1 className={classes.button}>Хадгалах</h1>
            <h1 className={classes.buttonLight}>Болих</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: '0 auto',
    marginTop: 68,
    maxWidth: 1092,
    width: '90%',
    gap: 20,
  },
  userCard: {},
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: 772,
    maxWidth: '100%',
  },
  inputContainer: {
    width: 368,
    marginBottom: 36,
    maxWidth: '100%',
  },
  inputContainerTitle: {
    ...CSS_HELPER.initializeFont,
    marginBottom: 17,
  },
  userContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    height: 64,
    marginBottom: 67,
  },
  avatarImage: {
    width: 64,
    height: 64,
    borderRadius: 11,
    marginRight: 21,
    objectFit: 'cover',
  },
  userContainerTexts: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '7px 0',
  },

  userContainerTitle: {
    ...CSS_HELPER.initializeFont,
    fontSize: 21,
    fontWeight: 700,
  },
  userContainerText: {
    ...CSS_HELPER.initializeFont,
    color: 'rgba(0,0,0,0.5)',
    fontWeight: 600,
  },
  buttons: {
    display: 'flex',
    marginBottom: 47,
    width: '100%',
  },

  button: {
    ...CSS_HELPER.initializeFont,
    padding: '11px 12px',
    color: 'white',
    backgroundColor: '#6A67D3',
    fontWeight: 'normal',
    borderRadius: 7,
    marginRight: 7,
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': {
      boxShadow: '0 0 5px rgba(0,0,0,0.3)',
    },
  },
  buttonLight: {
    ...CSS_HELPER.initializeFont,
    padding: '11px 12px',
    color: 'rgba(0,0,0,0.5)',
    // backgroundColor: "",
    fontWeight: 'normal',
    borderRadius: 7,
    marginRight: 7,
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 0 5px rgba(0,0,0,0)',
    '&:hover': {
      boxShadow: '0 0 5px rgba(0,0,0,0.3)',
    },
  },
});
