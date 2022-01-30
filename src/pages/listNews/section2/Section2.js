import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Title from '../../../components/title/title'
import Background from '../../../assets/background/background.png'
import { Link } from 'react-router-dom';
import { getBlogList } from '../../../api/ads';
import TruncateMarkup from 'react-truncate-markup';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styles from './Section.module.css'

export default function Section2(props) {
  const classes = useStyles(props);
  const limit = 10;
  const [news, setNews] = useState([])
  const [page, setPage] = useState([])

  useEffect(() => {
    getBlogList(page, limit)
      .then((res) => {
        setPage(res.page_length)
        setNews(res.data.blog_list)
      })
      .catch((e) => {
        handleSnackOpen({
          state: true,
          msg:
            e.message === 'user.not.found'
              ? 'Хэрэглэгч олдсонгүй'
              : 'Нэр үг эсвэл нууц үг буруу байна.',
          type: 'error',
        });
      });
  }, [page]);

  const handleSnackOpen = ({ state, msg, type }) => {
    setSnackbarState({
      open: state,
      message: msg,
      severity: type,
    });
  };

  const [setSnackbarState] = useState({
    open: false,
    message: 'Амжилттай илгээлээ',
    severity: 'success',
  });


  return (
    <div className={classes.root}>
      <Title name="Мэдээ" />
      {props?.parentId ? (
        <></>
      ) : (
        <>
          <Container className={classes.cardContent}>

            {
              news.length > 0 ?
                <div className={classes.columm}>
                  {news.map((item, i) => 
                  <Link key={i} className={classes.menuListItem} to={`/detailNews/${item.blog_id}`}>
                    <CardItem phone={props} item={item}/>
                  </Link>)}
                    <Stack spacing={2} className={styles.pagination}>
                      <Pagination count={page} variant="outlined" style={{ marginTop: "20px" }} renderItem={(item) => (
                        <PaginationItem
                          components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                          {...item}
                          className="pageButton"
                        />
                      )} />
                    </Stack>
                </div>
                :
                <div className={classes.empty}>
                  Хуудас олдсонгүй
                </div>
            }



          </Container>

        </>
      )}
    </div>
  );
}

const CardItem = (props) => {
  const classes = useStyles(props.phone);
  const item = props.item
  return (
    <div className={classes.cardRoot}>
      <img src={item.meta_img_url} className={classes.imageCard} alt={''} />
      <div className={classes.cardPadding}>
         <TruncateMarkup lines={2} ellipsis={() => {}}>
            <div className={classes.cardTitle}> 
              {item.title}
            </div>
         </TruncateMarkup>   
         <TruncateMarkup lines={3} ellipsis={() => {}}>
        <div className={classes.cardDesc}>
 
            {item.description}
         
        </div>
        </TruncateMarkup>  
        <div className={classes.cardButtonContent}>
          Дэлгэрэнгүй
        </div>
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'relative',
    paddingTop: '90px',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: '100',
    height: '100vh'
  },
  columm:{
    display:'flex',
    flexDirection:'column', 
    width: (props) => (props.phone ? '100%' : '1300px'),
  },
  empty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '30px',
    color: '#C6824D',
    fontSize: '60px',
    fontFamily: "'Lobster', cursive",
  },

  menuListItem: {
    textDecoration: 'none',
    borderBottom: '1px solid #C19D6580',
    padding: '10px 0',
  },
  cardContent: {
    display: 'flex',
    maxWidth: (props) => (props.phone ? '100%' : '1300px'),
    flexDirection: (props) => (props.phone ? 'column' : 'row'),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
    position: 'relative',
    backgroundImage: `url(${Background})`,
    backgroundSize: "300px 250px",
    padding: "40px",
    marginTop: '20px',
    border: '1px solid #C6824D'
  },
  cardButton: {
    display: 'flex',
    alignItems: 'center',
    background:
      'linear-gradient(178.42deg, #F8D4A0 -60.84%, #E49461 1.15%, #954D1D 75.77%, #C0703D 139.77%)',
    color: 'white',
    fontSize: '15px',
    padding: 6,
  },
  cardButtonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 8,
    color: '#C19D65',
    fontWeight: '400',
    fontSize: '18px',
    width:'100%'
  },
  card: {
    width: '100px',
  },
  cardRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection:(props) => (props.phone ? 'column' : 'row'),
    width: '100%',
    textAlign: (props) => (props.phone ? 'center' : 'left'),
    margin: 5,
  },
  imageCard: {
    height: '200px',
    width: '300px',
    borderRadius: '20px',
    border: '1px solid #C6824D'
  },
  cardPadding: {
    padding: '10px',
    width:'100%'
  },
  cardTitle: {
    fontSize: 30,
    color: '#C19D65',
    fontWeight: '300'
  },
  cardDesc: {
    fontSize: 20,
    fontWeight: '100',
    color: 'white',
    marginTop: '10px'
  },
  cardDate: {
    fontSize: 14,
    fontWeight: 'normal',
    padding: '10px 0px',
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

});
