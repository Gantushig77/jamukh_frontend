import React, { useContext } from 'react';
import ServiceInfo from '../../components/service/serviceInfo';
import ServiceOptions from '../../components/service/serviceOptions';
import Appbar from '../../components/appbar/appbar';
import TheContext from '../../context/context';
import { useMediaQuery } from '@mui/material';
import json2mq from 'json2mq';

export default function Service() {
  const ContextHook = useContext(TheContext);
  const account = ContextHook?.account;

  const phoneSize = useMediaQuery('(max-width: 767px)');
  const tabletSize = useMediaQuery(
    json2mq({
      minWidth: 768,
      maxWidth: 1023,
    })
  );

  return (
    <div>
      <Appbar phone={phoneSize} tablet={tabletSize} />
      {account?.status === 'paid' ? (
        <ServiceInfo phone={phoneSize} tablet={tabletSize} />
      ) : (
        <ServiceOptions phone={phoneSize} tablet={tabletSize} />
      )}
    </div>
  );
}
