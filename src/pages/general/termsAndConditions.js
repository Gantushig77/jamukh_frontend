import React, { useContext } from 'react';
import { Container, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import json2mq from 'json2mq';
import colors from '../../constants/colors';
import Appbar from '../../components/appbar/appbar';
import { makeStyles } from '@mui/styles';
import TheContext from '../../context/context';

export default function TermsAndConditions() {
  const ContextHook = useContext(TheContext);
  const contextText = ContextHook.contextValue.contextText;
  const classes = useStyles();
  const phoneSize = useMediaQuery('(max-width: 767px)');
  const tabletSize = useMediaQuery(
    json2mq({
      minWidth: 768,
      maxWidth: 1023,
    })
  );

  return (
    <Container disableGutters maxWidth={false}>
      <Appbar phone={phoneSize} tablet={tabletSize} />
      <Container className={classes.textContainer}>
        <h1>{contextText.termsAndConditions.title}</h1>
        <Typography>Шинэчлэгдсэн огноо: 2021.07.15</Typography>
        <Typography>Нэг. Ерөнхий зүйл</Typography>
        <ul>
          <li>
            Энэхүү үйлчилгээний нөхцөл нь цахим орчинд бараа бүтээгдэхүүн үйлчилгээг
            худалдах, худалдан авахтай холбоотой үүсч буй харилцааг зохицуулна.
          </li>
          <li>
            Энэхүү үйлчилгээний нөхцөлд хэрэглэсэн дараах нэр томьёог дор дурдсан утгаар
            ойлгоно. Үүнд:
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
            Үйлчилгээний нөхцлийг мөрдөх бөгөөд тухайн үеэс уг нөхцлийг хүлээн зөвшөөрсөнд
            тооцно.
          </li>
        </ul>
      </Container>
    </Container>
  );
}

const useStyles = makeStyles({
  textContainer: {
    textAlign: 'left',
    maxWidth: 1100,
  },
  title: {
    color: colors.black,
  },
  description: {
    color: colors.black,
  },
});
