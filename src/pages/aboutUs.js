import React from 'react';
import Appbar from '../components/appbar/appbar';
import Footer from '../components/footer/footer';
import json2mq from 'json2mq';
import { Container, Box, Typography, useMediaQuery } from '@mui/material';
import about_us_img from '../assets/background/about_us.png';
import background from '../assets/background/background.png';
import TopArrow from '../assets/arrow/topArrow.png';

export default function AboutUs() {
  const phoneSize = useMediaQuery('(max-width: 767px)');

  const tabletSize = useMediaQuery(
    json2mq({
      minWidth: 768,
      maxWidth: 1023,
    })
  );

  return (
    <Box sx={styles().root}>
      <Appbar phone={phoneSize} tablet={tabletSize} />
      <Container maxWidth={false} sx={styles().body}>
        {/* Title */}
        <Box sx={styles().titleContainer}>
          <Typography sx={styles({ phone: phoneSize }).title}>Бидний тухай</Typography>
          <img src={TopArrow} alt='arrow' />
        </Box>
        {/* Content */}
        <Box sx={styles({ phone: phoneSize }).content}>
          <Typography sx={styles({ phone: phoneSize }).cTitle}>
            “Жамух пропертиз” ХХК
          </Typography>
          <Typography sx={styles({ phone: phoneSize }).cDesc}>
            “Жамух пропертиз” ХХК нь 2013 онд барилгын материалын худалдаа, худалдааны
            зуучлалын чиглэлээр үйл ажиллагаа явуулж ирсэн, салбартаа нэр хүнд бүхий
            байгууллага юм. Бид үл хөдлөх хөрөнгийн салбарын өсөн нэмэгдэж байгаа зах
            зээлийг соргогоор мэдэрч 2021 оноос эхлэн үл хөдлөх хөрөнгө зуучлалын салбарт
            идэвхтэй үйл ажиллагаа явуулж байна. “Жамух пропертиз” ХХК-ийн мэргэжлийн баг
            хамт олон үл хөдлөх хөрөнгө зуучлалын чиглэлээр ажиллаж эхэлсэн эхний жилдээ
            “Grand marshal luxury villas”, “City residence”, “grand residence” зэрэг
            томоохон төслүүдийн борлуулалт маркетингийг хариуцан 120 тэрбум төгрөгийн
            борлуулалтын гэрээ байгуулсан нь Монголын үл хөдлөх хөрөнгө зуучлалын салбарын
            түүхэнд гялалзсан амжилт болсон юм.
          </Typography>
          <Typography sx={styles({ phone: phoneSize }).cTitle}>Эрхэм зорилго</Typography>
          <Typography sx={styles({ phone: phoneSize }).cDesc}>
            Үл хөдлөх хөрөнгө зуучлалын салбарын мэргэжлийн ёс зүйг чанд баримтлан,
            мэдээллийн технологийн шилдэг инновацыг үйл ажиллагаандаа нэвтрүүлэн,
            ажиллагсдынхаа нийгмийн асуудлыг бүрэн шийдвэрлэсэн дэлхийн стандартад нийцсэн
            компани байх болно.
          </Typography>
          <Typography sx={styles({ phone: phoneSize }).cTitle}>Зорилт</Typography>
          <ol style={styles({ phone: phoneSize }).cDesc}>
            <li style={styles({ phone: phoneSize }).cLi}>
              Үл хөдлөх хөрөнгө зуучлалын салбарын мэргэжлийн ёс зүйг чанд баримтлах
            </li>
            <li style={styles({ phone: phoneSize }).cLi}>
              Мэдээллийн технологийн шилдэг инновацыг үйл ажиллагаандаа нэвтрүүлэх
            </li>
            <li style={styles({ phone: phoneSize }).cLi}>
              Ажиллагсдынхаа нийгмийн асуудлыг бүрэн шийдвэрлэх
            </li>
            <li style={styles({ phone: phoneSize }).cLi}>
              Дэлхийн стандартад нийцсэн компани болох
            </li>
          </ol>
          <Typography sx={styles({ phone: phoneSize }).cTitle}>Алсын хараа</Typography>
          <Typography sx={styles({ phone: phoneSize }).cDesc}>
            Захилагчдын сэтгэлд нийцсэн үйлчилгээг бүх сувгаар хүргэн гүйцэтгэгч
            байгууллага болон захиалагчдын итгэлтэй гүүр болж ажиллана.
          </Typography>
        </Box>
        {/* Footer */}
        <div style={{ width: '100%', paddingTop: 100 }}>
          <Footer phone={phoneSize} tablet={tabletSize} />
        </div>
      </Container>
    </Box>
  );
}

const styles = (props) => ({
  root: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  body: {
    height: '100%',
    paddingTop: '120px',
    marginBottom: '-60px',
    backgroundImage: `url(${about_us_img})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundColor: 'black',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'auto',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    borderBottom: '2px solid #C6824D',
    marginBottom: '10px',
    paddingBottom: '5px',
    color: 'white',
    fontSize: () => (props?.phone ? '42px' : '65px'),
    fontFamily: 'Roboto, sans-serif',
    fontWeight: '100',
  },
  content: {
    mt: '30px',
    padding: '60px',
    color: '#C6824D',
    fontWeight: '100',
    backgroundImage: `url(${background})`,
    backgroundSize: '300px 250px',
    border: '1px solid #C6824D',
    maxWidth: () => (props.phone ? '100%' : '1300px'),
    width: '100%',
  },
  cTitle: {
    fontSize: () => (props?.phone ? '26px' : '36px'),
    fontWeight: '100',
    mb: '35px',
  },
  cDesc: {
    fontSize: () => (props?.phone ? '18px' : '24px'),
    fontWeight: '100',
    mb: '35px',
  },
  cLi: {
    fontSize: () => (props?.phone ? '18px' : '24px'),
    fontFamily: 'Roboto, sans-serif',
    fontWeight: '100 !important',
  },
});
