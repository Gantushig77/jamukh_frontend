import React from 'react';
import { makeStyles } from '@mui/styles';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import colors from '../../constants/colors';

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10%',
    marginLeft: '10%',
  },
  paper: {
    maxHeight: '70%',
    backgroundColor: 'white',
    border: 'none',
    boxShadow:
      '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
    padding: 20,
    borderRadius: 10,
    overflow: 'auto',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  agreeButton: {
    backgroundColor: colors.lightPurple,
    color: 'white',
    marginRight: '30px',
    '&:hover': {
      color: 'black',
    },
  },
  cancelButton: {
    backgroundColor: colors.gray,
    color: 'white',
    '&:hover': {
      color: 'black',
    },
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();

  const agree = () => {
    props.agreeClick();
    props.handleClose();
  };

  const cancel = () => {
    props.cancelClick();
    props.handleClose();
  };

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <h2 id='transition-modal-title'>Үйлчилгээний нөхцөл</h2>
            <Typography>Шинэчлэгдсэн огноо: 2021.07.15</Typography>
            <Typography>Нэг. Ерөнхий зүйл</Typography>
            <ul>
              <li>
                Энэхүү үйлчилгээний нөхцөл нь цахим орчинд бараа бүтээгдэхүүн үйлчилгээг
                худалдах, худалдан авахтай холбоотой үүсч буй харилцааг зохицуулна.
              </li>
              <li>
                Энэхүү үйлчилгээний нөхцөлд хэрэглэсэн дараах нэр томьёог дор дурдсан
                утгаар ойлгоно. Үүнд:
              </li>
              <ul>
                <li>
                  “Цахим худалдааны систем” гэж Албан ёсны гэрээт борлуулагчийн бараа
                  бүтээгдэхүүн, үйлчилгээг Хэрэглэгчдэд санал болгох, худалдан авалтыг
                  цахимаар хийх үйлчилгээг үзүүлж буй албан цахим хуудас{' '}
                  <a href={'http://khureemarket.mn/'}>http://khureemarket.mn/</a>-г
                </li>
                <li>
                  “Хэрэглэгч” гэж энэхүү Үйлчилгээний нөхцлийг хүлээн зөвшөөрч, “ХҮРЭЭ
                  МАРКЕТ”-г хэрэглэж буй иргэний эрх зүй бүрэн чадамжтай иргэн
                </li>
                <li>
                  “Албан ёсны гэрээт борлуулагч” - Бараа бүтээгдэхүүн борлуулах болон
                  үйлчилгээ үзүүлэх албан ёсны эрхтэй хуулийн этгээд, хувь хүнийг
                </li>
              </ul>
              <li>
                Хэрэглэгч нь “ХҮРЭЭ МАРКЕТ”-д нэвтэрсэн эсхүл бүртгүүлсэн үеэс эхлэн
                Үйлчилгээний нөхцлийг мөрдөх бөгөөд тухайн үеэс уг нөхцлийг хүлээн
                зөвшөөрсөнд тооцно.
              </li>
            </ul>
            <div className={classes.buttonContainer}>
              <Button className={classes.agreeButton} onClick={() => agree()}>
                Зөвшөөрөх
              </Button>
              <Button className={classes.cancelButton} onClick={() => cancel()}>
                Цуцлах
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
