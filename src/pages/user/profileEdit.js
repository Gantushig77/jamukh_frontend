// import { makeStyles, useMediaQuery } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Appbar from "../../components/appbar/appbar";
import { CSS_HELPER } from "../../constants/helper";
import DropdownCore from "../../components/core/dropdownCore";
import UserCard from "../../components/cards/userCard";
import PageAbout from "../../components/adminComponents/pageAbout";
import InputCore from "../../components/core/inputCore";
import { useMutation, useQuery } from "@apollo/client";
import { ACCOUNT, CHANGE_AVATAR, CHANGE_PHONE_CONFIRM, UPDATE_ME } from "../../graphql/gql/user/user";
import { PLACE_HOLDER } from "../../constants/placeholder";
import json2mq from "json2mq";
import { LOCATION_INFO } from "../../graphql/gql/locationInfo/locationInfo";
import InputBasedModal from "../../components/inputBasedModal/inputBasedModal";
import OtpInput from "react-otp-input";
import ToastifyBody, { toastError, toastInfo, toastSuccess, toastWarning } from "../../components/core/toastCore";
import { useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";

export default function ProfileEdit() {
  const phoneSize = useMediaQuery("(max-width: 767px)");
  const tabletSize = useMediaQuery(
    json2mq({
      minWidth: 768,
      maxWidth: 1023,
    })
  );
  const classes = useStyles({ phone: phoneSize, tablet: tabletSize });
  const [name, setName] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [phone, setPhone] = useState();
  const { data: me, refetch } = useQuery(ACCOUNT);
  const [address, setAddress] = useState();
  // const [registered, setRegistered] = useState();
  const [changeAvatar, { loading }] = useMutation(CHANGE_AVATAR);
  const [updateMe] = useMutation(UPDATE_ME, {
    onCompleted(data) {
      setShowPasswordInput(false);
      setPassword();
      setPasswordAgain();
      if (data.updateMe.OTP_Sent) {
        toastSuccess("Мэдээлэл амжилттай шинэчилэгдлээ");
        toastInfo("Таны дугаарт ОРТ илгээгдлээ");
        setShowOtp(true);
      } else {
        toastSuccess("Мэдээлэл амжилттай шинэчилэгдлээ");

        refetch();
      }
    },
    onError(e) {
      toastError(e.graphQLErrors[0].message ?? "Алдаа гарлаа");
    },
  });
  const [changePhoneConfirm] = useMutation(CHANGE_PHONE_CONFIRM, {
    onCompleted() {
      toastSuccess("Дугаар амжилттай баталгаажлаа");
    },
    onError(e) {
      toastError(e.graphQLErrors[0]?.message ?? "Алдаа гарлаа");
    },
  });

  const { data: locations } = useQuery(LOCATION_INFO);

  // user password
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  ///////////////////////

  // otp data
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  // addres data
  // eslint-disable-next-line
  const [district, setDistrict] = useState(null);
  const [city, setCity] = useState("Улаанбаатар");
  // eslint-disable-next-line
  const [unit, setUnit] = useState();
  /////////////////////////////

  useEffect(() => {
    if (me?.me) {
      setName(me?.me.firstName);
      setLastname(me?.me.lastName);
      setUsername(me?.me.username);
      setEmail(me?.me?.email ? (me?.me?.email?.startsWith("^") ? "" : me?.me?.email) : "");
      setPhone(me?.me?.phone);
      setAddress(me?.me?.address);
      setCity(me?.me?.city ?? "Улаанбаатар");
      setDistrict(me?.me?.district);
      setUnit(me?.me?.unit);

      // setRegistered(graphql_Id_to_Date(me?.me?._id));
    }
  }, [me]);
  return (
    <>
      <div className={classes.root}>
        <Appbar phone={phoneSize} tablet={tabletSize} />

        <div className={classes.main}>
          <div className={classes.userCard}>
            <UserCard
              options={[]}
              onChangeTitle={loading ? "Уншиж байна..." : undefined}
              onChangeImage={() => {
                const input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");
                input.setAttribute("multiple", false);
                input.click();
                input.onchange = async () => {
                  const file = input.files[0];
                  changeAvatar({ variables: { image: file } });
                };
              }}
              imageUrl={me?.me?.avatar?.path ?? PLACE_HOLDER.user}
              fullName={`${me?.me.lastName ? me?.me.lastName[0] + "." : "..."} ${me?.me.firstName ?? "..."}`}
              username={`@${me?.me?.username}`}
            />
          </div>
          <div className={classes.container}>
            <PageAbout
              title="Мэдээлэл засах"
              desc="Та манай системд бүртгэлтэй өөрийн үндсэн мэдээллийг харж байна.  Ямар нэгэн мэдээллээ өөрчилсөн тохиолдолд хадгалах товчийг дарж баталгаажуулна уу."
              marginTop={0}
              marginLeft={0}
              marginBottom={46}
              descWidth={"100%"}
              descMaxWidth={"505px"}
            />
            <div className={classes.inputContainer}>
              <h1 className={classes.inputContainerTitle}>Овог</h1>
              <InputCore acceptValue={lastname} onChange={setLastname} placeholder="Овог" />
            </div>
            <div className={classes.inputContainer}>
              <h1 className={classes.inputContainerTitle}>Нэр</h1>
              <InputCore acceptValue={name} onChange={setName} placeholder="Нэр" />
            </div>
            <div className={classes.inputContainer}>
              <h1 className={classes.inputContainerTitle}>Нэвтрэх нэр</h1>
              <InputCore acceptValue={username} onChange={setUsername} placeholder="Нэвтрэх Нэр" />
            </div>
            <div className={classes.inputContainer}>
              <h1 className={classes.inputContainerTitle}>И-Мэйл</h1>
              <InputCore acceptValue={email} onChange={setEmail} placeholder="И-Мэйл" />
            </div>
            <div className={classes.inputContainer}>
              <h1 className={classes.inputContainerTitle}>Холбогдох дугаар</h1>
              <InputCore acceptValue={phone} onChange={setPhone} placeholder="Холбогдох дугаар" />
            </div>
            <PageAbout
              title="Хаяг"
              desc="Та захиалга хүлээн авах өөрийн үндсэн хаягийг энд тохируулж өгнө үү. Энэхүү хаягаар таны захиалгууд хүргэгдэх болно."
              descWidth={"100%"}
              marginTop={0}
              marginBottom={16}
              descMaxWidth={"505px"}
            />

            {locations && (
              <>
                <div className={classes.inputContainer}>
                  <h1 className={classes.inputContainerTitle}>Хот / Аймаг</h1>
                  <DropdownCore
                    onChange={(e) => {
                      setCity(e);
                    }}
                    defaultValue={city}
                    options={locations.locationInfo[0].cityList}
                  />
                </div>
                <div className={classes.inputContainer}>
                  <h1 className={classes.inputContainerTitle}>Дүүрэг / Сум</h1>
                  <DropdownCore
                    defaultValue={me?.me?.district}
                    onChange={setDistrict}
                    options={
                      locations.locationInfo[0].districtList[
                        locations.locationInfo[0].cityList.findIndex((item) => item === city) === -1
                          ? 0
                          : locations.locationInfo[0].cityList.findIndex((item) => item === city)
                      ]
                    }
                  />
                </div>
                {/* <div className={classes.inputContainer}>
                  <h1 className={classes.inputContainerTitle}>Хороо / Баг</h1>
                  <DropdownCore
                    defaultValue={me?.me?.unit}
                    onChange={setUnit}
                    options={
                      locations.locationInfo[0].unitList[
                        locations.locationInfo[0].districtList.findIndex((item) => item === district) === -1
                          ? 0
                          : locations.locationInfo[0].districtList.findIndex((item) => item === district)
                      ]
                    }
                  />
                </div> */}
              </>
            )}
            <div className={classes.inputContainer + " " + classes.inputcontainerData}>
              <h1 className={classes.inputContainerTitle}>Дэлгэрэнгүй хаяг</h1>
              <InputCore acceptValue={address} onChange={setAddress} placeholder="Хороо, Хороолол, Байр, Тоот" />
            </div>

            {/* <PageAbout title="Нууцлал" marginTop={0} marginLeft={0} marginBottom={46} descWidth={"100%"} descMaxWidth={"505px"} />

            <div className={classes.inputContainer}>
              <h1 className={classes.inputContainerTitle}>Нууц үг</h1>
              <InputCore placeholder="Нууц Үг" type="password" />
            </div>
            <div className={classes.inputContainer}>
              <h1 className={classes.inputContainerTitle}>Нууц Үг Батлах</h1>
              <InputCore placeholder="Нууц Үг Батлах" type="password" />
            </div>
            <PageAbout title="Статус" marginTop={0} marginLeft={0} marginBottom={36} descWidth={"100%"} descMaxWidth={"505px"} />
            <div className={classes.userContainer}>
              <ImgCore src={""} placeHolder={PLACE_HOLDER.user} className={classes.avatarImage} />
              <div className={classes.userContainerTexts}>
                <h1 className={classes.userContainerTitle}>{"Хэрэглэгчийн статус"}</h1>
                <h2 className={classes.userContainerText}>
                  {registered ? `${new Date(registered).getFullYear()} оны ${new Date(registered).getMonth()} сараас` : "Бүртгүүлсэн огноо"}
                </h2>
              </div>
            </div> */}
            {/* <div className={classes}> */}
            <PageAbout
              marginTop="20px"
              marginBottom="50px"
              title="Нууц Үг солих"
              desc="Шинэ нууц үгээ оруулаад хадгална уу"
            />

            <div className={classes.inputContainer}>
              <h1 className={classes.inputContainerTitle}>Шинэ Нууц Үг</h1>
              <InputCore acceptValue={password} onChange={setPassword} placeholder="Шинэ Нууц Үг" type="password" />
            </div>
            <div className={classes.inputContainer}>
              <h1 className={classes.inputContainerTitle}>Шинэ Нууц Үг баталгаажуулах</h1>
              <InputCore
                acceptValue={passwordAgain}
                onChange={setPasswordAgain}
                placeholder="Шинэ Нууц Үг баталгаажуулах"
                type="password"
              />
            </div>
            {/* </div> */}
            <div className={classes.buttons}>
              <h1
                className={classes.button}
                onClick={() => {
                  if (
                    (!me?.me?.phone?.startsWith("^") && phone?.length !== 8) ||
                    (me?.me?.phone?.startsWith("^") && phone?.length !== 0 && phone?.length !== 8)
                  ) {
                    toastError("Утасны дугаар буруу байна");
                  } else if (password !== passwordAgain) {
                    toastWarning("Нууц Үг зөрж байна");
                  } else if (password && password.length < 8) {
                    toastWarning("Нууц Үг багадаа 8 тэмдэгтээс бүрдэх ёстой");
                  }
                  // password shaardlagatai esehiig shalgaj baina
                  else if (
                    (username && me?.me?.username !== username) ||
                    (phone && me?.me?.phone !== phone) ||
                    (phone !== me?.me?.phone && phone?.length === 8) ||
                    (email && me?.me?.email !== email) ||
                    passwordAgain
                  ) {
                    setShowPasswordInput("need password");
                  } else {
                    if (
                      me?.me?.firstName !== name ||
                      me?.me?.lastName !== lastname ||
                      me?.me?.address !== address ||
                      me?.me?.city !== city ||
                      me?.me?.district !== district
                    )
                      updateMe({
                        variables: {
                          firstName: name,
                          lastName: lastname,
                          address: address,
                          city: city,
                          district: district,
                        },
                      });
                    else {
                      toastWarning("Ямар нэгэн өөрчлөлт ороогүй байна");
                    }
                  }
                }}
              >
                {"Хадгалах"}
              </h1>
              <h1
                className={classes.buttonLight}
                onClick={() => {
                  if (me?.me) {
                    setName(me?.me.firstName);
                    setLastname(me?.me.lastName);
                    setUsername(me?.me.username);
                    setEmail(me?.me?.email ? (me?.me?.email?.startsWith("^") ? "" : me?.me?.email) : "");
                    setPhone(me?.me?.phone);
                    setAddress(me?.me?.address);
                    setCity(me?.me?.city ?? "Улаанбаатар");
                    setDistrict(me?.me?.district);
                    setUnit(me?.me?.unit);
                  }
                }}
              >
                Болих
              </h1>
            </div>
          </div>
        </div>
      </div>
      {showOtp && (
        <InputBasedModal
          width={"400px"}
          height={"275px"}
          title="Дугаар баталгаажуулах"
          desc="Та шинэ утасны дугаар дээрээ хүлээж авсан 6 оронтой баталгаажуулах кодыг оруулж мэдээллээ шинэчилнэ үү."
          onClose={() => {
            setShowOtp(false);
            if (username && me?.me?.username !== username) {
              setShowPasswordInput("username confirm");
            }
          }}
          Component={
            <OtpInput
              inputStyle={classes.inputStyle}
              shouldAutoFocus
              focusStyle={classes.inputFocusStyle}
              value={otp}
              onChange={setOtp}
              isInputNum
              numInputs={6}
            />
          }
          onSubmit={() => {
            if (otp.length === 6) {
              changePhoneConfirm({ variables: { otp: otp } });
            } else toastError("ОТР буруу");
          }}
        />
      )}
      {showPasswordInput && (
        <InputBasedModal
          onClose={() => {
            setShowPasswordInput(false);
          }}
          title="Нууц үг"
          desc="Та мэдээллээ шинэчилэхийн тулд системд нэвтрэхэд ашигладаг нууц үгээ оруулна уу."
          height={"300px"}
          inputs={[{ title: "Нууц Үг", placeHolder: "Нууц Үг", inputType: "password" }]}
          onSubmit={(e) => {
            console.log(e[0].value);
            if (e[0].value)
              updateMe({
                variables: {
                  firstName: name,
                  lastName: lastname,
                  address: address,
                  city: city,
                  district: district,
                  // unit: unit,
                  // needed password
                  password: e[0].value,
                  newPassword: passwordAgain ? passwordAgain : undefined,
                  email: email ? email : undefined,
                  username: username ? username : undefined,
                  phone: phone ? phone : undefined,
                },
              });
          }}
        />
      )}
      <ToastifyBody />
    </>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  main: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: "0 auto",
    marginTop: 68,
    maxWidth: 1092,
    width: "90%",
    gap: 20,
  },
  userCard: {},
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: 772,
  },
  inputContainer: {
    width: 368,
    marginBottom: 36,
  },
  inputcontainerData: {
    width: "100%",
  },
  inputContainerTitle: {
    ...CSS_HELPER.initializeFont,
    marginBottom: 17,
  },
  userContainer: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    height: 64,
    marginBottom: 67,
  },
  avatarImage: {
    width: 64,
    height: 64,
    borderRadius: 11,
    marginRight: 21,
    objectFit: "cover",
  },
  userContainerTexts: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "7px 0",
  },

  userContainerTitle: {
    ...CSS_HELPER.initializeFont,
    fontSize: 21,
    fontWeight: 700,
  },
  userContainerText: {
    ...CSS_HELPER.initializeFont,
    color: "rgba(0,0,0,0.5)",
    fontWeight: 600,
  },
  buttons: {
    display: "flex",
    marginBottom: 47,
    width: "100%",
  },

  button: {
    ...CSS_HELPER.initializeFont,
    padding: "11px 12px",
    color: "white",
    backgroundColor: "#6A67D3",
    fontWeight: "normal",
    borderRadius: 7,
    marginRight: 7,
    cursor: "pointer",
    transition: "all 0.3s",
    "&:hover": {
      boxShadow: "0 0 5px rgba(0,0,0,0.3)",
    },
  },
  buttonLight: {
    ...CSS_HELPER.initializeFont,
    padding: "11px 12px",
    color: "rgba(0,0,0,0.5)",
    // backgroundColor: "",
    fontWeight: "normal",
    borderRadius: 7,
    marginRight: 7,
    cursor: "pointer",
    transition: "all 0.3s",
    boxShadow: "0 0 5px rgba(0,0,0,0)",
    "&:hover": {
      boxShadow: "0 0 5px rgba(0,0,0,0.3)",
    },
  },
  inputStyle: {
    width: 56,
    height: 64,
    borderRadius: 11,
    minWidth: 56,
    border: "none",
    marginRight: 12,
    marginLeft: 1,
    backgroundColor: "#0A0A0B03",
    outline: "none",
    ...CSS_HELPER.initializeFont,
    fontSize: 24,
    fontWeight: 800,
    userSelect: "none",
  },
  inputFocusStyle: {
    userSelect: "none",
    border: " 2px solid #6A67D3",
    boxSizing: "border-box",
  },
}));
