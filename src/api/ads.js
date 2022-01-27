import ax_instance from '../helpers/axios_instance';


const getads = ( page, limit ) => {
 return ax_instance.get(`/ads/get-ads?page=${page}&limit=${limit}&order=ASC&acc_id=1`);
  };

const getDetail = ( id ) => {
  return ax_instance.get(`/ads/get-ad?ad_id=${id}`);
  };

export {getads ,getDetail };
