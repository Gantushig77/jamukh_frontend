import React from 'react';
import { Container } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import json2mq from 'json2mq';
import Appbar from '../../components/appbar/appbar';
import UserQR from '../../components/user/UserQR';

export default function UserQrCode() {
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
      <UserQR />
    </Container>
  );
}
