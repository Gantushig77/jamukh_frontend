const DEV = process.env.NODE_ENV !== 'production';
const backend_port = DEV ? '4000' : '4000';
const base_url = DEV
  ? `http://localhost:${backend_port}`
  : `http://43.231.114.19:${backend_port}`;

const img_url = DEV
  ? `http://localhost:${backend_port}/image/`
  : `http://43.231.114.19:${backend_port}/image/`;

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

export { base_url, DEV, img_url, url, bmLinks };
