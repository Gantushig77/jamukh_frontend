const DEV = process.env.NODE_ENV !== 'production';
const backend_port = '4000';
const base_url = `http://192.168.1.26:${backend_port}`;
const img_url = `http://192.168.1.26:${backend_port}/image/`;
const membership_img_url = `http://192.168.1.26:${backend_port}/membership/`;

const url = {
  general: ['/antiquest', '/estate', '/cars', '/property','/painting'],
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

export { base_url, DEV, img_url, url, bmLinks, membership_img_url };
