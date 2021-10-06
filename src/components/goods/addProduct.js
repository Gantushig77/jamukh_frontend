import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import colors from '../../constants/colors';
import { CSS_HELPER } from '../../constants/helper';
import CountInputCore from '../core/countInputCore';
import DropdownCore from '../core/dropdownCore';
import InputCore from '../core/inputCore';
import ModalCore from '../core/modalCore';
import { toastError } from '../core/toastCore';

export default function AddProduct({
  title = '[Гарчиг]',
  desc = 'Энд модалтай холбоотой тайлбар орох болно.Таны харж буй текст бол утга өгөөгүй үед харагдах текст.',
  categories,
  subCategories,
  submitButtonTitle = 'Болсон',
  cancelButtonTitle = 'Болих',
  onClose,
  width = '392px',
  height = '500px',
  onSubmit,
  onChange,
}) {
  const classes = useStyles();
  const [parentId, setParentId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [addCount, setAddCount] = useState(0);
  useEffect(() => {
    setParentId(categories[0]._id);
    // eslint-disable-next-line
  }, []);

  return (
    <ModalCore outSideClick={onClose}>
      <div className={classes.root} style={{ height: height, width: width }}>
        <h1 className={classes.title}>{title}</h1>
        <h2 className={classes.desc}>{desc}</h2>
        <div className={classes.inputs}>
          {/* //////////////////////////// */}
          <div className={classes.inputItem} key={1}>
            <h1 className={classes.inputItemTitle}>
              {'Мал Амьтны Төрөл'} <span>{''}</span>
            </h1>

            <DropdownCore
              options={categories?.map((item) => item.name)}
              onChange={(parentId) => {
                setParentId(categories?.find((item) => item.name === parentId)?._id);
              }}
              value={categories?.[0]?.name}
            />
          </div>
          <div className={classes.inputItem} key={parentId}>
            <h1 className={classes.inputItemTitle}>
              {'Махны Төрөл'} <span>{''}</span>
            </h1>
            <DropdownCore
              key={parentId}
              options={[
                ...subCategories
                  ?.filter((item) => item.parentId === parentId)
                  .map((item) => item.name),
              ]}
              onChange={(coreName) => {
                setSelectedCategory(
                  subCategories?.find(
                    (item) => item.parentId === parentId && item.name === coreName
                  )
                );
              }}
            />
          </div>
          <div className={classes.inputItem} key={3}>
            <h1 className={classes.inputItemTitle}>
              {'Хэмжээ'} <span>{'(кг / ширхэг)'}</span>
            </h1>

            <CountInputCore onChange={setAddCount} minValue={0} />
          </div>

          {/* //////////////////////////// */}
        </div>
        <div className={`${classes.buttons}`}>
          <h1 className={classes.submitButton} onClick={onClose}>
            {cancelButtonTitle}
          </h1>
          <h1
            className={`${classes.submitButton} ${classes.submitButtonActive}`}
            onClick={() => {
              if (selectedCategory?._id) {
                if (onSubmit) onSubmit({ item: selectedCategory, count: addCount });
              } else toastError('Махны төрөл сонгогдоогүй байна');
            }}
          >
            {submitButtonTitle}
          </h1>
        </div>
      </div>
    </ModalCore>
  );
}

export function InputWithTitle({
  data,
  setData,
  index,
  title = 'Гарчиг',
  description = '',
  value = '',
  placeHolder = 'хонь',
  options = ['value', 'value 2'],
  type = 'input',
  inputType = 'text',
}) {
  const classes = useStyles();
  return (
    <div className={classes.inputItem}>
      <h1 className={classes.inputItemTitle}>
        {title} <span>{description}</span>
      </h1>
      {type === 'input' ? (
        <InputCore
          placeholder={placeHolder}
          acceptValue={value}
          type={inputType}
          onChange={(e) => {
            data[index].value = e;
            setData([...data]);
          }}
        />
      ) : type === 'dropdown' ? (
        <DropdownCore
          options={[...options]}
          defaultValue={value}
          onChange={(e) => {
            data[index].value = e;
            setData([...data]);
          }}
        />
      ) : type === 'component' ? (
        value
      ) : type === 'count' ? (
        <CountInputCore
          acceptValue={value}
          onChange={(e) => {
            data[index].value = e;
            setData([...data]);
          }}
        />
      ) : (
        <h1>Ийм сонголт одоогоор байхгүй байна</h1>
      )}
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
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
  inputs: {
    marginTop: '36px',
    overflow: 'auto',
    padding: '0 4px',

    paddingBottom: '80px',

    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  inputItem: {
    marginBottom: '27px',
    letterSpacing: '0.5px',
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
