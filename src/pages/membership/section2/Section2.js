import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Title from '../../../components/title/title';
import Background from '../../../assets/background/background.png';
import './Section.css';
import { getMembershipSend, getMembershipType } from '../../../api/membership';
import { Alert } from '@mui/lab';
import { Snackbar } from '@mui/material';

export default function Section2(props) {
  const classes = useStyles(props);
  const token = localStorage.getItem('jamukh_token');

  // States
  const [tab, setTab] = useState('Basic');
  const [membershipId, setMembershipId] = useState(5);
  const [memberIndex, setMemberIndex] = useState(0);
  const [membershipData, setMembershipData] = useState([]);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: 'Амжилттай илгээлээ',
    severity: 'success',
  });

  // Handlers
  const handleSnackOpen = ({ state, msg, type }) => {
    setSnackbarState({
      open: state,
      message: msg,
      severity: type,
    });
  };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarState({ ...snackbarState, open: false });
  };

  const requestCode = () => {
    console.log(membershipId, 'membershipId');
    if (membershipData?.length > 0) {
      if (membershipId !== membershipData[membershipData.length - 1]?.id) {
        getMembershipSend(membershipId)
          .then((res) => {
            handleSnackOpen({
              state: true,
              msg: res.data.msg,
              type: 'success',
            });
          })
          .catch((e) => {
            console.log(e.response.data.msg, 'e');
            handleSnackOpen({
              state: true,
              msg: e.response.data.msg,
              type: 'error',
            });
          });
      } else {
        handleSnackOpen({
          state: true,
          msg: 'Энгийн хэрэглэгчид хүсэлт илгээх боломжгүй.',
          type: 'error',
        });
      }
    }
  };

  // Fetch data
  useEffect(() => {
    if (token)
      getMembershipType()
        .then((res) => {
          if (res.data !== null) setMembershipData(res.data);
        })
        .catch((e) => {
          handleSnackOpen({
            state: true,
            msg:
              e.message === 'user.not.found'
                ? 'Хүсэлтэнд алдаа гарлаа'
                : 'Хүсэлтэнд алдаа гарлаа',
            type: 'error',
          });
        });
  }, [token]);

  useEffect(() => {
    console.log('membership data : ', membershipData);
  }, [membershipData]);

  useEffect(() => {
    console.log('props data : ', props);
    setTab(props?.membershipTypeStr);
    setMembershipId(props?.membershipId);
  }, [props]);

  return (
    <div className={classes.root}>
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
      <div className={classes.titleTop}>
        <Title name='Зэрэглэл' />
      </div>
      <Container className={classes.container}>
        <>
          <div className={classes.members}>
            <div className={classes.tabs}>
              {membershipData?.length > 0 &&
                membershipData.map((item, index) => (
                  <div
                    key={index}
                    className={tab === item?.type_name ? classes.tabActive : classes.tab}
                    onClick={() => {
                      setTab(item?.type_name);
                      setMembershipId(item?.id);
                      setMemberIndex(index);
                    }}
                  >
                    {item?.type_name}
                  </div>
                ))}
            </div>
            <div className={classes.subTitle}>
              <div>
                <p style={{ color: 'white' }}>
                  Таны зэрэглэл : <b>{props?.membershipTypeStr}</b>
                </p>
              </div>
              <div className={classes.counterMember}>
                <p style={{ color: '#C19D65', paddingRight: 10 }}>{tab}</p>
                зэрэглэлийн {membershipData[memberIndex]?.total_account || 0} гишүүд байна
              </div>
            </div>
            <div className={classes.membersContainer}>
              <div className={classes.description}>
                {membershipData[memberIndex]?.description}
              </div>
              <div className={classes.subDescription}>
                {membershipData[memberIndex]?.promo}
              </div>
              <div
                className={classes.reqButton}
                onClick={() => {
                  requestCode();
                }}
              >
                Хүсэлт илгээх
              </div>
            </div>
          </div>
        </>
        <div className={classes.request}>
          <div className={classes.rowNumber}>
            <div className={classes.number}>1</div>{' '}
            <div className={classes.numberDes}>
              “Жамух пропертиз”-н гишүүнчлэл нь дараах үндсэн 5 сонголттой байна:
              Platinium, Gold, Silver, Bronze ба Member. Сонирхогч хувь хүн, эсхүл
              байгууллага, нь Гишүүнчлэлийн төрлөөс өөрийн хэрэгцээ, сонирхолд тулгуурлан
              сонголтоо хийх эрхтэй ба хураамжийг Төлбөрийн нөхцөлийн дагуу барагдуулах
              үүрэгтэй.
            </div>
          </div>
          <div className={classes.rowNumber}>
            <div className={classes.number}>2</div>
            <div className={classes.numberDes}>
              Гишүүнчлэлийн хугацаа нийт 12 сар байх ба гишүүний хураамж төлсөн өдрөөс
              эхлэн “Жамух пропертиз”- н Гишүүнээр тооцогдон, “Жамух пропертиз”-зохион
              байгуулж буй нэр заасан арга хэмжээ, үйл ажиллагаа, гишүүдийн дотоод
              мэдээлэл \ангилал бүрээр\, үзүүлдэг үйлчилгээний талаарх мэдээлэл,
              борлуулагдаж буй бүтээгдэхүүн мэдээлэл хийсэн судалгаа, бусад гишүүдийн
              хүсэж буй бараа бүтээгдэхүүн зэргийн мэдээллийг авах эрх эдэлнэ.
            </div>
          </div>
          <div className={classes.rowNumber}>
            <div className={classes.number}>3</div>{' '}
            <div className={classes.numberDes}>
              Гишүүнчлэлийн төрлөө шатлал шатлалаар ахиулах эрхийг гишүүн бүр тэгш эдэлнэ.
            </div>
          </div>
          <div className={classes.rowNumber}>
            <div className={classes.number}>4</div>{' '}
            <div className={classes.numberDes}>
              Гишүүн нь “Жамух пропертиз”-н үйл ажиллагаанд идэвхтэй оролцох, санал
              сэтгэгдлээ чөлөөтэй илэрхийлэх, хамтран ажиллах/туслах, түүнчлэн Сонирхогч
              болон олон нийтэд байгууллагын үйл ажиллагааг сурталчлах, тэднийг уриалах
              зэрэг эрх, үүргийг эдэлнэ
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'relative',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: '100',
  },
  titleTop: { paddingTop: '90px' },
  title: {
    color: '#C19D65',
    fontSize: '25px',
    fontWeight: '300',
  },

  rowNumber: {
    display: 'flex',
    width: '100%',
    marginBottom: '10px',
  },
  number: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '300',
    color: '#C19D65',
    borderRadius: '100%',
    border: '1px solid #C19D65',
    marginRight: '10px',
    height: '40px',
    width: '40px',
  },
  numberDes: {
    width: 'calc(100% - 40px)',
  },
  description: {
    color: 'white',
    fontSize: '20px',
    marginTop: '30px',
    textAlign: 'center',
  },
  subDescription: {
    display: 'flex',
    justifyContent: 'flex-end',
    textAlign: 'center',
    color: '#C19D65',
    fontSize: '20px',
    marginTop: '30px',
    textTransform: 'uppercase',
  },
  reqButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C19D65',
    color: 'white',
    fontSize: '22px',
    padding: '8px',
    marginTop: '30px',
    borderRadius: '5px',
    cursor: 'pointer',
  },

  membersContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 0px',
    padding: '20px',
    flexWrap: 'wrap',
    alignItems: 'center',
    border: '1px solid #C19D65',
    borderRadius: '10px',
    backgroundColor: '#161515e3',
  },
  info: {
    marginTop: '60px',
    color: 'white',
    padding: (props) => (props.phone ? '0px' : '20px 10px'),
    width: (props) => (props.phone ? '100%' : '1300px'),
    fontSize: '16px',
    border: '1px solid #C19D65',
    textAlign: 'justify',
    backgroundColor: '#161515e3',
    borderRadius: '10px',
  },
  container: {
    display: 'flex',
    maxWidth: (props) => (props.phone ? '100%' : '1300px'),
    flexDirection: (props) => (props.phone ? 'column' : 'row'),
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    position: 'relative',
    backgroundImage: `url(${Background})`,
    padding: '20px',
    marginTop: '20px',
    border: '1px solid #C6824D',
    backgroundSize: '300px 250px',
  },
  members: {
    width: (props) => (props.phone ? '100%' : '68%'),
    marginRight: '5px',
  },
  request: {
    display: 'flex',
    flexDirection: 'column',
    width: (props) => (props.phone ? '100%' : '25%'),
    padding: (props) => (props.phone ? '0px' : '10px'),
    marginTop: (props) => (props.phone ? '10px' : '0px'),
    borderRadius: (props) => (props.phone ? '10px' : '0px'),
    border: '1px solid #C19D65',
    backgroundColor: '#161515e3',
    color: 'white',
    cursor: 'pointer',
  },
  tabs: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid white',
    padding: (props) => (props.phone ? '2px 0px' : '15px 0px'),
    justifyContent: 'space-between',
  },
  tab: {
    fontSize: (props) => (props.phone ? '14px' : '25px'),
    paddingRight: (props) => (props.phone ? '0px' : '15px'),
    color: 'white',
    cursor: 'pointer',
  },
  tabActive: {
    fontSize: (props) => (props.phone ? '14px' : '25px'),
    paddingRight: (props) => (props.phone ? '0px' : '15px'),
    color: '#C19D65',
    cursor: 'pointer',
  },
  subTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  tabButtons: {
    display: 'flex',
    alignItems: 'center',
  },
  tabButton: {
    color: 'white',
    cursor: 'pointer',
    margin: '10px',
  },
  tabButtonActive: {
    backgroundColor: '#C19D65',
    padding: '8px',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px',
  },
  counterMember: {
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    fontSize: (props) => (props.phone ? '12px' : '18px'),
  },
  cardRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: (props) => (props.phone ? '50%' : '20%'),
    color: 'white',
    fontSize: '18px',
    marginTop: '10px',
  },
  imageCard: {
    width: (props) => (props.phone ? '100px' : '120px'),
    height: (props) => (props.phone ? '100px' : '120px'),
    borderRadius: '100%',
  },
  lastName: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: '12px',
  },
  firstName: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
});
