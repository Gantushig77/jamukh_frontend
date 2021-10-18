import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import colors from '../../constants/colors';
import { CSS_HELPER } from '../../constants/helper';
import DropdownCore from '../../components/core/dropdownCore';
import ModalCore from '../../components/core/modalCore';
import GroupedButtons from '../../components/inputBasedModal/groupedButtons';

export default function MarketOrderModal({
  title = '[Гарчиг]',
  desc = 'Энд модалтай холбоотой тайлбар орох болно.Таны харж буй текст бол утга өгөөгүй үед харагдах текст.',
  inputs = [
    {
      title: 'Гарчиг',
      description: 'тайлбар',
      value: '',
      placeHolder: 'хонь',
      type: 'input',
      inputType: 'text',
      options: ['Эхний сонголт'],
    },
    {
      title: 'Гарчиг',
      description: 'тайлбар',
      value: '',
      placeHolder: 'гахай',
      type: 'input',
      inputType: 'text',
      options: ['Эхний сонголт'],
    },
  ],
  submitButtonTitle = 'Болсон',
  cancelButtonTitle = 'Болих',
  onClose,
  width = '392px',
  height = '568px',
  onSubmit,
  onChange,
  counter,
  setCounter = () => {},
}) {
  const classes = useStyles();
  const [data, setData] = useState(inputs);
  useEffect(() => {
    if (onChange) onChange(data);
  }, [data, onChange]);
  return (
    <ModalCore outSideClick={onClose}>
      <div className={classes.root} style={{ height: height, width: width }}>
        <h1 className={classes.title}>{title}</h1>
        <h2 className={classes.desc}>{desc}</h2>
        <div className={classes.inputs}>
          {data.map((item, index) => {
            return (
              <InputWithTitle
                key={index}
                data={data}
                setData={setData}
                {...item}
                index={index}
              />
            );
          })}
        </div>
        <h2 className={classes.inputItemTitle}>
          Хэмжээ<span className={classes.span}>(кг)</span>{' '}
        </h2>
        <GroupedButtons counter={counter} setCounter={setCounter} />

        <div className={`${classes.buttons}`}>
          <h1 className={classes.submitButton} onClick={onClose}>
            {cancelButtonTitle}
          </h1>
          <h1
            className={`${classes.submitButton} ${classes.submitButtonActive}`}
            onClick={() => {
              if (onSubmit) onSubmit(data);
            }}
          >
            {submitButtonTitle}
          </h1>
        </div>
      </div>
    </ModalCore>
  );
}

function InputWithTitle({
  data,
  setData,
  index,
  title = 'Гарчиг',
  description = '',
  value = '',
  options = ['value', 'value 2'],
}) {
  const classes = useStyles();
  return (
    <div className={classes.inputItem}>
      <h1 className={classes.inputItemTitle}>
        {title} <span>{description}</span>
      </h1>
      {data ? (
        <DropdownCore
          options={options}
          defaultValue={value}
          onChange={(e) => {
            data[index].value = e;
            setData([...data]);
          }}
        />
      ) : (
        ''
      )}
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: '35px',
    overflow: 'hidden',
    borderRadius: '21px',
    position: 'relative',
    padingBottom: '100px',
  },

  text: {
    ...CSS_HELPER.initializeFont,
  },
  title: {
    ...CSS_HELPER.initializeFont,
    fontSize: '21px',
  },
  desc: {
    marginTop: '14px',
    ...CSS_HELPER.initializeFont,
    fontWeight: '500',
    width: '80%',
    color: 'rgba(0,0,0,0.5)',
  },
  span: {
    fontSize: 14,
    opacity: 0.5,
    marginLeft: 10,
  },
  inputs: {
    marginTop: '36px',
    padding: '0 4px',

    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  inputItem: {
    marginBottom: '27px',
    letterSpacing: '0.5px',
    zIndex: 100,
    '& span': {
      ...CSS_HELPER.initializeFont,
      color: colors.gray50,
    },
  },
  inputItemTitle: {
    ...CSS_HELPER.initializeFont,
    marginBottom: '17px',
    fontWeight: 500,
  },
  buttons: {
    boxSizing: 'border-box',
    display: 'flex',
    height: '68px',
    width: '100%',
    justifyContent: 'flex-end',
    position: 'absolute',
    padding: '17px 27px',
    bottom: '0',
    left: '0',
    boxShadow: '0 0 40px 0px rgba(0,0,0,0.2)',
    backgroundColor: 'white',
  },
  submitButton: {
    ...CSS_HELPER.initializeFont,
    boxSizing: 'border-box',
    padding: '9px 21px',
    fontWeight: '400',
    letterSpacing: '1px',
    borderRadius: '7px',
    cursor: 'pointer',
  },
  submitButtonActive: {
    padding: '9px 30px',
    backgroundColor: '#6A67D3',
    color: 'white',
    boxShadow: '0px 7px 11px #6A67D340',
  },
}));
