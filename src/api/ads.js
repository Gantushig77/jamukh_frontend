import ax_instance from '../helpers/axios_instance';

const getads = (page, limit) => {
  return ax_instance.get(`/ads/get-ads?page=${page}&limit=${limit}&order=ASC`);
};

const getDetail = (id) => {
  return ax_instance.get(`/ads/get-ad?ad_id=${id}`);
};

const getCategoryAds = (id, limit) => {
  return ax_instance.get(
    `/ads/get-new-ads?page=1&limit=${limit}&order=DESC&category=${id}`
  );
};

const getBlogList = (id, limit) => {
  return ax_instance.get(`/blog/blog-list?page=1&limit=10&category=All&order=DESC`);
};

const getDetailNews = (id) => {
  return ax_instance.get(`/blog/blog-post?id=${id}`);
};

const getProfile = () => {
  return ax_instance.get(`/account/profile`);
};

export { getads, getDetail, getCategoryAds, getBlogList, getDetailNews, getProfile };
