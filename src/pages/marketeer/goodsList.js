import React, { useEffect, useState, useContext } from 'react';
import PageAbout from '../../components/adminComponents/pageAbout';
import Appbar from '../../components/appbar/appbar';
import SubCard from '../../components/cards/subCard';
import { CSS_HELPER } from '../../constants/helper';
import { useMutation, useQuery } from '@apollo/client';
import {
  GET_LIST_OF_M_GOODS,
  UPDATE_MARKETEER_GOODS,
} from '../../graphql/gql/marketeerGoods/marketeerGoods';
import colors from '../../constants/colors';
import OptionsCore from '../../components/core/optionsCore';
import TheContext from '../../context/context';
import {
  Fade,
  Modal,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
  Container,
  Button,
  ButtonGroup,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Alert } from '@mui/lab';
import CustomDropdown from '../../components/customDropdown/customDropdown';
import ToggleCore from '../../components/core/toggleCore';

// Uildweriin baraanii torluud bolon une
export default function GoodsList() {
  const ContextHook = useContext(TheContext);
  const account = ContextHook?.account;
  const classes = useStyles();

  const [modal, setModal] = useState(false);
  const [option, setOption] = useState(0);

  const [chosenCategory, setChosenCategory] = useState({});
  const [chosenChild, setChosenChild] = useState({});
  const [willUpdate, setWillUpdate] = useState(false);

  const [selling, setSelling] = useState(true);
  const [special, setSpecial] = useState(false);
  const [marketeerPrice, setmarketeerPrice] = useState(0);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: 'Амжилттай илгээлээ',
    severity: 'success',
  });

  const { data, refetch } = useQuery(GET_LIST_OF_M_GOODS, {
    variables: { userId: account?._id },
    onCompleted(info) {
      console.log(info);
    },
    onError(e) {
      console.log(e);
    },
  });

  const handleAddMeat = (num, type) => {
    const meat = 999999;
    const marketMeat = 999999;

    if (type === 'field') {
      if (num <= marketMeat && num <= meat) setmarketeerPrice(num);
    } else {
      if (marketeerPrice < meat && marketeerPrice < marketMeat)
        setmarketeerPrice(marketeerPrice ? parseInt(marketeerPrice) + num : 0 + num);
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

  const [updateMarketeerGoods, { loading: updateLoading }] = useMutation(
    UPDATE_MARKETEER_GOODS,
    {
      onCompleted(data) {
        console.log(data);
        refetch();
        setModal(false);
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

  const handleModalClose = () => {
    setModal(false);
  };

  const handleupdateMarketeerGoods = () => {
    if (parseInt(marketeerPrice) < 1) {
      handleSnackOpen({
        state: true,
        msg: 'Барааны үнийн дүнгээ сонгоно уу',
        type: 'warning',
      });
    } else {
      console.log('hide tiny');
      console.log(selling);
      console.log(special);
      updateMarketeerGoods({
        variables: {
          _id: chosenChild._id,
          marketeerPrice: parseInt(marketeerPrice),
          active: selling,
          special: special,
        },
      });
    }
  };

  const setParentGoods = (id, child_id) => {
    const parent = data?.getListOfMGoods
      ?.map((item) => (item.parentCategoryId === id ? item : null))
      .filter((item) => item !== null);
    const child = parent[0]?.childCategories
      ?.map((item) => (item._id === child_id ? item : null))
      .filter((item) => item !== null);
    setChosenCategory(parent);
    setChosenChild(child);
  };

  const handleModal = (type) => {
    setWillUpdate(type);
    setTimeout(() => {
      setModal(true);
    });
  };

  useEffect(() => {
    if (chosenChild) {
      setSpecial(chosenChild.special);
      setSelling(chosenChild.active);
      setmarketeerPrice(parseInt(chosenChild.price));
    }
  }, [chosenChild, data]);

  return (
    <>
      <Appbar />
      {/* Snackbar */}
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
      {/* Modal */}
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={modal}
        onClose={() => handleModalClose()}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modal}>
          <Container disableGutters className={classes.paper}>
            {updateLoading ? (
              <CircularIndeterminate />
            ) : (
              <>
                <Container className={classes.fieldContainer}>
                  <PageAbout
                    title={'Бараа ' + (willUpdate ? 'Засах' : 'Нэмэх')}
                    desc={`Та дэд ангилал нэмэх гэж байна. 
                      Дэд Ангилал гэдэг нь махны төрлийг илэрхийлэх ангилал юм. 
                      Ангиллын нэрээ бичээд ширхэг эсвэл кг-аас 
                      сонгон үнээ оруулж хадгална уу.`}
                    marginLeft={0}
                    marginTop={30}
                  />
                  <Typography className={classes.label}>Үндсэн ангилал</Typography>
                  {willUpdate ? (
                    <CustomDropdown height={54} options={chosenCategory} />
                  ) : (
                    <CustomDropdown
                      height={54}
                      options={data?.getListOfMGoods}
                      onChange={(item) => setChosenCategory(item)}
                    />
                  )}
                  <Typography className={classes.label}>Дэд ангилал</Typography>
                  {willUpdate ? (
                    <Typography className={classes.dropDownReplacer}>
                      {chosenChild?.name}
                    </Typography>
                  ) : (
                    <CustomDropdown
                      height={54}
                      options={chosenCategory?.childCategories}
                      onChange={(item) => setChosenChild(item)}
                    />
                  )}
                  <div className={classes.flexFieldContainer}>
                    <div style={{ width: '45%' }}>
                      <Typography className={classes.label}>Барааны төлөв</Typography>
                      <ToggleCore
                        acceptValue={chosenChild?.special}
                        falseTitle={'Энгийн'}
                        onChange={setSpecial}
                        trueTitle={'Онцгой'}
                      />
                    </div>
                    <div style={{ width: '45%' }}>
                      <Typography className={classes.label}>
                        Худалдаалж буй төлөв
                      </Typography>
                      <ToggleCore
                        acceptValue={chosenChild?.active}
                        falseTitle={'Идвэхгүй'}
                        onChange={setSelling}
                        trueTitle={'Идвэхтэй'}
                      />
                    </div>
                  </div>
                  <div style={{ width: '50%' }}>
                    <Typography className={classes.label}>Махны үнэ</Typography>
                    <div className={classes.kilCounterContainer}>
                      <ButtonGroup
                        variant='contained'
                        aria-label='contained primary button group'
                        style={{ maxWidth: 200 }}
                      >
                        <Button
                          onClick={() =>
                            marketeerPrice > 0 && setmarketeerPrice(marketeerPrice - 1)
                          }
                        >
                          -
                        </Button>
                        <Button>
                          <TextField
                            size={'small'}
                            type={'number'}
                            onChange={(e) => handleAddMeat(e.target.value, 'field')}
                            value={marketeerPrice}
                          />
                        </Button>
                        <Button onClick={() => handleAddMeat(1)}>+</Button>
                      </ButtonGroup>
                    </div>
                  </div>
                </Container>
                <div className={classes.modalButtonContainer}>
                  <Button
                    onClick={() => setModal(false)}
                    className={classes.cancelButton}
                  >
                    Цуцлах
                  </Button>
                  <Button
                    onClick={() => handleupdateMarketeerGoods()}
                    className={classes.submitButton}
                  >
                    {willUpdate ? 'Засах' : 'Нэмэх'}
                  </Button>
                </div>
              </>
            )}
          </Container>
        </Fade>
      </Modal>
      <div className={classes.root}>
        <div className={classes.rootContainer}>
          <div className={classes.aboutPage}>
            <PageAbout
              title={'Бараа'}
              desc={`Үйлдвэрт байгаа бараа бүтээгдэхүүний нөөцийг энэ хэсэгт харуулж байна. Аль хэдийн үүссэн барааг цэгэн меню дээр нь дараад "Засах" сонголтыг сонгож засах боломжтой.`}
              marginBottom='0'
              descWidth={'600px'}
            />
          </div>
          <OptionsCore
            options={data?.getListOfMGoods?.map((item) => item.name)}
            marginBottom='46px'
            endButton={false}
            onChange={setOption}
          />
          <Body
            parentId={data?.getListOfMGoods[option]?._id}
            data={data?.getListOfMGoods[option]?.childCategories}
            refetch={refetch}
            setSubCategory={setChosenChild}
            setParent={setParentGoods}
            snack={() =>
              handleSnackOpen({
                state: true,
                msg: 'Амжилттай устгалаа',
                type: 'success',
              })
            }
            setModal={handleModal}
          />
        </div>
      </div>
    </>
  );
}

function Body({ parentId, setModal, data, setSubCategory, setParent }) {
  const classes = useStyles();
  const subCategories = data;

  if (!parentId || subCategories.length < 1) {
    return <h1>Бараа байхгүй</h1>;
  }

  return (
    <div className={classes.main}>
      {parentId !== null &&
        subCategories.length > 0 &&
        subCategories?.map((item, index) => (
          <SubCard
            key={index}
            name={item?.name}
            desc={item?.total}
            price={item?.price}
            type={item?.isUnit}
            isProduct
            options={[
              {
                title: 'Засах',
                onClick: () => {
                  setModal(true);
                  setParent(item?.parentId, item?._id);
                  setSubCategory(item);
                },
              },
            ]}
          />
        ))}
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
  aboutPage: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '46px',
  },
  dropDownReplacer: {
    borderRadius: 10,
    border: 'solid 1px rgba(0,0,0,0.1)',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.03)',
    paddingLeft: 15,
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    fontWeight: '500',
  },
  main: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '36px',
    justifyContent: 'flex-start',
  },
  text: {
    ...CSS_HELPER.initializeFont,
  },
  flexFieldContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  progress: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    marginTop: '30%',
    marginBottom: '30%',
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

function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.progress}>
      <CircularProgress />
    </div>
  );
}
