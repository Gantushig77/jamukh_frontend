import React, {  useState } from 'react';
import { makeStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import { DropzoneAreaBase } from "material-ui-dropzone";
import TextField from "@material-ui/core/TextField";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { base_url } from '../../constants/url';
import { Alert } from '@mui/lab';
import { Snackbar } from '@mui/material';

export default function Property(props) {
  const classes = useStyles(props);
  const [isLoading, setisLoading] = useState(false);
  const category = [5]
  const [title, settitle] = useState('');
  const [room_count, setroom_count] = useState('');
  const [has_garage, sethas_garage] = useState('');
  const [district, setdistrict] = useState('');
  const [address, setaddress] = useState('');
  const [size_mk, setsize_mk] = useState('');
  const [balcony_count, setbalcony_count] = useState('');
  const [door_type, setdoor_type] = useState('');
  const [wind_type, setwind_type] = useState('');
  const [wind_count, setwind_count] = useState('');
  const [floor_type, setfloor_type] = useState('');
  const [floor_count, setfloor_count] = useState('');
  const [building_level, setbuilding_level] = useState('');
  const [commission_date, setcommission_date] = useState('');
  const [price, setprice] = useState('');
  const [priceSymbol, setpriceSymbol] = useState('₮');
  const [description, setdescription] = useState('');
  const token = localStorage.getItem('jamukh_token');
  
  const districts = ["Багануур", "Багахангай", "Баянгол", "Баянзүрх", "Налайх", "Сонгино Хайрхан", "Сүхбаатар", "Хан-уул", "Чингэлтэй", "Орон нутаг"]

  const [files, setFiles] = useState([]);

  const handleAdd = (newFiles) => {
    newFiles = newFiles.filter(
      (file) => !files.find((f) => f.data === file.data)
    );
    setFiles([...files, ...newFiles]);

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
  const handleDelete = (deleted) => {
    setFiles(files.filter((f) => f !== deleted));
  };


// file upload

const formDataUpdateAds = () => {
  setisLoading(true)
  if(room_count===''||has_garage===''||district===''||address===''||size_mk===''||balcony_count===''||door_type===''||wind_type===''||wind_count===''||floor_type===''||floor_count===''||building_level===''||commission_date === '' ||price===''||description===''||files.length === 0){
   
    handleSnackOpen({
      state: true,
      msg:'Аль нэг талбар дутуу байна',
       type: 'error',
   });
   setisLoading(false)
  }
  else{
    const info ={"title":title,"category":category,"description":description,'price':price,'currency_symbol':priceSymbol,'ads_info':[{'label':'Өрөөний тоо','value':room_count},{'label':'Граж','value':has_garage},{'label':'Дүүрэг','value':district},{'label':'Байршил','value':address},{'label':'Талбай км2','value':size_mk},{'label':'Тагт','value':balcony_count},{'label':'Хаалга','value':door_type},{'label':'Цонх','value':wind_type},{'label':'Цонхны тоо','value':wind_count},{'label':'Шал','value':floor_type},{'label':'Хэдэн давхар','value':floor_count},{'label':'Барилгын давхар','value':building_level},{'label':'Ашиглалтанд орсон он','value':commission_date}]}
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
              return reject(req.statusText);
            
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
      <div className={classes.row}>
        <div className={classes.width30L}>
          Өрөөний тоо
        </div>
        <div className={classes.width40}>
          <FormControl fullWidth className={classes.level}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              variant='outlined'
              className={classes.select}
              value={room_count || 'a'}
              inputProps={{
                classes: {
                  root: classes.border,
                  icon: classes.icon,
                },
              }}
              renderValue={
                room_count !== ''
                  ? undefined
                  : () => <div className={classes.placeHolderLevel}>Сонгох</div>
              }
              onChange={(e) => { setroom_count(e.target.value) }}
              MenuProps={{
                PaperProps: {
                  style: {
                    color: '#C19D65',
                    fontWeight: '100',
                  },
                },
              }}
            >
              <MenuItem value='5+ Өрөө'>5+ Өрөө</MenuItem>
              <MenuItem value='4 өрөө'>4 өрөө</MenuItem>
              <MenuItem value='3 өрөө'>3 өрөө</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.width30R}>

        </div>
      </div>

      {/* //has_garage */}

      <div className={classes.row}>
        <div className={classes.width30L}>
          Граж
        </div>
        <div className={classes.width40}>
          <FormControl fullWidth className={classes.level}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              variant='outlined'
              className={classes.select}
              value={has_garage || 'a'}
              inputProps={{
                classes: {
                  root: classes.border,
                  icon: classes.icon,
                },
              }}
              renderValue={
                has_garage !== ''
                  ? undefined
                  : () => <div className={classes.placeHolderLevel}>Сонгох</div>
              }
              onChange={(e) => { sethas_garage(e.target.value) }}
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
              <MenuItem value='Байгаа'>Байгаа</MenuItem>
              <MenuItem value='Байхгүй'>Байхгүй</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.width30R}>

        </div>
      </div>
      {/* //district */}

      <div className={classes.row}>
        <div className={classes.width30L}>
           Дүүрэг
        </div>
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
              onChange={(e) => { setdistrict(e.target.value) }}
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
            {districts.map((district) =>
                <MenuItem value={district} key={district}>{district}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
        <div className={classes.width30R}>

        </div>
      </div>

  {/* //address*/}

      <div className={classes.row}>
        <div className={classes.width30L}>
           Байршил
        </div>
        <div className={classes.width40}>
          <InputBase
            type="text"
            value={address}
            className={classes.textfields}
            onChange={(e) => setaddress(e.target.value)}
            placeholder={'Байршил'}
          />
        </div>
        <div className={classes.width30R}>

        </div>
      </div>

      {/* //balcony_count */}

      <div className={classes.row}>
        <div className={classes.width30L}>
          Тагт
        </div>
        <div className={classes.width40}>
          <FormControl fullWidth className={classes.level}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              variant='outlined'
              className={classes.select}
              value={balcony_count || 'test'}
              placeholder='test'
              inputProps={{
                classes: {
                  root: classes.border,
                  icon: classes.icon,
                },
              }}
              renderValue={
                balcony_count !== ''
                  ? undefined
                  : () => <div className={classes.placeHolderLevel}>Сонгох</div>
              }
              onChange={(e) => { setbalcony_count(e.target.value) }}
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
              <MenuItem value="1 тагттай">1 тагттай</MenuItem>
              <MenuItem value="2 тагттай">2 тагттай</MenuItem>
              <MenuItem value="3+ тагттай">3+ тагттай</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.width30R}>

        </div>
      </div>
       {/* //size_mk*/}

       <div className={classes.row}>
        <div className={classes.width30L}>
           Талбай m2
        </div>
        <div className={classes.width40}>
          <InputBase
            type="number"
            value={size_mk}
            className={classes.textfields}
            onChange={(e) => setsize_mk(e.target.value)}
            placeholder={'Талбай m2'}
          />
        </div>
        <div className={classes.width30R}>

        </div>
      </div>
      {/* //door_type */}

      <div className={classes.row}>
        <div className={classes.width30L}>
        Хаалга
        </div>
        <div className={classes.width40}>
          <FormControl fullWidth className={classes.level}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              variant='outlined'
              className={classes.select}
              value={door_type || 'a'}
              inputProps={{
                classes: {
                  root: classes.border,
                  icon: classes.icon,
                },
              }}
              renderValue={
                door_type !== ''
                  ? undefined
                  : () => <div className={classes.placeHolderLevel}>Сонгох</div>
              }
              onChange={(e) => { setdoor_type(e.target.value) }}
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
              <MenuItem value="Мод">Мод</MenuItem>
              <MenuItem value="Төмөр">Төмөр</MenuItem>
              <MenuItem value="Бүргэд">Бүргэд</MenuItem>
              <MenuItem value="Вакум">Вакум</MenuItem>
              <MenuItem value="Төмөр Вакум">Төмөр Вакум</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.width30R}>

        </div>
      </div>

          {/* //wind_type */}

          <div className={classes.row}>
        <div className={classes.width30L}>
           Цонх
        </div>
        <div className={classes.width40}>
          <FormControl fullWidth className={classes.level}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              variant='outlined'
              className={classes.select}
              value={wind_type || 'test'}
              placeholder='test'
              inputProps={{
                classes: {
                  root: classes.border,
                  icon: classes.icon,
                },
              }}
              renderValue={
                wind_type !== ''
                  ? undefined
                  : () => <div className={classes.placeHolderLevel}>Сонгох</div>
              }
              onChange={(e) => { setwind_type(e.target.value) }}
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
              <MenuItem value="Мод">Мод</MenuItem>
              <MenuItem value="Вакум">Вакум</MenuItem>
              <MenuItem value="Төмөр вакум">Төмөр вакум</MenuItem>
              <MenuItem value="Модон вакум">Модон вакум</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.width30R}>

        </div>
      </div>
      {/* //wind_count */}

      <div className={classes.row}>
        <div className={classes.width30L}>
           Цонхны тоо
        </div>
        <div className={classes.width40}>
          <FormControl fullWidth className={classes.level}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              variant='outlined'
              className={classes.select}
              value={wind_count || 'test'}
              placeholder='test'
              inputProps={{
                classes: {
                  root: classes.border,
                  icon: classes.icon,
                },
              }}
              renderValue={
                wind_count !== ''
                  ? undefined
                  : () => <div className={classes.placeHolderLevel}>Сонгох</div>
              }
              onChange={(e) => { setwind_count(e.target.value) }}
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
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
              <MenuItem value="6">6</MenuItem>
              <MenuItem value="7">7</MenuItem>
              <MenuItem value="8">8</MenuItem>
              <MenuItem value="9">9</MenuItem>
              <MenuItem value="10">10</MenuItem>
              <MenuItem value="11+">11+</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.width30R}>

        </div>
      </div>

      {/* //floor_type */}

      <div className={classes.row}>
        <div className={classes.width30L}>
             Шал
        </div>
        <div className={classes.width40}>
          <FormControl fullWidth className={classes.level}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              variant='outlined'
              className={classes.select}
              value={floor_type || 'a'}
              placeholder='test'
              inputProps={{
                classes: {
                  root: classes.border,
                  icon: classes.icon,
                },
              }}
              renderValue={
                floor_type !== ''
                  ? undefined
                  : () => <div className={classes.placeHolderLevel}>Сонгох</div>
              }
              onChange={(e) => { setfloor_type(e.target.value) }}
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

              <MenuItem value="Мод">Мод</MenuItem>
              <MenuItem value="Паркет">Паркет</MenuItem>
              <MenuItem value="Ламинат">Ламинат</MenuItem>
              <MenuItem value="Чулуу">Чулуу</MenuItem>
              <MenuItem value="Плита">Плита</MenuItem>
              <MenuItem value="Цемент">Цемент</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.width30R}>

        </div>
      </div>
      {/* //floor_count */}

      <div className={classes.row}>
        <div className={classes.width30L}>
           Хэдэн давхар
        </div>
        <div className={classes.width40}>
        <InputBase
            type="number"
            value={floor_count}
            className={classes.textfields}
            onChange={(e) => setfloor_count(e.target.value)}
            placeholder={'Хэдэн давхар'}
          />
        </div>
        <div className={classes.width30R}>

        </div>
      </div>
      {/* //building_level */}

      <div className={classes.row}>
        <div className={classes.width30L}>
           Барилгын давхар
        </div>
        <div className={classes.width40}>
        <InputBase
            type="number"
            value={building_level}
            className={classes.textfields}
            onChange={(e) => setbuilding_level(e.target.value)}
            placeholder={'Барилгын давхар'}
          />
        </div>
        <div className={classes.width30R}>

        </div>
      </div>
   
      {/* //commission_date*/}
      <div className={classes.row}>
        <div className={classes.width30L}>
           Ашиглалтанд орсон он
        </div>
        <div className={classes.width40}>
        <InputBase
            type="number"
            value={commission_date}
            className={classes.textfields}
            onChange={(e) => setcommission_date(e.target.value)}
            placeholder={'Ашиглалтанд орсон он'}
          />
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
    flexDirection:'column',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '100',
    fontFamily: "'Roboto', sans-serif",
    fontSize: '16px',
    padding: '0 10px',
    marginTop: '30px'
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
    cursor: 'pointer'
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
