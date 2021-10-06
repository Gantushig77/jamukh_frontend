import { useMutation, useQuery } from '@apollo/client';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import AddButton from '../../components/adminComponents/addButton';
import PageAbout from '../../components/adminComponents/pageAbout';
import ProfileCard from '../../components/adminComponents/profileCard';
import Appbar from '../../components/appbar/appbar';
import ToastifyBody, {
  toastError,
  toastSuccess,
  toastWarning,
} from '../../components/core/toastCore';
import InputBasedModal from '../../components/inputBasedModal/inputBasedModal';
import {
  ADMIN_LIST,
  CREATE_ADMIN,
  DELETE_ADMIN_USER,
  UPDATE_ADMIN_USER,
} from '../../graphql/gql/admin/admin';

export default function AdminList() {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const { data, refetch } = useQuery(ADMIN_LIST, { variables: { role: 'admin' } });
  const [createAdminMutation] = useMutation(CREATE_ADMIN, {
    onCompleted() {
      refetch();
      setModal(false);
    },
    onError(e) {
      toastError(
        e.graphQLErrors?.[0]?.message ?? 'Энэ үйлдэлийг хийхэд эрх хүрэлцэхгүй байна'
      );
    },
  });
  const [deleteAdminUser] = useMutation(DELETE_ADMIN_USER, {
    onCompleted() {
      refetch();
      setModal(false);
      toastSuccess('Амжилттай устгагдлаа');
    },
    onError(e) {
      toastError(
        e.graphQLErrors?.[0]?.message ?? 'Энэ үйлдэлийг хийхэд эрх хүрэлцэхгүй байна'
      );
    },
  });
  const [updateAdminUser] = useMutation(UPDATE_ADMIN_USER, {
    onCompleted() {
      refetch();
      setModal(false);
      toastSuccess('Амжилттай засагдлаа');
    },
    onError(e) {
      toastError(
        e.graphQLErrors?.[0]?.message ?? 'Энэ үйлдэлийг хийхэд эрх хүрэлцэхгүй байна'
      );
    },
  });

  return (
    <>
      <ToastifyBody />
      <Appbar />
      <div className={classes.root}>
        <div className={classes.about}>
          <PageAbout
            title='Админууд'
            desc={`Админ эрхтэй систем ашиглагчдын бүртгэлийг энд харуулж байна. Админ үүсгэх гэсэн товч дээр дарж шинээр бүртгэл үүсгэх боломжтой.`}
          />
          <div className={classes.button}>
            <AddButton
              title='+ Админ нэмэх'
              onClick={() => {
                setModal(true);
              }}
              color='#540014'
            />
          </div>
        </div>
        {/* <OptionsCore marginTop="20px" /> */}
        <div className={classes.container}>
          {data?.adminUsers.map((item, index) => (
            <ProfileCard
              key={'profile card' + index}
              fullName={`${item.lastName?.slice(0, 1)}.${item.firstName}`}
              username={`@${item.username}`}
              options={[
                {
                  title: 'Засах',
                  onClick: () => {
                    setModal(item);
                  },
                },
                {
                  title: 'Устгах',
                  onClick: () => {
                    deleteAdminUser({ variables: { _id: item._id } });
                  },
                },
              ]}
            />
          ))}
        </div>
        {modal && (
          <InputBasedModal
            {...(modal === true
              ? {
                  title: 'Оператор нэмэх',
                  desc: 'Мэдээллээ оруулна уу',
                  inputs: [
                    {
                      title: 'Овог',
                      placeHolder: 'Овог...',
                    },
                    {
                      title: 'Нэр',
                      placeHolder: 'Нэр...',
                    },
                    {
                      title: 'Нэвтрэх Нэр',
                      placeHolder: 'Нэвтрэх Нэр...',
                    },
                    {
                      placeHolder: '************',
                      title: 'Нууц Үг',
                      inputType: 'password',
                    },
                    {
                      placeHolder: '************',
                      title: 'Нууц Үг Батлах',
                      inputType: 'password',
                    },
                  ],
                  onSubmit: createAdmin,
                }
              : {
                  title: 'Оператор Засах',
                  desc: 'Мэдээллээ оруулна уу',
                  inputs: [
                    {
                      title: 'Овог',
                      placeHolder: 'Овог...',
                      value: modal.lastName,
                    },
                    {
                      title: 'Нэр',
                      placeHolder: 'Нэр...',
                      value: modal.firstName,
                    },
                    {
                      title: 'Нэвтрэх Нэр',
                      placeHolder: 'Нэвтрэх Нэр...',
                      value: modal.username,
                    },
                    {
                      placeHolder: '************',
                      title: 'Нууц Үг',
                      inputType: 'password',
                    },
                    {
                      placeHolder: '************',
                      title: 'Нууц Үг Батлах',
                      inputType: 'password',
                    },
                  ],
                  onSubmit: updateAdmin,
                })}
            onClose={() => setModal(false)}
          />
        )}
      </div>
    </>
  );
  function createAdmin(data) {
    console.log(data);
    if (
      data[0].value &&
      data[1].value &&
      data[2].value.length &&
      data[4].value.length > 7 &&
      data[3].value.length > 7 &&
      data[3].value.length === data[4].value.length
    )
      createAdminMutation({
        variables: {
          lastName: data[0].value,
          firstName: data[1].value,
          username: data[2].value,
          password: data[3].value,
          role: 'admin',
        },
      });
    else if (data[3].value.length !== data[4].value.length) {
      toastWarning('Нууц Үг зөрж байна.');
    } else if (data[4].value.length < 8 || data[3].value.length < 8) {
      toastWarning('Нууц Үг багадаа 8 тэмдэгтээс бүтнэ');
    }
  }
  function updateAdmin(data) {
    console.log(data);
    if (
      (data[4].value.length || data[3].value.length) &&
      data[3].value.length !== data[4].value.length
    ) {
      toastWarning('Нууц Үг зөрж байна.');
    } else if (
      (data[4].value.length || data[3].value.length) &&
      (data[4].value.length < 8 || data[3].value.length < 8)
    ) {
      toastWarning('Нууц Үг багадаа 8 тэмдэгтээс бүтнэ');
    } else if (data[0].value && data[1].value && data[2].value.length)
      updateAdminUser({
        variables: {
          ...{
            _id: modal._id,
            lastName: data[0].value ?? undefined,
            firstName: data[1].value ?? undefined,
            username: data[2].value ?? undefined,
            password: data[3].value ?? undefined,
          },
        },
      });
    else toastError('Аль нэг талбар дутуу байна');
  }
}

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '1080px',
    margin: '0 5vw',
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
    flexWrap: 'wrap',
  },
}));
