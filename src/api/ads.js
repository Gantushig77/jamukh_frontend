import ax_instance from '../helpers/axios_instance';
import { isAuthenticated } from '../helpers/helperFunctions';

const getads = (page, limit) => {
  return ax_instance.get(`/ads/get-ads?page=${page}&limit=${limit}&order=ASC`);
};

const getDetail = (id) => {
  return ax_instance.get(
    isAuthenticated() === true
      ? `/ads/get-ad?ad_id=${id}`
      : `/ads/get-free-ad?ad_id=${id}`
  );
};

const getCategoryAds = (id, limit, subCategory) => {
  return ax_instance.get(
    isAuthenticated() === true
      ? `/ads/get-new-ads?page=1&limit=${limit}&order=DESC&category=${id}&subCategory=${subCategory}`
      : `/ads/get-free-ads?page=1&limit=${limit}&order=DESC&category=${id}&subCategory=${subCategory}`
  );
};

const getBlogList = (id, limit) => {
  return ax_instance.get(`/blog/blog-list?page=1&limit=10&category=All&order=DESC`);
};

const getDetailNews = (id) => {
  return ax_instance.get(`/blog/blog-post?id=${id}`);
};

const getRealtor = (id) => {
  return ax_instance.get(
    `/admin/list-of-admin?sort=ASC&page=${id}&limit=12&role=realtor`
  );
};
const getliked = () => {
  return ax_instance.get(`/ads/get-liked-ads?page=1&limit=10&order=ASC`);
};

const getlike = (id) => {
  return ax_instance.post(`/ads/like-ad?ad_id=${id}`, { 'ad_id': id });
};

const getremovelike = (id) => {
  return ax_instance.post(`/ads/remove-liked-ad?ad_id=${id}`, { 'ad_id': id });
};

const getSearch = (text, id, subCategory) => {
  return ax_instance.get(
    `/ads/search-ads?search_query=${text}&page=1&limit=10&category=${id}&order=DESC&subCategory=${subCategory}`
  );
};

export {
  getads,
  getDetail,
  getCategoryAds,
  getBlogList,
  getDetailNews,
  getRealtor,
  getliked,
  getlike,
  getremovelike,
  getSearch,
};
