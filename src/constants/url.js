const DEV = process.env.NODE_ENV !== 'production';
const API_ORIGIN = DEV ? 'http://localhost:4000' : 'http://43.231.114.19:4000';
const SOCKET_ORIGIN = DEV
  ? 'ws://localhost:4000/subscriptions'
  : 'http://43.231.114.19:4000/subscriptions';

const url = {
  general: ['/', '/news', '/property', '/antiquest', '/cars', '/estate'],
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
};

export { API_ORIGIN, DEV, SOCKET_ORIGIN, url, bmLinks };
