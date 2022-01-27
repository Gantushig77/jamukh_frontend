import React, {  useState  } from 'react';
import { makeStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import { DropzoneAreaBase } from "material-ui-dropzone";
import TextField from "@material-ui/core/TextField";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


export default function Land(props) {
  const classes = useStyles(props);
  const [district, setdistrict] = useState('');
  const [land_area, setland_area] = useState('');
  const [address, setaddress] = useState('');
  const [price, setprice] = useState('');
  const [priceSymbol, setpriceSymbol] = useState('₮');
  const [description, setdescription] = useState('');

  const districts = ["Багануур", "Багахангай", "Баянгол", "Баянзүрх", "Налайх", "Сонгино Хайрхан", "Сүхбаатар", "Хан-уул", "Чингэлтэй", "Орон нутаг"]
  const [files, setFiles] = useState([]);

  const handleAdd = (newFiles) => {
    newFiles = newFiles.filter(
      (file) => !files.find((f) => f.data === file.data)
    );
    setFiles([...files, ...newFiles]);
    console.log(files, "files");
  };

  const handleDelete = (deleted) => {
    setFiles(files.filter((f) => f !== deleted));
  };



  return (
    <div className={classes.root}>
  
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
      {/* //land_area */}

      <div className={classes.row}>
        <div className={classes.width30L}>
          Талбай м2
        </div>
        <div className={classes.width40}>
          <InputBase
            type="text"
            value={land_area}
            className={classes.textfields}
            onChange={(e) => setland_area(e.target.value)}
            placeholder={'Талбай'}
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
          <div className={classes.button}>
            Зар нэмэх
          </div>
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
