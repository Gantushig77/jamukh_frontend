const enText = {
  appbar: {
    signUp: 'Sign up',
    login: 'Login',
    logout: 'Logout',
    links: {
      general: ['Home', 'Services'],
      superadmin: ['Admin'],
      admin: ['Operator', 'Users', 'Market', 'Order'],
      operator: ['Market', 'Order', 'Category', 'Goods', 'Shipping'],
      marketeer: ['Order', 'Purchase', 'Goods'],
      member: ['/', 'Services', 'Market', 'Goods'],
    },
    termsAndConditions: 'Terms and conditions',
    qrCode: 'QR Code',
    orderHistory: 'Order history',
    profileChange: 'Account information',
  },
  footer: {
    legal: '© All rights reserved',
    email: 'contact@khureemarket.mn',
    phone: '+976 88029459',
    terms: 'Terms and conditions',
  },
  signUp: {
    title: 'Sign up',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Ut dolor ipsum, pharetra eget bibendum ut, tristique ac nulla. 
            Donec a condimentum nibh.`,
    phone: 'Phone number',
    username: 'Username',
    password: 'Password',
    passwordVerify: 'Verify password',
    otpButton: 'Verify',
    termsAndConditions: 'By clicking this, you are agreeing to the terms and conditions.',
    agree: 'Agree',
    passDesc: 'Та системд нэвтрэх нэр болон нууц үгээ оруулна уу.',
    phoneDesc: `Та системд бүртгүүлэх утасны дугаараа оруулна уу.`,
    verifyDesc: `Таны утасны дугаар луу 6 оронтой нууц код илгээсэн 
            бөгөөд оруулж баталгаажуулна уу.`,
    otpDesc: `Таны утасны дугаар луу 6 оронтой нууц код 
            илгээсэн бөгөөд оруулж баталгаажуулна уу.`,
  },
  login: {
    title: 'Login',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Ut dolor ipsum, pharetra eget bibendum ut, tristique ac nulla. 
            Donec a condimentum nibh.`,
    phone: 'Phone number',
    username: 'Username',
    password: 'Password',
    passwordVerify: 'Verify password',
    otpButton: 'Verify',
    remember: 'Remeber me',
    forgot: 'Forogt your password?',
  },
  forgot: {
    title: `Recover password`,
    recoverPass: 'Та цаашид ашиглах шинэ нууц үгээ оруулна уу.',
    description: `Та системд бүртгэлтэй утасны дугаараа оруулан 
            баталгаажуулаад шинэ нууц үг үүсгэх боломжтой.`,
    newPass: `New password`,
    newPassVerify: `Verify new password`,
    send: 'Send',
  },
  service: {
    title: 'Үйлчилгээний Багцууд',
    description: `Та манай Алтан болон Мөнгөн багцуудаас сонгож 
    үйлчлүүлээд 1 жилийн хугацаанд хөнгөлөлттэй мах махан бүтээгдэхүүн авах үйлчилгээг аваарай. 
    Үйлчилгээний төгсгөлд та байршуулсан мөнгөө бүхэлд нь буцааж авах болно.`,
    choose: 'Choose',
  },
  profile: {
    title: 'Change account information',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Ut dolor ipsum, pharetra eget bibendum ut, tristique ac nulla. 
            Donec a condimentum nibh.`,
  },
  payment: {
    title: 'Payment methods',
    description: `Lorem Ipsum is simply dummy text of the printing and 
            typesetting industry. Lorem Ipsum has been the industry's standard 
            dummy text ever since the 1500s, when an unknown printer took a 
            galley of type and scrambled it to make a type specimen book.`,
    calculator: {
      title: 'Төлбөр төлөх',
      description: `Та сонгосон багцаа идэвхжүүлж 1 жилийн турш сар бүр тодорхой 
            хэмжээ хүртэлх махыг 15% хөнгөлүүлэх эрх авах гэж байна.`,
      specialuser: 'Сонгосон багц',
      time: '1 жил',
      amount: 'Нийт',
      amountTime: '1 жил',
    },
    modal: {
      title: 'Payment',
      description: `Энэ хэсэгт "Энэ дүрстэй холбогдолтой" хэсгийн 
                шаардлагыг тайлбарласан тайлбар байршина`,
      price: 'Total amount',
      paymentMethod: 'Payment method',
      bankTransaction: 'Bank transaction',
      receiver: 'Receiver',
      rName: 'ХҮРЭЭ МАРКЕТ',
      bankName: 'Khan bank',
      otherBank: 'TDB',
      qrBottom: `Zwei flinke Boxer jagen die quirlige Eva und ihren 
                Mops durch Sylt. Franz jagt im komplett verwahrlosten 
                Taxi quer durch Bayern. Zwölf Boxkämpfer 
                jagen Viktor quer über`,
    },
    toPay: 'Proceed',
  },
  termsAndConditions: {
    title: 'Terms and conditions',
  },
  operator: {
    marketeerList: {
      title: 'Shop',
      description: `Хэрэглэгчдэд хүрч үйлчлэх болон онлайн захиалгуудыг хүлээж 
                авах дэлгүүрүүдийн жагсаалтыг энэ хэсэгт харуулж байна. 
                Шинээр дэлгүүр бүртгэж, мөн засаж өөрчлөх боломжтой.`,
      marketeerAddDesc:
        'Бүртгэх гэж буй дэлгүүрийнхээ тухай үндсэн мэдээллүүдийг оруулна уу.',
      marketeerUpdateTitle: 'Мэдээлэл Засах',
      marketeerUpdateDesc: 'Шинэ мэдээллээ оруулаад хадгална уу.',
      categories: ['All', 'Regular', 'Special', 'Archived'],
      addShop: 'Add shop',
      form: {
        name: 'Shop name',
        phone: 'Phone number',
        username: 'Username',
        password: 'Password',
        address: 'Address',
        shipping: 'Shipping',
        openHours: 'Open hours',
        description: 'Short introduction of the store',
      },
    },
  },
};

export default enText;
