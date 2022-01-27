import React, {  useState } from 'react';
import { makeStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import { DropzoneAreaBase } from "material-ui-dropzone";
import TextField from "@material-ui/core/TextField";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
export default function Car(props) {
  const classes = useStyles(props);
  const [manufacturer, setmanufacturer] = useState('');
  const [condition, setcondition] = useState('');
  const [address, setaddress] = useState('');
  const [car_type, setcar_type] = useState('');
  const [wheel_position, setwheel_position] = useState('');
  const [door_count, setdoor_count] = useState('');
  const [drivetrain, setdrivetrain] = useState('');
  const [manufacture_date, setmanufacture_date] = useState('');
  const [imported_date, setimported_date] = useState('');
  const [engine_type, setengine_type] = useState('');
  const [gearbox, setgearbox] = useState('');
  const [engine_capacity, setengine_capacity] = useState('');
  const [car_color, setcar_color] = useState('');
  const [saloon_color, setsaloon_color] = useState('');
  const [odometer_distance, setodometer_distance] = useState('');
  const [leasing, setleasing] = useState('');
  const [price, setprice] = useState('');
  const [priceSymbol, setpriceSymbol] = useState('₮');
  const [description, setdescription] = useState('');

  const year = [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986]
  const motor = [6.0, 5.9, 5.8, 5.7, 5.6, 5.5, 5.4, 5.3, 5.2, 5.1, 5.0, 4.9, 4.8, 4.7, 4.6, 4.5, 4.4, 4.3, 4.2, 4.1, 4.0, 3.9, 3.8, 3.7, 3.6, 3.5, 3.4, 3.3, 3.2, 3.1, 3.0, 2.9, 2.8, 2.7, 2.6, 2.5, 2.4, 2.3, 2.2, 2.1, 2.0, 1.9, 1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4]
  
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
      <div className={classes.row}>
        <div className={classes.width30L}>
          Үйлдвэр
        </div>
        <div className={classes.width40}>
          <FormControl fullWidth className={classes.level}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              variant='outlined'
              className={classes.select}
              value={manufacturer || 'a'}
              inputProps={{
                classes: {
                  root: classes.border,
                  icon: classes.icon,
                },
              }}
              renderValue={
                manufacturer !== ''
                  ? undefined
                  : () => <div className={classes.placeHolderLevel}>Сонгох</div>
              }
              onChange={(e) => { setmanufacturer(e.target.value) }}
              MenuProps={{
                PaperProps: {
                  style: {
                    color: '#C19D65',
                    fontWeight: '100',
                  },
                },
              }}
            >
              <MenuItem value='Acura'>Acura</MenuItem>
              <MenuItem value='Audi'>Audi</MenuItem>
              <MenuItem value='BMW'>BMW</MenuItem>
              <MenuItem value='Cadillac'>Cadillac</MenuItem>
              <MenuItem value='Chevrolet'>Chevrolet</MenuItem>
              <MenuItem value='Chryslet'>Chryslet</MenuItem>
              <MenuItem value='Citroen'>Citroen</MenuItem>
              <MenuItem value='Deawoo'>Deawoo</MenuItem>
              <MenuItem value='Daihatsu'>Daihatsu</MenuItem>
              <MenuItem value='Dodge'>Dodge</MenuItem>
              <MenuItem value='Flat'>Flat</MenuItem>
              <MenuItem value='GMC'>GMC</MenuItem>
              <MenuItem value='Honda'>Honda</MenuItem>
              <MenuItem value='Hummer'>Hummer</MenuItem>
              <MenuItem value='Hyundai'>Hyundai</MenuItem>
              <MenuItem value='Infiniti'>Infiniti</MenuItem>
              <MenuItem value='Isuzu'>Isuzu</MenuItem>
              <MenuItem value='Jagur'>Jagur</MenuItem>
              <MenuItem value='Jeep'>Jeep</MenuItem>
              <MenuItem value='Kenbo'>Kenbo</MenuItem>
              <MenuItem value='Kia'>Kia</MenuItem>
              <MenuItem value='Land Rover'>Land Rover</MenuItem>
              <MenuItem value='Lexus'>Lexus</MenuItem>
              <MenuItem value='Lincoln'>Lincoln</MenuItem>
              <MenuItem value='Mazda'>Mazda</MenuItem>
              <MenuItem value='Mercedes-Benz'>Mercedes-Benz</MenuItem>
              <MenuItem value='MG'>MG</MenuItem>
              <MenuItem value='Mini'>Mini</MenuItem>
              <MenuItem value='Mitsubishi'>Mitsubishi</MenuItem>
              <MenuItem value='Nissan'>Nissan</MenuItem>
              <MenuItem value='Opel'>Opel</MenuItem>
              <MenuItem value='Орос'>Орос</MenuItem>
              <MenuItem value='Peageot'>Peageot</MenuItem>
              <MenuItem value='Porsche'>Porsche</MenuItem>
              <MenuItem value='Renault'>Renault</MenuItem>
              <MenuItem value='Saab'>Saab</MenuItem>
              <MenuItem value='Samsung'>Samsung</MenuItem>
              <MenuItem value='SsangYong'>SsangYong</MenuItem>
              <MenuItem value='Skoda'>Skoda</MenuItem>
              <MenuItem value='Subaru'>Subaru</MenuItem>
              <MenuItem value='Suzuki'>Suzuki</MenuItem>
              <MenuItem value='Toyota'>Toyota</MenuItem>
              <MenuItem value='Volkswagen'>Volkswagen</MenuItem>
              <MenuItem value='Volvo'>Volvo</MenuItem>
              <MenuItem value='RR'>RR</MenuItem>
              <MenuItem value='Бусад'>Бусад</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.width30R}>

        </div>
      </div>

      {/* //Condition */}

      <div className={classes.row}>
        <div className={classes.width30L}>
          Нөхцөл
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
              <MenuItem value='Дугаар авсан'>Дугаар авсан</MenuItem>
              <MenuItem value='Дугаар аваагүй'>Дугаар аваагүй</MenuItem>
              <MenuItem value='Шинэ'>Шинэ</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.width30R}>

        </div>
      </div>
      {/* //Address */}

      <div className={classes.row}>
        <div className={classes.width30L}>
          Хаяг байршил
        </div>
        <div className={classes.width40}>
          <FormControl fullWidth className={classes.level}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              variant='outlined'
              className={classes.select}
              value={address || 'a'}
              inputProps={{
                classes: {
                  root: classes.border,
                  icon: classes.icon,
                },
              }}
              renderValue={
                address !== ''
                  ? undefined
                  : () => <div className={classes.placeHolderLevel}>Сонгох</div>
              }
              onChange={(e) => { setaddress(e.target.value) }}
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
              <MenuItem value='Улаанбаатар'>Улаанбаатар</MenuItem>
              <MenuItem value='Архангай'>Архангай</MenuItem>
              <MenuItem value='Баян-өлгий'>Баян-өлгий</MenuItem>
              <MenuItem value='Баянхонгор'>Баянхонгор</MenuItem>
              <MenuItem value='Булган'>Булган</MenuItem>
              <MenuItem value='Говь-алтай'>Говь-алтай</MenuItem>
              <MenuItem value='Говьсүмбэр'>Говьсүмбэр</MenuItem>
              <MenuItem value='Дархан-Уул'>Дархан-Уул</MenuItem>
              <MenuItem value='Дорноговь'>Дорноговь</MenuItem>
              <MenuItem value='Дорнод'>Дорнод</MenuItem>
              <MenuItem value='Дундговь'>Дундговь</MenuItem>
              <MenuItem value='Завхан'>Завхан</MenuItem>
              <MenuItem value='Орхон'>Орхон</MenuItem>
              <MenuItem value='Өвөрхангай'>Өвөрхангай</MenuItem>
              <MenuItem value='Өмнөговь'>Өмнөговь</MenuItem>
              <MenuItem value='Сүхбаатар'>Сүхбаатар</MenuItem>
              <MenuItem value='Сэлэнгэ'>Сэлэнгэ</MenuItem>
              <MenuItem value='Төв'>Төв</MenuItem>
              <MenuItem value='Увс'>Увс</MenuItem>
              <MenuItem value='Ховд'>Ховд</MenuItem>
              <MenuItem value='Хөвсгөл'>Хөвсгөл</MenuItem>
              <MenuItem value='Хэнтий'>Хэнтий</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.width30R}>

        </div>
      </div>
      {/* //car_type */}

      <div className={classes.row}>
        <div className={classes.width30L}>
          Төрөл
        </div>
        <div className={classes.width40}>
          <FormControl fullWidth className={classes.level}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              variant='outlined'
              className={classes.select}
              value={car_type || 'test'}
              placeholder='test'
              inputProps={{
                classes: {
                  root: classes.border,
                  icon: classes.icon,
                },
              }}
              renderValue={
                car_type !== ''
                  ? undefined
                  : () => <div className={classes.placeHolderLevel}>Сонгох</div>
              }
              onChange={(e) => { setcar_type(e.target.value) }}
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
              <MenuItem value="Жийп">Жийп</MenuItem>
              <MenuItem value="Суудлын тэрэг">Суудлын тэрэг</MenuItem>
              <MenuItem value="Гэр бүлийн">Гэр бүлийн</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.width30R}>

        </div>
      </div>
      {/* //door_count */}

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
              value={door_count || 'test'}
              placeholder='test'
              inputProps={{
                classes: {
                  root: classes.border,
                  icon: classes.icon,
                },
              }}
              renderValue={
                door_count !== ''
                  ? undefined
                  : () => <div className={classes.placeHolderLevel}>Сонгох</div>
              }
              onChange={(e) => { setdoor_count(e.target.value) }}
              MenuProps={{
                PaperProps: {
                  style: {
                    color: '#C19D65',
                    fontWeight: '100',
                  },
                },
              }}
            >
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.width30R}>

        </div>
      </div>
      {/* //wheel_position */}

      <div className={classes.row}>
        <div className={classes.width30L}>
          Хүрд
        </div>
        <div className={classes.width40}>
          <FormControl fullWidth className={classes.level}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              variant='outlined'
              className={classes.select}
              value={wheel_position || 'a'}
              inputProps={{
                classes: {
                  root: classes.border,
                  icon: classes.icon,
                },
              }}
              renderValue={
                wheel_position !== ''
                  ? undefined
                  : () => <div className={classes.placeHolderLevel}>Сонгох</div>
              }
              onChange={(e) => { setwheel_position(e.target.value) }}
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
              <MenuItem value="Зөв">Зөв</MenuItem>
              <MenuItem value="Буруу">Буруу</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.width30R}>

        </div>
      </div>
      {/* //drivetrain */}

      <div className={classes.row}>
        <div className={classes.width30L}>
          Хөтлөгч
        </div>
        <div className={classes.width40}>
          <FormControl fullWidth className={classes.level}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              variant='outlined'
              className={classes.select}
              value={drivetrain || 'test'}
              placeholder='test'
              inputProps={{
                classes: {
                  root: classes.border,
                  icon: classes.icon,
                },
              }}
              renderValue={
                drivetrain !== ''
                  ? undefined
                  : () => <div className={classes.placeHolderLevel}>Сонгох</div>
              }
              onChange={(e) => { setdrivetrain(e.target.value) }}
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
              <MenuItem value="Урдаа FWD">Урдаа FWD</MenuItem>
              <MenuItem value="Хойноо RWD">Хойноо RWD</MenuItem>
              <MenuItem value="Бүх дугуй 4WD">Бүх дугуй 4WD</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.width30R}>

        </div>
      </div>

      {/* //manufacture_date */}

      <div className={classes.row}>
        <div className={classes.width30L}>
          Үйлдвэрлэсэн он
        </div>
        <div className={classes.width40}>
          <FormControl fullWidth className={classes.level}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              variant='outlined'
              className={classes.select}
              value={manufacture_date || 'a'}
              placeholder='test'
              inputProps={{
                classes: {
                  root: classes.border,
                  icon: classes.icon,
                },
              }}
              renderValue={
                manufacture_date !== ''
                  ? undefined
                  : () => <div className={classes.placeHolderLevel}>Сонгох</div>
              }
              onChange={(e) => { setmanufacture_date(e.target.value) }}
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

              {year.map((year) =>
                <MenuItem value={year}>{year}</MenuItem>
              )}

            </Select>
          </FormControl>
        </div>
        <div className={classes.width30R}>

        </div>
      </div>
      {/* //imported_date */}

      <div className={classes.row}>
        <div className={classes.width30L}>
          Орж ирсэн он
        </div>
        <div className={classes.width40}>
          <FormControl fullWidth className={classes.level}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              variant='outlined'
              className={classes.select}
              value={imported_date || 'a'}
              placeholder='test'
              inputProps={{
                classes: {
                  root: classes.border,
                  icon: classes.icon,
                },
              }}
              renderValue={
                imported_date !== ''
                  ? undefined
                  : () => <div className={classes.placeHolderLevel}>Сонгох</div>
              }
              onChange={(e) => { setimported_date(e.target.value) }}
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

              {year.map((year) =>
                <MenuItem value={year}>{year}</MenuItem>
              )}

            </Select>
          </FormControl>
        </div>
        <div className={classes.width30R}>

        </div>
      </div>
      {/* //engine_type */}

      <div className={classes.row}>
        <div className={classes.width30L}>
          Хөдөлгүүр
        </div>
        <div className={classes.width40}>
          <FormControl fullWidth className={classes.level}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              variant='outlined'
              className={classes.select}
              value={engine_type || 'a'}
              placeholder='test'
              inputProps={{
                classes: {
                  root: classes.border,
                  icon: classes.icon,
                },
              }}
              renderValue={
                engine_type !== ''
                  ? undefined
                  : () => <div className={classes.placeHolderLevel}>Сонгох</div>
              }
              onChange={(e) => { setengine_type(e.target.value) }}
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


              <MenuItem value="Бензин">Бензин</MenuItem>
              <MenuItem value="Дизель">Дизель</MenuItem>
              <MenuItem value="Газ">Газ</MenuItem>
              <MenuItem value="Хайбрид">Хайбрид</MenuItem>
              <MenuItem value="Цахилгаан">Цахилгаан</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.width30R}>

        </div>
      </div>
      {/* //gearbox */}

      <div className={classes.row}>
        <div className={classes.width30L}>
          Хурдны хайрцаг
        </div>
        <div className={classes.width40}>
          <FormControl fullWidth className={classes.level}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              variant='outlined'
              className={classes.select}
              value={gearbox || 'a'}
              placeholder='test'
              inputProps={{
                classes: {
                  root: classes.border,
                  icon: classes.icon,
                },
              }}
              renderValue={
                gearbox !== ''
                  ? undefined
                  : () => <div className={classes.placeHolderLevel}>Сонгох</div>
              }
              onChange={(e) => { setgearbox(e.target.value) }}
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

              <MenuItem value="Бензин">Механик</MenuItem>
              <MenuItem value="Дизель">Автомат</MenuItem>

            </Select>
          </FormControl>
        </div>
        <div className={classes.width30R}>

        </div>
      </div>
      {/* //engine_capacity */}

      <div className={classes.row}>
        <div className={classes.width30L}>
          Мотор багтаамж
        </div>
        <div className={classes.width40}>
          <FormControl fullWidth className={classes.level}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              variant='outlined'
              className={classes.select}
              value={engine_capacity || 'a'}
              placeholder='test'
              inputProps={{
                classes: {
                  root: classes.border,
                  icon: classes.icon,
                },
              }}
              renderValue={
                engine_capacity !== ''
                  ? undefined
                  : () => <div className={classes.placeHolderLevel}>Сонгох</div>
              }
              onChange={(e) => { setengine_capacity(e.target.value) }}
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

              {motor.map((motor) =>
                <MenuItem value={motor}>{motor}</MenuItem>
              )}


            </Select>
          </FormControl>
        </div>
        <div className={classes.width30R}>

        </div>
      </div>

      {/* //saloon_color */}

      <div className={classes.row}>
        <div className={classes.width30L}>
          Дотор өнгө
        </div>
        <div className={classes.width40}>
          <FormControl fullWidth className={classes.level}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              variant='outlined'
              className={classes.select}
              value={saloon_color || 'a'}
              placeholder='test'
              inputProps={{
                classes: {
                  root: classes.border,
                  icon: classes.icon,
                },
              }}
              renderValue={
                saloon_color !== ''
                  ? undefined
                  : () => <div className={classes.placeHolderLevel}>Сонгох</div>
              }
              onChange={(e) => { setsaloon_color(e.target.value) }}
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
              <MenuItem value="Хар">Хар</MenuItem>
              <MenuItem value="Саарал">Саарал</MenuItem>
              <MenuItem value="Бор">Бор</MenuItem>
              <MenuItem value="Цагаан шар">Цагаан шар</MenuItem>
              <MenuItem value="Бусад">Бусад</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.width30R}>

        </div>
      </div>
      {/* //odometer_distance*/}

      <div className={classes.row}>
        <div className={classes.width30L}>
          Явсан км2
        </div>
        <div className={classes.width40}>
          <InputBase
            type="text"
            value={odometer_distance}
            className={classes.textfields}
            onChange={(e) => setodometer_distance(e.target.value)}
            placeholder={'Явсан км2'}
          />
        </div>
        <div className={classes.width30R}>

        </div>
      </div>
      {/* //car_color */}

      <div className={classes.row}>
        <div className={classes.width30L}>
          Өнгө
        </div>
        <div className={classes.width40}>
          <FormControl fullWidth className={classes.level}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              variant='outlined'
              className={classes.select}
              value={car_color || 'a'}
              placeholder='test'
              inputProps={{
                classes: {
                  root: classes.border,
                  icon: classes.icon,
                },
              }}
              renderValue={
                car_color !== ''
                  ? undefined
                  : () => <div className={classes.placeHolderLevel}>Сонгох</div>
              }
              onChange={(e) => { setcar_color(e.target.value) }}
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
              <MenuItem value="Шар">Шар</MenuItem>
              <MenuItem value="Цэнхэр">Цэнхэр</MenuItem>
              <MenuItem value="Хар">Хар</MenuItem>
              <MenuItem value="Цагаан">Цагаан </MenuItem>
              <MenuItem value="Хөх">Хөх</MenuItem>
              <MenuItem value="Шар">Саарал</MenuItem>
              <MenuItem value="Цэнхэр">Хүрэн</MenuItem>
              <MenuItem value="Хар">Ягаан</MenuItem>
              <MenuItem value="Цагаан">Улаан </MenuItem>
              <MenuItem value="Хөх">Ногоон</MenuItem>
              <MenuItem value="Хар">Улбар шар</MenuItem>
              <MenuItem value="Цагаан">Бор </MenuItem>
              <MenuItem value="Хөх">Бусад</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.width30R}>

        </div>
      </div>
      {/* //leasing*/}
      <div className={classes.row}>
        <div className={classes.width30L}>
          Лизинг
        </div>
        <div className={classes.width40}>
          <FormControl fullWidth className={classes.level}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              variant='outlined'
              className={classes.select}
              value={leasing || 'a'}
              inputProps={{
                classes: {
                  root: classes.border,
                  icon: classes.icon,
                },
              }}
              renderValue={
                leasing !== ''
                  ? undefined
                  : () => <div className={classes.placeHolderLevel}>Сонгох</div>
              }
              onChange={(e) => { setleasing(e.target.value) }}
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
              <MenuItem value="Хувь лизингтэй">Хувь лизингтэй</MenuItem>
              <MenuItem value="Банкны лизингтэй">Банкны лизингтэй</MenuItem>
              <MenuItem value="Лизинггүй">Лизинггүй</MenuItem>
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
