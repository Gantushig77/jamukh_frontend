import React, {  useState } from 'react';
import { makeStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import { DropzoneAreaBase } from "material-ui-dropzone";
import TextField from "@material-ui/core/TextField";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Alert } from '@mui/lab';
import { Snackbar } from '@mui/material';
import { base_url } from '../../constants/url';

export default function Antique(props) {
  const classes = useStyles(props);
  const [condition, setcondition] = useState('');
  const category = [2]
  const [material, setmaterial] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [title, settitle] = useState('');
  const [price, setprice] = useState('');
  const [priceSymbol, setpriceSymbol] = useState('₮');
  const [description, setdescription] = useState('');
  const [files, setFiles] = useState([]);
  const token = localStorage.getItem('jamukh_token');
  const [brand, setbrand] = useState('');

  const handleAdd = (newFiles) => {
    newFiles = newFiles.filter(
      (file) => !files.find((f) => f.data === file.data)
    );
    setFiles([...files, ...newFiles]);
  };

  const handleDelete = (deleted) => {
    setFiles(files.filter((f) => f !== deleted));
  };

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
setisLoading(true)
if(condition === '' || material===''|| title===''||price===''||description===''||files.length === 0||brand===''){
 
  handleSnackOpen({
    state: true,
    msg:'Аль нэг талбар дутуу байна',
     type: 'error',
 });
 setisLoading(false)
}
else{
  const info ={"title":title,"category":category,"description":description,'price':price,'currency_symbol':priceSymbol,'ads_info':[{'label':'Бренд','value':brand},{'label':'Шинэ/Хуучин','value':condition},{'label':'Материал','value':material}]}
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
      req.onreadystatechange = function() {
        if (req.readyState === 4) {
          if (req.status === 200 || req.status === 202) {
            const res = JSON.parse(req.response);
            resolve(res);
            setisLoading(false)
            handleSnackOpen({
              state: true,
              msg: 'Зар амжилтай орлоо',
              type: 'success',
            });
          } else {
            setisLoading(false)
            handleSnackOpen({
              state: true,
              msg: 'Зар оруулахад алдаа гарлаа',
              type: 'warning',
            });
            return (reject(req.statusText)
            )
          }
        }
      };
    } catch (e) {
      setisLoading(false)
      handleSnackOpen({
        state: true,
        msg: 'Зар оруулахад алдаа гарлаа',
        type: 'warning',
      });
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
        <div className={classes.width30L}>
          Гарчиг 
        </div>
        <div className={classes.width40}>
          <InputBase
            type="text"
            value={title}
            className={classes.textfields}
            onChange={(e) => settitle(e.target.value)}
            placeholder={'Гарчиг'}
          />
        </div>
        <div className={classes.width30R}>

        </div>
      </div>
      {/* //Condition */}

      <div className={classes.row}>
        <div className={classes.width30L}>
           Шинэ/Хуучин
          </div>
        <div className={classes.width40}>
          <FormControl fullWidth className={classes.level}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              variant='outlined'
              className={classes.select}
              value={condition || 'a'}
              inputProps={{
                classes: {
                  root: classes.border,
                  icon: classes.icon,
                },
              }}
              renderValue={
                condition !== ''
                  ? undefined
                  : () => <div className={classes.placeHolderLevel}>Сонгох</div>
              }
              onChange={(e) => { setcondition(e.target.value) }}
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
              <MenuItem value='Шинэ'>Шинэ</MenuItem>
              <MenuItem value='Хуучин'>Хуучин</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.width30R}>

        </div>
      </div>
            {/* //brand*/}

       <div className={classes.row}>
        <div className={classes.width30L}>
          Бренд
        </div>
        <div className={classes.width40}>
          <InputBase
            type="text"
            value={brand}
            className={classes.textfields}
            onChange={(e) => setbrand(e.target.value)}
            placeholder={'Бренд'}
          />
        </div>
        <div className={classes.width30R}>

        </div>
      </div>
      {/* //material */}

      <div className={classes.row}>
        <div className={classes.width30L}>
          Материал
        </div>
        <div className={classes.width40}>
          <FormControl fullWidth className={classes.level}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              variant='outlined'
              className={classes.select}
              value={material || 'a'}
              placeholder='test'
              inputProps={{
                classes: {
                  root: classes.border,
                  icon: classes.icon,
                },
              }}
              renderValue={
                material !== ''
                  ? undefined
                  : () => <div className={classes.placeHolderLevel}>Сонгох</div>
              }
              onChange={(e) => { setmaterial(e.target.value) }}
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
              <MenuItem value="Алт">Алт</MenuItem>
              <MenuItem value="Мөнгө">Мөнгө</MenuItem>
              <MenuItem value="Алмаз">Алмаз</MenuItem>
              <MenuItem value="Зэс">Зэс</MenuItem>
              <MenuItem value="Үнэт чулуу">Үнэт чулуу</MenuItem>
              <MenuItem value="Бусад">Бусад</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.width30R}>

        </div>
      </div>
      {/* //imageUpload*/}

      <div className={classes.row}>
        <div className={classes.width30L}>
          Зураг
        </div>
        <div className={classes.width40}>
          <DropzoneAreaBase
            fileObjects={files}
            onAdd={handleAdd}
            Icon={ AddPhotoAlternateIcon }
            dropzoneText="Энд дарж зурагаа оруулно уу"
            onDelete={handleDelete}
            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
            maxFileSize={5000000}
            filesLimit={4}
          />
        </div>
        <div className={classes.width30R}>
          Их зураг оруулах бол ctrl товчлуурыг дарж зургаа сонгон оруулна. Файлын хэмжээ нь 5 Мб, формат .jpg, .jpeg, .png, .gif байна.
          Тайлбар: Зурганд холбогдох утасны дугаар болон хаяг оруулахгүй байхыг анхаарна уу!
        </div>
      </div>

      {/* //Price*/}

      <div className={classes.row}>
        <div className={classes.width30L}>
          Үнэ
        </div>
        <div className={classes.width40}>
          <InputBase
            type="number"
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
              onChange={(e) => { setpriceSymbol(e.target.value) }}
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
              <MenuItem value="₮">₮</MenuItem>
              <MenuItem value="$">$</MenuItem>
              <MenuItem value="€">€</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.width30R}>
        Үнийн дүнг бүх тэгтэй нь оруулна уу. Жишээ нь: 12 саяыг 12000000 гэж оруулна уу.

        </div>
      </div>

      {/* //Send*/}

      <div className={classes.row}>
        <div className={classes.width30L}>
          Тайлбар
        </div>
        <div className={classes.width40}>
            <TextField
              multiline={true}
              rows={8}
              name="Description"
              autoComplete="off"
              variant="outlined"
              className={classes.textArea}
              value={description}
              onChange={e => setdescription(e.target.value)}
            />
        </div>
        <div className={classes.width30R}>
        </div>
      </div>

      {/* //Send*/}

      <div className={classes.row}>
        <div className={classes.width30L}>
        </div>
        <div className={classes.width40}>
          {isLoading === false?   
          <div className={classes.button} onClick={()=>{formDataUpdateAds()}}>
            Зар нэмэх
          </div>:  
          <div className={classes.button} >
            Уншиж байна ...
          </div>
          }
       
        </div>
        <div className={classes.width30R}>
        </div>
      </div>

    </div>

  );
}


const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '100',
    fontFamily: "'Roboto', sans-serif",
    fontSize: '16px',
    padding: '0 10px',
    marginTop: '30px',
    flexDirection:'column',
  },
  textArea:{
    backgroundColor:'white',
    width:'100%',
    borderRadius:'5px'
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#C19D65',
    textAlign: 'center',
    fontSize: '22px',
    borderRadius: '5px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#715C36',
    },
  },

  
  price: {
    width: '65px!important',
    height: "40px",
    backgroundColor: 'white'
  },
  priceSymbol: {
    width: '65px!important',
    height: "40px",
    marginLeft: '10px',
  },
  row: {
    display: 'flex',
    width: '100%',
    marginTop: '20px'
  },
  select: {
    height: "40px"
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
    justifyContent: 'flex-end'
  },
  width30R: {
    display: 'flex',
    width: '30%',
    alignItems: 'center',
    color: '#C19D65',
    paddingLeft: '5px',
    fontSize: '18px'
  },
  width40: {
    display: 'flex',
    width: '40%',
    justifyContent: 'center'
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
    fontSize: '18px'
  },
});
