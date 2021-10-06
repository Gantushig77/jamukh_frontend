function isPhoneNumber(phoneNumber) {
    return Number(phoneNumber) > 79999999 && Number(phoneNumber) < 100000000;
}

function isGoodPassword(password) {
    return password?.length > 7;
}
  

export {isPhoneNumber, isGoodPassword};