import React, { useState } from 'react';
import AddButton from '../../components/adminComponents/addButton';
import PageAbout from '../../components/adminComponents/pageAbout';
import Appbar from '../../components/appbar/appbar';
import SubCard from '../../components/cards/subCard';
import { CSS_HELPER } from '../../constants/helper';
import AddIcon from '../../assets/icons/add.svg';
import MainCard from '../../components/cards/mainCard';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import {
  Fade,
  Modal,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
  Container,
  Button,
  // ButtonGroup
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Alert } from '@mui/lab';
import colors from '../../constants/colors';
import CustomDropdown from '../../components/customDropdown/customDropdownArray';
import {
  CATEGORIES,
  DELETE_CATEGORY,
  UPDATE_CATEGORY_WITH_IMAGE,
  CREATE_CATEGORY_WITH_IMAGE,
  DELETE_FROM_GOODS_IMG,
} from '../../graphql/gql/category/category';
import UploadButton from '../../components/custom/uploadButton';

// Uildweriin baraanii torluud bolon une
export default function CategoryList() {
  const classes = useStyles();
  const history = useHistory();

  const [modal, setModal] = useState({
    state: false,
    type: 'create',
  });
  const [delModal, setDelModal] = useState({
    state: false,
    data: null,
  });
  const [categoryInfo, setCategoryInfo] = useState({});
  const [fieldState, setFieldState] = useState({
    value: '',
    isUnit: false,
    price: 5000,
    desc: '',
    error: {
      name: false,
      desc: false,
      price: false,
      image: false,
      goodsImg: false,
    },
    image: '',
    goodsImg: [],
  });
  const [imgReplacer, setImgreplacer] = useState();
  const [goodsImgReplacer, setGoodsImgReplacer] = useState([]);
  // const [meatAmount, setMeatAmount] = useState(categoryInfo?.total ? categoryInfo.total : 0);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: 'Амжилттай илгээлээ',
    severity: 'success',
  });

  // const handleAddMeat = (num, type) => {
  //   const meat = 999
  //   const marketMeat = 999

  //   if (type === "field") {
  //     if (num <= marketMeat && num <= meat) setMeatAmount(num)
  //   } else {
  //     if (meatAmount < meat && meatAmount < marketMeat)
  //       setMeatAmount(meatAmount ? parseInt(meatAmount) + num : 0 + num)
  //   }
  // }

  const parentId = useParams().id;
  const { data, loading, refetch } = useQuery(CATEGORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { parentId: parentId ?? null },
    onCompleted(data) {
      console.log(data);
    },
    onError(err) {
      console.log(err);
    },
  });

  const [deleteCategories, { loading: deleteLoading }] = useMutation(DELETE_CATEGORY, {
    onCompleted(data) {
      console.log(data);
      handleSnackOpen({
        state: true,
        msg: 'Амжилттай устгалаа',
        type: 'success',
      });
      if (parentId) {
        refetch();
      } else
        setTimeout(() => {
          history.push('/operator/category-list');
        }, 500);
    },
    onError(e) {
      console.log(e);
      handleSnackOpen({
        state: true,
        msg: 'Амжилтгүй боллоо',
        type: 'warning',
      });
    },
  });

  const [deleteFromGoodsImg, { loading: deleteFromGoodsImgLoading }] = useMutation(
    DELETE_FROM_GOODS_IMG,
    {
      onCompleted(data) {
        console.log(data);
        handleSnackOpen({
          state: true,
          msg: 'Амжилттай устгалаа',
          type: 'success',
        });
        setDelModal({
          state: false,
          data: null,
        });
        refetch();
      },
      onError(e) {
        console.log(e);
        handleSnackOpen({
          state: true,
          msg: 'Амжилтгүй боллоо',
          type: 'warning',
        });
      },
    }
  );

  const [createCategoryWithImg, { loading: createLoading }] = useMutation(
    CREATE_CATEGORY_WITH_IMAGE,
    {
      onCompleted(data) {
        console.log(data);
        refetch();
        setModal({
          ...modal,
          state: false,
        });
        handleSnackOpen({
          state: true,
          msg: 'Амжилттай үүсгэлээ',
          type: 'success',
        });
      },
      onError(e) {
        console.log(e);
        handleSnackOpen({
          state: true,
          msg: 'Амжилтгүй боллоо',
          type: 'warning',
        });
      },
    }
  );

  const [updateCategory, { loading: updateLoading }] = useMutation(
    UPDATE_CATEGORY_WITH_IMAGE,
    {
      onCompleted(data) {
        console.log(data);
        refetch();
        setModal({
          ...modal,
          state: false,
        });
        handleSnackOpen({
          state: true,
          msg: 'Амжилттай шинэчиллээ',
          type: 'success',
        });
      },
      onError(e) {
        console.log(e);
        handleSnackOpen({
          state: true,
          msg: 'Амжилтгүй боллоо',
          type: 'warning',
        });
      },
    }
  );

  const onImgAdd = ({ target: { validity, files } }) => {
    if (validity.valid) {
      if (files[0].size < 5000000) {
        console.log('file size');
        console.log(files[0].size);
        let _URL = window.URL ? window.URL : window.webkitURL;
        let urlAddress = _URL.createObjectURL(files[0]);
        setImgreplacer(urlAddress);

        setFieldState({
          ...fieldState,
          image: files[0],
          error: {
            ...fieldState.error,
            image: false,
          },
        });
      } else {
        handleSnackOpen({
          state: true,
          msg: 'Файлын багтаамж 5mb ээс ихгүй байна.',
          type: 'warning',
        });
      }
    } else {
      handleSnackOpen({
        state: true,
        msg: 'Файлын төрөл буруу байна.',
        type: 'warning',
      });
    }
  };

  const onGoodsImgAdd = ({ target: { validity, files } }) => {
    if (validity.valid) {
      console.log(files[0].size);
      if (files[0].size < 5000000) {
        let _URL = window.URL ? window.URL : window.webkitURL;
        let urlAddress = _URL.createObjectURL(files[0]);
        setGoodsImgReplacer(
          goodsImgReplacer.concat({ file: files[0], path: urlAddress })
        );
        setFieldState({
          ...fieldState,
          goodsImg: fieldState?.goodsImg
            ? fieldState.goodsImg?.concat(files[0])
            : [files[0]],
          error: {
            ...fieldState.error,
            goodsImg: false,
          },
        });
      } else {
        handleSnackOpen({
          state: true,
          msg: 'Файлын багтаамж 5mb ээс ихгүй байна.',
          type: 'warning',
        });
      }
    } else {
      handleSnackOpen({
        state: true,
        msg: 'Файлын төрөл буруу байна.',
        type: 'warning',
      });
    }
  };

  const handleSnackOpen = ({ state, msg, type }) => {
    setSnackbarState({
      open: state,
      message: msg,
      severity: type,
    });
  };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarState({ ...snackbarState, open: false });
  };

  const handleTextFieldChange = (text, type) => {
    if (type === 'price') {
      setFieldState({
        ...fieldState,
        price: text,
        error: {
          ...fieldState.error,
          price: fieldValidator(text),
        },
      });
    }
    if (type === 'desc') {
      setFieldState({
        ...fieldState,
        desc: text,
        error: {
          ...fieldState.error,
          desc: fieldValidator(text),
        },
      });
    }
    if (type === 'name') {
      setFieldState({
        ...fieldState,
        value: text,
        error: {
          ...fieldState.error,
          name: fieldValidator(text),
        },
      });
    }
  };

  const fieldValidator = (text) => {
    return text.toString().length > 1 ? false : true;
  };

  const handleSubmit = () => {
    if (
      fieldState.error.name === false &&
      fieldState.error.desc === false &&
      fieldState.error.image === false &&
      fieldState.error.price === false &&
      fieldState.error.goodsImg === false
    ) {
      console.log(fieldState.image);
      if (fieldState.image.length < 1) {
        setFieldState({
          ...fieldState,
          error: {
            ...fieldState.error,
            image: true,
          },
        });
        handleSnackOpen({
          state: true,
          msg: 'Мэдээллээ гүйцээнэ үү.',
          type: 'warning',
        });
      } else {
        const apt = typeof fieldState.image !== 'string' && {
          image: fieldState.image,
        };
        const imgs = (fieldstate) => {
          if (fieldstate?.goodsImg?.length > 0) {
            let dd = fieldState?.goodsImg?.filter((tt) => tt.file == null || undefined);
            if (dd.length > 0) return { goodsImg: dd };
            else return null;
          }
        };
        if (parentId) {
          if (modal.type === 'update') {
            console.log('update!!!!!!!');
            console.log(modal.type);
            updateCategory({
              variables: {
                _id: categoryInfo._id,
                price: parseInt(fieldState.price),
                name: fieldState.value,
                isUnit: fieldState.isUnit,
                parentId: parentId,
                description: fieldState.desc,
                ...apt,
                ...imgs(fieldState),
              },
            });
          } else if (modal.type === 'create') {
            console.log('create1!!!!!!!');
            console.log(modal.type);
            createCategoryWithImg({
              variables: {
                parentId: parentId,
                name: fieldState.value,
                isUnit: fieldState.isUnit,
                description: fieldState.desc,
                // total: parseInt(meatAmount),
                active: false,
                price: parseInt(fieldState.price),
                image: fieldState.image,
                goodsImg: fieldState.goodsImg.length > 0 ? fieldState.goodsImg : null,
              },
            });
          }
        } else {
          console.log('no fucking parentID!!!!!!!');
          console.log(modal.type);
          if (modal.type === 'update') {
            console.log('update parent !!!!!!!');
            console.log(modal.type);
            updateCategory({
              variables: {
                _id: categoryInfo._id,
                active: true,
                name: fieldState.value,
                isUnit: fieldState.isUnit,
                description: fieldState.desc,
                image: fieldState.image,
                goodsImg: fieldState.goodsImg.length > 0 ? fieldState.goodsImg : null,
              },
            });
          } else if (modal.type === 'create') {
            console.log('create parent !!!!!!!');
            console.log(modal.type);
            createCategoryWithImg({
              variables: {
                name: fieldState.value,
                isUnit: fieldState.isUnit,
                description: fieldState.desc,
                active: true,
                image: fieldState.image,
                goodsImg: fieldState.goodsImg.length > 0 ? fieldState.goodsImg : null,
              },
            });
          }
        }
        refetch();
      }
    } else {
      handleSnackOpen({
        state: true,
        msg: 'Мэдээллээ гүйцээнэ үү.',
        type: 'warning',
      });
    }
  };

  const handleCardPress = (category, type) => {
    setCategoryInfo(category);
    if (type === 'update') {
      let formatted = category?.goodsImg?.map((item) => {
        return {
          file: item,
          path: item.path,
        };
      });
      setImgreplacer(category?.categoryImg?.path);
      setGoodsImgReplacer(formatted);
      setFieldState({
        value: category?.name,
        isUnit: category?.isUnit,
        price: category?.price,
        desc: category?.description,
        error: {
          name: false,
          desc: false,
          price: false,
          image: false,
          goodsImg: false,
        },
        image: category?.categoryImg?.path,
        goodsImg: formatted,
      });
    } else {
      setImgreplacer(null);
      setGoodsImgReplacer([]);
      setFieldState({
        value: '',
        isUnit: false,
        price: 5000,
        desc: '',
        error: {
          name: false,
          desc: false,
          price: false,
          image: false,
          goodsImg: false,
        },
        image: '',
        goodsImg: [],
      });
    }
    setModal({
      state: true,
      type: type,
    });
  };

  const handleModalClose = () => {
    if (!categoryInfo?.categoryImg) setImgreplacer(null);
    setFieldState({
      value: '',
      isUnit: false,
      price: 5000,
      desc: '',
      goodsImg: [],
      image: '',
      error: {
        name: false,
        desc: false,
        price: false,
        image: false,
        goodsImg: false,
      },
    });
    setModal({
      ...modal,
      state: false,
    });
  };

  const deleteImgFromGoodsImg = (categoryId, imgId) => {
    deleteFromGoodsImg({
      variables: {
        categoryId: categoryId,
        imgId: imgId,
      },
    });
  };

  const removeFromGoodsImg = (item) => {
    deleteImgFromGoodsImg(categoryInfo?._id, item?.file?._id);
    let test = fieldState.goodsImg;
    let tenet = test.filter((el) => el.file !== item.file);
    setFieldState({
      ...fieldState,
      goodsImg: tenet,
    });

    const filtered = goodsImgReplacer.filter((thing) => thing.path !== item.path);
    setGoodsImgReplacer(filtered);
  };

  const handleImgDeleteModal = () => {
    removeFromGoodsImg(delModal.data);
  };

  return (
    <>
      <Appbar />
      {/* Snackbar notification */}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={snackbarState.open}
        autoHideDuration={5000}
        onClose={handleSnackClose}
      >
        <Alert
          onClose={handleSnackClose}
          severity={snackbarState.severity}
          sx={{ width: '100%' }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
      {/* Delete image modal */}
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={delModal.state}
        onClose={() => setDelModal(false)}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={delModal.state}>
          <Container disableGutters className={classes.paper}>
            {deleteFromGoodsImgLoading ? (
              <CircularIndeterminate />
            ) : (
              <>
                <Container className={classes.fieldContainer}>
                  <PageAbout
                    title={'Ангилал устгах'}
                    desc={`Та уг ангиллын зургийг устгахдаа итгэлтэй байна уу? 
                        Дахин сэргээх боломжгүйг анхаарна уу.`}
                    marginLeft={0}
                    marginTop={30}
                  />
                </Container>
                <div className={classes.modalButtonContainer}>
                  <Button
                    onClick={() => setDelModal({ ...delModal, state: false })}
                    className={classes.cancelButton}
                  >
                    Цуцлах
                  </Button>
                  <Button
                    onClick={() => handleImgDeleteModal()}
                    className={classes.submitButton}
                  >
                    Устгах
                  </Button>
                </div>
              </>
            )}
          </Container>
        </Fade>
      </Modal>
      {/* Update or create modal */}
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={modal.state}
        onClose={() => handleModalClose()}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modal.state}>
          <Container disableGutters className={classes.paper}>
            {updateLoading || createLoading || deleteLoading ? (
              <CircularIndeterminate />
            ) : parentId ? (
              // IF CHILD CATEGORY
              <Container className={classes.fieldContainer}>
                <PageAbout
                  title={
                    modal?.type === 'update'
                      ? 'Дэд Ангилал шинэчлэх'
                      : 'Дэд Ангилал Нэмэх'
                  }
                  desc={`Та дэд ангилал ${
                    modal?.type === 'update' ? 'шинэчлэх' : 'нэмэх'
                  } гэж байна. 
                      Дэд Ангилал гэдэг нь махны төрлийг илэрхийлэх ангилал юм. 
                      Ангиллын нэрээ бичээд ширхэг эсвэл кг-аас 
                      сонгон үнээ оруулж хадгална уу.`}
                  marginLeft={0}
                  marginTop={30}
                />
                <Typography className={classes.label}>Ангиллын нэр</Typography>
                <TextField
                  name={'Category name'}
                  label={'Ангиллын нэр'}
                  variant={'outlined'}
                  type={'text'}
                  placeholder={'Үхэр'}
                  onChange={(e) => handleTextFieldChange(e.target.value, 'name')}
                  onBlur={(e) => handleTextFieldChange(e.target.value, 'name')}
                  className={classes.textField}
                  error={fieldState.error.name}
                  helperText={fieldState.error.name && 'Заавал оруулна.'}
                  value={fieldState.value}
                />
                <Typography className={classes.label}>Ангиллын тайлбар</Typography>
                <TextField
                  name={'Category name'}
                  label={'Ангиллын тайлбар'}
                  variant={'outlined'}
                  type={'text'}
                  placeholder={'Төв аймагт боловсруулсан шинэхэн үхэрийн мах...'}
                  onChange={(e) => handleTextFieldChange(e.target.value, 'desc')}
                  onBlur={(e) => handleTextFieldChange(e.target.value, 'desc')}
                  className={classes.textField}
                  error={fieldState.error.desc}
                  multiline
                  maxRows={3}
                  helperText={fieldState.error.desc && 'Заавал оруулна.'}
                  value={fieldState.desc}
                />
                <div className={classes.flexFieldContainer}>
                  <div style={{ width: '47%' }}>
                    <Typography className={classes.label}>
                      Кг/ширхэг тутмын үнэ
                    </Typography>
                    <TextField
                      name={'Category price'}
                      label={'Ангиллын үнэ'}
                      variant={'outlined'}
                      type={'number'}
                      placeholder={'5000₮'}
                      onChange={(e) => handleTextFieldChange(e.target.value, 'price')}
                      onBlur={(e) => handleTextFieldChange(e.target.value, 'price')}
                      className={classes.textField}
                      error={fieldState.error.price}
                      helperText={fieldState.error.price && 'Заавал оруулна.'}
                      value={fieldState.price}
                    />
                  </div>
                  <div style={{ width: '50%' }}>
                    <Typography className={classes.label}>
                      Бүтээгдэхүүн ширхэглэх эсэх
                    </Typography>
                    <CustomDropdown
                      height={54}
                      options={['КГ- аар хэллэх', 'Ширхэглэх']}
                      onChange={(item) =>
                        setFieldState({
                          ...fieldState,
                          isUnit: item === 'Ширхэглэх',
                        })
                      }
                    />
                  </div>
                </div>
                <div className={classes.flexFieldContainer}>
                  {/* Category img */}
                  <div>
                    <Typography className={classes.label}>
                      Ангиллын үндсэн зураг
                    </Typography>
                    <div>
                      <UploadButton onChange={onImgAdd} />
                      {fieldState?.error?.image && (
                        <p style={{ color: 'red' }}>Заавал оруулна.</p>
                      )}
                    </div>
                  </div>
                  {/* Category img to see*/}
                  <div style={{ width: '50%' }}>
                    {categoryInfo?.categoryImg || imgReplacer ? (
                      <div>
                        <Typography className={classes.label}>Ангиллын зураг</Typography>
                        <img
                          style={{
                            width: '60%',
                            height: 'auto',
                            padding: 10,
                            border: '1px solid lightgray',
                            borderRadius: 10,
                          }}
                          src={imgReplacer}
                          alt={'category'}
                        />
                      </div>
                    ) : null}
                  </div>
                  {/* <div style={{width: '50%'}}>
                    <Typography className={classes.label}>
                      Махны хэмжээ
                    </Typography>
                    <div className={classes.kilCounterContainer}>
                      <ButtonGroup variant="contained" aria-label="contained primary button group" style={{maxWidth: 200}}>
                        <Button onClick={() => meatAmount > 0 && setMeatAmount(meatAmount - 1)}>-</Button>
                        <Button>
                          <TextField
                            size={"small"}
                            type={"number"}
                            onChange={(e) => handleAddMeat(e.target.value, "field")}
                            value={meatAmount}
                          />
                        </Button>
                        <Button onClick={() => handleAddMeat(1)}>+</Button>
                      </ButtonGroup>
                    </div>
                  </div> */}
                </div>
                {/* Goods imgs */}
                <div className={classes.flexFieldContainer}>
                  {/* Goods imgs */}
                  <div style={{ width: '100%' }}>
                    <Typography className={classes.label}>
                      Ангиллын дэлгэрэнгүй зурагнууд
                    </Typography>
                    {/* <Typography style={{ fontSize: 14 }}>Барааны зураг</Typography> */}
                    {goodsImgReplacer?.length > 0 &&
                      goodsImgReplacer?.map((item, index) => (
                        <img
                          key={index + 'img'}
                          className={classes.goodsImgItem}
                          src={item?.path}
                          alt={'goodsImg'}
                          onClick={() => setDelModal({ state: true, data: item })}
                        />
                      ))}
                  </div>
                  <UploadButton second onChange={onGoodsImgAdd} />
                </div>
              </Container>
            ) : (
              // IF PARENT CATEGORY
              <Container className={classes.fieldContainer}>
                <PageAbout
                  title={`Үндсэн Ангилал ${
                    modal?.type === 'update' ? ' Шинэчлэх' : ' Нэмэх'
                  }`}
                  desc={`Та үндсэн ангилал ${
                    modal?.type === 'update' ? ' шинэчлэх' : ' нэмэх'
                  } 
                      гэж байна. Үндсэн Ангилал гэдэг нь мал амьтны 
                      төрлийг илэрхийлэх ангилал юм.`}
                  marginLeft={0}
                  marginTop={30}
                />
                {/* Category name */}
                <Typography className={classes.label}>Ангиллын нэр</Typography>
                <TextField
                  name={'Category name'}
                  label={'Ангиллын нэр'}
                  variant={'outlined'}
                  type={'text'}
                  placeholder={'Үхэр'}
                  onChange={(e) => handleTextFieldChange(e.target.value, 'name')}
                  onBlur={(e) => handleTextFieldChange(e.target.value, 'name')}
                  className={classes.textField}
                  error={fieldState.error.name}
                  helperText={fieldState.error.name && 'Заавал оруулна.'}
                  value={fieldState.value}
                />
                {/* Category description */}
                <Typography className={classes.label}>Ангиллын тайлбар</Typography>
                <TextField
                  name={'Category name'}
                  label={'Ангиллын тайлбар'}
                  variant={'outlined'}
                  type={'text'}
                  placeholder={'Төв аймагт боловсруулсан шинэхэн үхэрийн мах...'}
                  onChange={(e) => handleTextFieldChange(e.target.value, 'desc')}
                  onBlur={(e) => handleTextFieldChange(e.target.value, 'desc')}
                  className={classes.textField}
                  error={fieldState.error.desc}
                  multiline
                  maxRows={3}
                  helperText={fieldState.error.desc && 'Заавал оруулна.'}
                  value={fieldState.desc}
                />
                {/* Category Img */}
                <div className={classes.flexFieldContainer}>
                  <div>
                    <Typography className={classes.label}>Ангиллын зураг</Typography>
                    <TextField
                      name={'Category image'}
                      variant={'outlined'}
                      type={'file'}
                      onChange={onImgAdd}
                      className={classes.textFieldImage}
                      error={fieldState.error.image}
                      helperText={fieldState.error.image && 'Заавал оруулна.'}
                    />
                  </div>
                  <div style={{ width: '50%' }}>
                    {categoryInfo?.categoryImg && (
                      <div>
                        <Typography className={classes.label}>Ангиллын зураг</Typography>
                        <img
                          style={{
                            width: '90%',
                            height: 'auto',
                            padding: 10,
                            border: '1px solid lightgray',
                            borderRadius: 10,
                          }}
                          src={categoryInfo?.categoryImg.path}
                          alt={'category'}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Container>
            )}
            <div className={classes.modalButtonContainer}>
              <Button
                onClick={() =>
                  setModal({
                    ...modal,
                    state: false,
                  })
                }
                className={classes.cancelButton}
              >
                Цуцлах
              </Button>
              <Button onClick={() => handleSubmit()} className={classes.submitButton}>
                {modal?.type === 'update' ? ' Шинэчлэх' : ' Нэмэх'}
              </Button>
            </div>
          </Container>
        </Fade>
      </Modal>
      <div className={classes.root}>
        <div className={classes.rootContainer}>
          <div className={classes.aboutPage}>
            <PageAbout
              title={!parentId ? 'Үндсэн Ангилал' : 'Дэд Ангилал'}
              desc={
                !parentId
                  ? `Үндсэн Ангилал гэдэг нь мал амьтны төрлийг илэрхийлэх ангилал юм. Жишээ нь, хонь эсвэл үхэр гэх мэт. Ангилал дээр дарж доторх дэд ангиллуудыг харах боломжтой. Түүнчлэн "+Ангилал Нэмэх" товчлуур дээр дарж шинэ үндсэн ангилал үүсгэнэ. Ангилал дээрх гурван цэгтэй меню-г дарж ангилал устгах болон засах үйлдлүүдийг хийж болно.`
                  : 'Дэд Ангилал гэдэг нь махны төрлийг илэрхийлэх ангилал юм. Жишээ нь, цул эсвэл ястай гэх мэт. "+Ангилал Нэмэх" товчлуур дээр дарж шинэ дэд ангилал үүсгэнэ. Ангилал дээрх гурван цэгтэй меню-г дарж ангилал устгах болон засах үйлдлүүдийг хийж болно.'
              }
              marginBottom='0'
              descWidth={'600px'}
            />
            <AddButton
              icon={AddIcon}
              title='Ангилал нэмэх'
              marginLeft='40px'
              onClick={() => handleCardPress(null, 'create')}
            />
          </div>
          <div className={classes.main}>
            {loading || updateLoading || createLoading || deleteLoading ? (
              <div style={{ width: '100%', height: 100 }}>
                <CircularIndeterminate />
              </div>
            ) : data?.categories.length < 1 ? (
              <Typography>Илэрц байхгүй байна.</Typography>
            ) : (
              data?.categories.map((item, index) =>
                parentId ? (
                  <SubCard
                    key={index}
                    name={item.name}
                    desc={item.price}
                    type={item.isUnit}
                    options={[
                      {
                        title: 'Засах',
                        onClick: () => handleCardPress(item, 'update'),
                      },
                      {
                        title: 'Устгах',
                        onClick: () => deleteCategories({ variables: { _id: item._id } }),
                      },
                    ]}
                  />
                ) : (
                  <MainCard
                    key={index}
                    name={item.name}
                    desc={`${item.subCategories} Дэд ангилал`}
                    onClick={() => history.push({ pathname: '/category/' + item._id })}
                    options={[
                      {
                        title: 'Засах',
                        onClick: () => handleCardPress(item, 'update'),
                      },
                      {
                        title: 'Устгах',
                        onClick: () => deleteCategories({ variables: { _id: item._id } }),
                      },
                    ]}
                  />
                )
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.progress}>
      <CircularProgress />
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    margin: '0 5%',
    minWidth: 'min-content',
  },
  rootContainer: {
    width: '90%',
    maxWidth: '1280px',
    margin: '0 auto',
    minWidth: 'min-content',
  },
  flexFieldContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  aboutPage: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '46px',
  },
  main: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '26px',
    justifyContent: 'flex-start',
  },
  text: {
    ...CSS_HELPER.initializeFont,
  },
  goodsImgItem: {
    width: '28%',
    height: '88px',
    padding: 10,
    border: '1px solid lightgray',
    borderRadius: 10,
    marginRight: 10,
    '&:hover': {
      filter: 'blur(1px)',
      cursor: 'pointer',
    },
  },
  progress: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '50%',
    marginTop: '20%',
    marginBottom: '20%',
  },
  paper: {
    maxHeight: '70%',
    width: '100%',
    maxWidth: '700px',
    backgroundColor: 'white',
    border: 'none',
    boxShadow:
      '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
    borderRadius: 10,
    overflow: 'auto',
    outline: 'none',
    '& .MuiFormLabel-root': {
      fontSize: 14,
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 11,
      fontSize: 14,
      backgroundColor: colors.lightGray,
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10%',
    marginLeft: '10%',
    outline: 'none',
    border: 'none',
  },
  fieldContainer: {
    marginBottom: 50,
  },
  label: {
    marginTop: 20,
    paddingBottom: 17,
    textAlign: 'left',
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    fontWeight: '600',
  },
  textField: {
    width: '100%',
    marginBottom: '10px',
  },
  textFieldImage: {
    marginBottom: '20px',
    cursor: 'pointer',
  },
  modalButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: '100%',
    position: 'sticky',
    zIndex: 50,
    bottom: 0,
    backgroundColor: 'white',
    boxShadow: '0px -10px 5px #ededed',
    paddingTop: 20,
    paddingBottom: 20,
  },
  cancelButton: {
    backgroundColor: 'white',
    color: 'gray',
    borderRadius: 11,
    paddingRight: 20,
    paddingLeft: 20,
    textTransform: 'none',
    textDecoration: 'none',
    fontSize: 14,
    font: 'SF Pro Display',
    fontWeight: 'normal',
    '&:hover': {
      backgroundColor: 'blue',
      color: 'white',
    },
  },
  submitButton: {
    backgroundColor: colors.lightPurple,
    marginRight: 20,
    marginLeft: 10,
    color: 'white',
    borderRadius: 11,
    paddingRight: 20,
    paddingLeft: 20,
    textTransform: 'none',
    textDecoration: 'none',
    fontSize: 14,
    font: 'SF Pro Display',
    fontWeight: 'normal',
    '&:hover': {
      backgroundColor: 'blue',
    },
  },
  kilCounterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
}));

// const [mutate, { data: uploadData, loading: uploadLoading }] = useMutation(SINGLE_UPLOAD, {
//   onError(e) {
//     console.log(e)
//   },
//   onCompleted(data) {
//     console.log(data)
//   }
// });

// function onChange({ target: { validity, files } }) {
//   if (validity.valid) {
//     console.log(files)
//     mutate({ variables: { file: files[0] } })
//   };
// }
