import React, { useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import json2mq from 'json2mq';
import Appbar from '../../components/appbar/appbar';
import { Alert } from '@mui/lab';
import { Snackbar } from '@mui/material';
import Slider from '../../components/slider/slider';
import Section2 from './section2/Section2';
import { getDetail } from '../../api/ads';
import { useParams } from 'react-router-dom';

export default function News() {
  const params = useParams();
  const [isLoading, setLoading] = useState(true);
  const [liked, setLiked] = useState(true);
  const [posts, setPosts] = useState({});
  const phoneSize = useMediaQuery('(max-width: 767px)');
  const tabletSize = useMediaQuery(
    json2mq({
      minWidth: 768,
      maxWidth: 1023,
    })
  );

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: 'Амжилттай илгээлээ',
    severity: 'success',
  });

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarState({ ...snackbarState, open: false });
  };

  useEffect(() => {
    getDetail(params.id)
      .then((res) => {
        console.log(res?.data,"res.data")
        setPosts(res?.data);
        setLoading(false);
        setLiked(res?.data?.liked);
      })
      .catch((e) => {});
  }, [params.id]);

  return (
    <div
      style={{
        height: '100%',
        margin: '0px',
        padding: '0px',
      }}
    >
      <Appbar phone={phoneSize} tablet={tabletSize} />
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
      {isLoading === true ? (
        <>Loading...</>
      ) : (
        <>
          <Slider
            data={posts?.ad_imgs}
            title={posts?.title}
            phone={phoneSize}
            tablet={tabletSize}
            avatar={posts?.created_user}
          />
          <Section2
            image={posts?.ad_imgs}
            description={posts?.description}
            ads_info={posts?.ads_info[0]?.info_obj}
            phone={phoneSize}
            tablet={tabletSize}
            avatar={posts?.realtor[0]}
            symbol={posts?.currency_symbol}
            price={posts?.price}
            liked={posts?.liked}
            id={posts?.ads_id}
          />
        </>
      )}
    </div>
  );
}
