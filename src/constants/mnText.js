const mnText = {
  appbar: {
    signUp: 'Бүртгүүлэх',
    login: 'Нэвтрэх',
    logout: 'Гарах',
    links: {
      general: [ 'Эртний эдлэл', 'Үл хөдлөх','Машин','Газар','Уранзураг'],
      superadmin: ['Админууд'],
      admin: ['Операторууд', 'Хэрэглэгчид', 'Дэлгүүр', 'Захиалга'],
      operator: ['Дэлгүүр', 'Захиалга', 'Ангилал', 'Бараа', 'Хүргэлт'],
      marketeer: ['Захиалга', 'Худалдан авалт', 'Бараа'],
      member: ['Нүүр хуудас', 'Үйлчилгээ', 'Дэлгүүр', 'Бараа'],
    },
    termsAndConditions: 'Үйлчилгээний нөхцөл',
    qrCode: 'QR Код',
    orderHistory: 'Худалдан авалт',
    profileChange: 'Мэдээлэл засах',
  },
  footer: {
    legal: '© Бүх эрх хуулиар хамгаалагдсан',
    email: 'contact@khureemarket.mn',
    phone: '+976 88029459',
    terms: 'Үйлчилгээний нөхцөл',
  },
  signUp: {
    title: 'Бүртгүүлэх',
    description: `Та системд бүртгүүлэх утасны дугаараа оруулна уу.`,
    verifyDesc: `Таны утасны дугаар луу 6 оронтой нууц код илгээсэн 
            бөгөөд оруулж баталгаажуулна уу.`,
    phone: 'Утасны Дугаар',
    phoneDesc: `Та системд бүртгүүлэх утасны дугаараа оруулна уу.`,
    username: 'Нэвтрэх Нэр',
    password: 'Нууц үг',
    passDesc: 'Та системд нэвтрэх нэр болон нууц үгээ оруулна уу.',
    passwordVerify: 'Нууц үг батлах',
    otpButton: 'Баталгаажуулах',
    termsAndConditions: 'Үйлчилгээний нөхцөл зөвшөөрч байна.',
    agree: 'Зөвшөөрөх',
    otpDesc: `Таны утасны дугаар луу 6 оронтой нууц код 
            илгээсэн бөгөөд оруулж баталгаажуулна уу.`,
  },
  login: {
    title: 'Нэвтрэх',
    description: `Хэрвээ та системд аль хэдийн бүртгэлтэй бол нэвтрэх 
            нэр болон нууц үгээ оруулаад нэвтэрнэ үү.`,
    phone: 'Утасны Дугаар',
    username: 'Нэвтрэх Нэр эсвэл Утасны Дугаар',
    password: 'Нууц үг',
    passwordVerify: 'Нууц үг батлах',
    otpButton: 'Баталгаажуулах',
    remember: 'Нууц үг сануулах',
    forgot: 'Нууц үг мартсан',
  },
  forgot: {
    title: `Нууц үг сэргээх`,
    description: `Та системд бүртгэлтэй утасны дугаараа оруулан 
            баталгаажуулаад шинэ нууц үг үүсгэх боломжтой.`,
    recoverPass: 'Та цаашид ашиглах шинэ нууц үгээ оруулна уу.',
    newPass: `Шинэ Нууц Үг`,
    newPassVerify: `Нууц үг батлах`,
    send: 'Илгээх',
  },
  service: {
    title: 'Үйлчилгээний Багцууд',
    description: `Та манай Алтан болон Мөнгөн багцуудаас сонгож үйлчлүүлээд
     1 жилийн хугацаанд хөнгөлөлттэй мах махан бүтээгдэхүүн авах үйлчилгээг аваарай.
      Үйлчилгээний төгсгөлд та байршуулсан мөнгөө бүхэлд нь буцааж авах болно.`,
    choose: 'Сонгох',
  },
  profile: {
    title: 'Мэдээлэл засах',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Ut dolor ipsum, pharetra eget bibendum ut, tristique ac nulla. 
            Donec a condimentum nibh.`,
  },
  payment: {
    title: 'Төлбөрийн нөхцөл',
    description: `Та дараах төлбөр төлөх сонголтуудаас өөрт 
            тохирох хялбарыг нь сонгож ашиглах боломжтой.`,
    calculator: {
      title: 'Төлбөрийн мэдээлэл',
      description: `Та сагсан дахь бараанаасаа сонгоод төлбөр төлөх хэсэг рүү шилжинэ үү. `,
      specialuser: 'Сонгосон багц',
      time: '1 жил',
      amount: 'Нийт',
      amountTime: '1 жил',
    },
    modal: {
      title: 'Төлбөр төлөх',
      description: `Та дансаар шилжүүлэх аль эсвэл доорх QR кодыг уншуулан төлбөрөө төлнө үү. Дансаар шилжүүлж буй тохиолдолд гүйлгээний утган дээрээ захиалгынхаа дугаарыг бичнэ үү.`,
      price: 'Захиалгийн дүн',
      paymentMethod: 'Төлбөрийн нөхцөл',
      bankTransaction: 'Дансаар шилжүүлэх',
      receiver: 'Хүлээн авагч',
      rName: 'ХҮРЭЭ МАРКЕТ',
      bankName: 'Хаан Банк',
      otherBank: 'TDB',
      qrBottom: `QPay ашиглан төлсөн тохиолдолд таны захиалга шууд баталгаажих болно.
       Харин дансаар төлсөн тохиолдолд хэсэг хугацааны дараа баталгаажихыг анхаарна уу. 
       Шаардлагатай үед оператор тантай холбогдож мэдээлэл өгнө.`,
      ebarimtBottom: `QR кодоо уншуулна уу!`,
    },
    toPay: 'Төлөх',
  },
  termsAndConditions: {
    title: 'Үйлчилгээний нөхцөл',
  },
  operator: {
    marketeerList: {
      title: 'Дэлгүүр',
      description: `Хэрэглэгчдэд хүрч үйлчлэх болон онлайн захиалгуудыг хүлээж 
                авах дэлгүүрүүдийн жагсаалтыг энэ хэсэгт харуулж байна. 
                Шинээр дэлгүүр бүртгэж, мөн засаж өөрчлөх боломжтой.`,
      marketeerAddDesc:
        'Бүртгэх гэж буй дэлгүүрийнхээ тухай үндсэн мэдээллүүдийг оруулна уу.',
      marketeerUpdateTitle: 'Мэдээлэл Засах',
      marketeerUpdateDesc: 'Шинэ мэдээллээ оруулаад хадгална уу.',
      categories: ['Бүгд', 'Энгийн', 'Онцлох', 'Архив'],
      addShop: 'Дэлгүүр Нэмэх',
      form: {
        name: 'Дэлгүүрийн нэр',
        phone: 'Утасны дугаар',
        username: 'Хэрэглэгчийн нэр',
        password: 'Нууц үг',
        address: 'Хаяг',
        shipping: 'Хүргэлт',
        openHours: 'Ажиллах цаг',
        description: 'Товч танилцуулга',
      },
    },
  },
};

export default mnText;
