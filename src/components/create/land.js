import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import { DropzoneAreaBase } from 'material-ui-dropzone';
import TextField from '@material-ui/core/TextField';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { base_url } from '../../constants/url';
import { Alert } from '@mui/lab';
import { Snackbar } from '@mui/material';
import './create.css';

export default function Land(props) {
  const classes = useStyles(props);
  const [isLoading, setisLoading] = useState(false);
  const category = [3];
  const [title, settitle] = useState('');
  const [district, setdistrict] = useState('');
  const [land_area, setland_area] = useState('');
  const [address, setaddress] = useState('');
  const [price, setprice] = useState('');
  const [priceSymbol, setpriceSymbol] = useState('₮');
  const [description, setdescription] = useState('');
  const token = localStorage.getItem('jamukh_token');
  const districts = [
    'Багануур',
    'Багахангай',
    'Баянгол',
    'Баянзүрх',
    'Налайх',
    'Сонгино Хайрхан',
    'Сүхбаатар',
    'Хан-уул',
    'Чингэлтэй',
    'Орон нутаг',
  ];
  const [files, setFiles] = useState([]);

  const handleAdd = (newFiles) => {
    newFiles = newFiles.filter((file) => !files.find((f) => f.data === file.data));
    setFiles([...files, ...newFiles]);
    console.log(files, 'files');
  };

  const handleDelete = (deleted) => {
    setFiles(files.filter((f) => f !== deleted));
  };

  //Snack

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: 'Амжилттай илгээлээ',
    severity: 'success',
  });
  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarState({ ...snackbarState, open: false });
  };

  const handleSnackOpen = ({ state, msg, type }) => {
    setSnackbarState({
      open: state,
      message: msg,
      severity: type,
    });
  };

  // file upload

  const formDataUpdateAds = () => {
    setisLoading(true);
    if (
      land_area === '' ||
      district === '' ||
      address === '' ||
      price === '' ||
      description === '' ||
      files.length === 0
    ) {
      handleSnackOpen({
        state: true,
        msg: 'Аль нэг талбар дутуу байна',
        type: 'error',
      });
      setisLoading(false);
    } else {
      const info = {
        'title': title,
        'category': category,
        'description': description,
        'price': price,
        'currency_symbol': priceSymbol,
        'ads_info': [
          { 'label': 'Талбай', 'value': land_area },
          { 'label': 'Дүүрэг', 'value': district },
          { 'label': 'Байршил', 'value': address },
        ],
      };
      return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        let formData = new FormData();
        if (files !== undefined && files !== null) {
          files.forEach((item) => {
            formData.append('file', item.file);
          });
        }
        formData.append('info', JSON.stringify(info));

        req.open('POST', `${base_url}/ads/create-ad`);
        req.setRequestHeader('Authorization', `Bearer ${token}`);

        try {
          req.send(formData);
          req.onreadystatechange = function () {
            if (req.readyState === 4) {
              if (req.status === 200 || req.status === 202) {
                const res = JSON.parse(req.response);
                resolve(res);
                setisLoading(false);
                handleSnackOpen({
                  state: true,
                  msg: 'Зар амжилтай орлоо',
                  type: 'success',
                });
              } else {
                setisLoading(false);
                handleSnackOpen({
                  state: true,
                  msg: 'Зар оруулахад алдаа гарлаа',
                  type: 'warning',
                });
                return reject(req.statusText);
              }
            }
          };
        } catch (e) {
          handleSnackOpen({
            state: true,
            msg: 'Зар оруулахад алдаа гарлаа',
            type: 'warning',
          });
          setisLoading(false);
          return reject(e);
        }
      });
    }
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
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
      <div className={classes.row}>
        <div className={classes.width30L}>Гарчиг</div>
        <div className={classes.width40}>
          <InputBase
            type='text'
            value={title}
            className={classes.textfields}
            onChange={(e) => settitle(e.target.value)}
            placeholder={'Гарчиг'}
          />
        </div>
        <div className={classes.width30R}></div>
      </div>
      {/* //district */}

      <div className={classes.row}>
        <div className={classes.width30L}>Дүүрэг</div>
        <div className={classes.width40}>
          <FormControl fullWidth className={classes.level}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              variant='outlined'
              className={classes.select}
              value={district || 'a'}
              inputProps={{
                classes: {
                  root: classes.border,
                  icon: classes.icon,
                },
              }}
              renderValue={
                district !== ''
                  ? undefined
                  : () => <div className={classes.placeHolderLevel}>Сонгох</div>
              }
              onChange={(e) => {
                setdistrict(e.target.value);
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    color: '#C19D65',
                    fontWeight: '100',
                  },
                },
              }}
              itemProp={{
                style: {
                  color: 'red',
                },
              }}
            >
              {districts?.map((district) => (
                <MenuItem value={district} key={district}>
                  {district}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={classes.width30R}></div>
      </div>

      {/* //address*/}

      <div className={classes.row}>
        <div className={classes.width30L}>Байршил</div>
        <div className={classes.width40}>
          <InputBase
            type='text'
            value={address}
            className={classes.textfields}
            onChange={(e) => setaddress(e.target.value)}
            placeholder={'Байршил'}
          />
        </div>
        <div className={classes.width30R}></div>
      </div>
      {/* //land_area */}

      <div className={classes.row}>
        <div className={classes.width30L}>Талбай м2</div>
        <div className={classes.width40}>
          <InputBase
            type='text'
            value={land_area}
            className={classes.textfields}
            onChange={(e) => setland_area(e.target.value)}
            placeholder={'Талбай'}
          />
        </div>
        <div className={classes.width30R}></div>
      </div>
      {/* //imageUpload*/}

      <div className={classes.row}>
        <div className={classes.width30L}>Зураг</div>
        <div className={classes.width40}>
          <DropzoneAreaBase
            fileObjects={files}
            onAdd={handleAdd}
            Icon={AddPhotoAlternateIcon}
            dropzoneText='Энд дарж зурагаа оруулно уу'
            onDelete={handleDelete}
            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
            maxFileSize={5000000}
            filesLimit={4}
          />
        </div>
        <div className={classes.width30R}>
          Их зураг оруулах бол ctrl товчлуурыг дарж зургаа сонгон оруулна. Файлын хэмжээ
          нь 5 Мб, формат .jpg, .jpeg, .png, .gif байна. Тайлбар: Зурганд холбогдох утасны
          дугаар болон хаяг оруулахгүй байхыг анхаарна уу!
        </div>
      </div>

      {/* //Price*/}

      <div className={classes.row}>
        <div className={classes.width30L}>Үнэ</div>
        <div className={classes.width40}>
          <InputBase
            type='number'
            value={price}
            className={classes.textfields}
            onChange={(e) => setprice(e.target.value)}
            placeholder={'Үнэ'}
          />
          <FormControl fullWidth className={classes.priceSymbol}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              variant='outlined'
              value={priceSymbol}
              className={classes.price}
              inputProps={{
                classes: {
                  root: classes.border,
                  icon: classes.icon,
                },
              }}
              onChange={(e) => {
                setpriceSymbol(e.target.value);
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    color: '#C19D65',
                    fontWeight: '100',
                  },
                },
              }}
              itemProp={{
                style: {
                  color: 'red',
                },
              }}
            >
              <MenuItem value='₮'>₮</MenuItem>
              <MenuItem value='$'>$</MenuItem>
              <MenuItem value='€'>€</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.width30R}>
          Үнийн дүнг бүх тэгтэй нь оруулна уу. Жишээ нь: 12 саяыг 12000000 гэж оруулна уу.
        </div>
      </div>

      {/* //Send*/}

      <div className={classes.row}>
        <div className={classes.width30L}>Тайлбар</div>
        <div className={classes.width40}>
          <TextField
            multiline={true}
            name='Description'
            rows={8}
            autoComplete='off'
            variant='outlined'
            className={classes.textArea}
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          />
        </div>
        <div className={classes.width30R}></div>
      </div>

      {/* //Send*/}

      <div className={classes.row}>
        <div className={classes.width30L}></div>
        <div className={classes.width40}>
          {isLoading === false ? (
            <div
              className={classes.button}
              onClick={() => {
                formDataUpdateAds();
              }}
            >
              Зар нэмэх
            </div>
          ) : (
            <div className={classes.button}>Уншиж байна ...</div>
          )}
        </div>
        <div className={classes.width30R}></div>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '100',
    fontFamily: "'Roboto', sans-serif",
    fontSize: '16px',
    padding: '0 10px',
    marginTop: '30px',
  },
  textArea: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: '5px',
    height: '80px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#C19D65',
    textAlign: 'center',
    fontSize: '22px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  price: {
    width: '65px!important',
    height: '40px',
    backgroundColor: 'white',
  },
  priceSymbol: {
    width: '65px!important',
    height: '40px',
    marginLeft: '10px',
  },
  row: {
    display: 'flex',
    width: '100%',
    marginTop: '20px',
  },
  select: {
    height: '40px',
  },
  border: {
    border: '1px solid #F6F8FA',
    backgroundColor: '#C19D65',
  },
  icon: {
    color: '#C19D65',
    fontSize: '45px',
  },

  width30L: {
    display: 'flex',
    width: '30%',
    paddingRight: '30px',
    fontSize: '22px',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  width30R: {
    display: 'flex',
    width: '30%',
    alignItems: 'center',
    color: '#C19D65',
    paddingLeft: '5px',
    fontSize: '18px',
  },
  width40: {
    display: 'flex',
    width: '40%',
    justifyContent: 'center',
  },
  level: {
    backgroundColor: 'white',
    borderRadius: '6px',
    color: '#F6F8FA!important',
  },
  textfields: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '6px',
    height: '40px',
    color: 'black',
  },
  placeHolderLevel: {
    textAlign: 'center',
    fontWeight: '100',
    fontSize: '18px',
  },
});
