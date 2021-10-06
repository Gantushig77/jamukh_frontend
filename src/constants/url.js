const DEV = process.env.NODE_ENV !== 'production';
const API_ORIGIN = DEV ? 'http://localhost:8443' : 'https://khureemarket.mn:8443';
const SOCKET_ORIGIN = DEV
  ? 'ws://localhost:8443/subscriptions'
  : 'wss://khureemarket.mn:8443/subscriptions';

const url = {
  general: ['/', '/user/services', '/available-goods', '/available-goods', '/available-goods', '/available-goods', '/available-goods'],
  superadmin: ['/admin-list'],
  admin: [
    '/admin/operator-list',
    '/admin/user-list',
    '/admin/marketeer-list',
    '/admin/market-order-list',
  ],
  operator: [
    '/operator/marketeer-list',
    '/operator/marketeer-order-list',
    '/operator/category-list',
    '/operator/goods',
    '/operator/shipping-list',
  ],
  marketeer: [
    '/marketeer/order-list',
    '/marketeer/user-purchase-list',
    '/marketeer/goods-list',
  ],
  member: ['/', '/user/services', '/user/market-list', '/available-goods'],
};

const bmLinks = {
  general: [
    {
      name: 'Нэвтрэх',
      link: '/login',
    },
    {
      name: 'Бүртгүүлэх',
      link: '/sign-up',
    },
    {
      name: 'Нүүр хуудас',
      link: '/',
    },
    {
      name: 'Үйлчилгээ',
      link: '/user/services',
    },
    {
      name: 'Бараа',
      link: '/available-goods',
    },
    {
      name: 'Бараа',
      link: '/available-goods',
    },
    {
      name: 'Бараа',
      link: '/available-goods',
    },
    {
      name: 'Бараа',
      link: '/available-goods',
    },
  ],
  superadmin: [
    {
      name: 'Админууд',
      link: '/admin-list',
    },
  ],
  admin: [
    {
      name: 'Операторууд',
      link: '/admin/operator-list',
    },
    {
      name: 'Хэрэглэгчид',
      link: '/admin/user-list',
    },
    {
      name: 'Маркетерууд',
      link: '/admin/marketeer-list',
    },
    {
      name: 'Захиалга',
      link: '/admin/market-order-list',
    },
  ],
  operator: [
    {
      name: 'Дэлгүүр',
      link: '/operator/marketeer-list',
    },
    {
      name: 'Захиалга',
      link: '/operator/marketeer-order-list',
    },
    {
      name: 'Ангилал',
      link: '/operator/category-list',
    },
    {
      name: 'Бараа',
      link: '/operator/goods',
    },
    {
      name: 'Хүргэлт',
      link: '/operator/shipping-list',
    },
  ],
  marketeer: [
    {
      name: 'Захиалга',
      link: '/marketeer/order-list',
    },
    {
      name: 'Худалдан авалт',
      link: '/marketeer/user-purchase-list',
    },
    {
      name: 'Бараа',
      link: '/marketeer/goods-list',
    },
  ],
  member: [
    {
      name: 'Нүүр хуудас',
      link: '/',
    },
    {
      name: 'Үйлчилгээ',
      link: '/user/services',
    },
    {
      name: 'Дэлгүүр',
      link: '/user/market-list',
    },
    {
      name: 'Бараа',
      link: '/available-goods',
    },
    {
      name: 'Сагс',
      link: '/user/basket',
    },
  ],
};

export { API_ORIGIN, DEV, SOCKET_ORIGIN, url, bmLinks };
