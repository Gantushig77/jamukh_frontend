import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { CSS_HELPER } from '../../constants/helper';
import colors from '../../constants/colors';

export default function OptionsCore({
  acceptValue = 0,
  options = ['Эхний сонголт', 'Удаах сонголт'],
  onChange = () => {},
  component,
  marginRight = '',
  marginLeft = '',
  marginTop = '',
  marginBottom = '',
  endButton = false,
  endButtonText = '',
  endIcon = null,
  endButtonFunction = null,
}) {
  const classes = useStyles();
  const [option, setOption] = useState(acceptValue);
  useEffect(() => {
    setOption(acceptValue);
  }, [acceptValue]);
  useEffect(() => {
    onChange(option);
  }, [option, onChange]);
  return (
    <div
      className={classes.root}
      style={{
        marginRight: marginRight,
        marginLeft: marginLeft,
        marginTop: marginTop,
        marginBottom: marginBottom,
      }}
    >
      <div className={classes.options}>
        <div className={classes.optionsSeperate}>
          {options.map((item, index) => (
            <h1
              key={'options core item' + index}
              className={option === index ? classes.optionActive : classes.option}
              onClick={() => setOption(index)}
            >
              {item}
            </h1>
          ))}
        </div>
        {endButton && (
          <div className={classes.option2Container} onClick={() => endButtonFunction()}>
            <img src={endIcon} alt={'end icon'} className={classes.endIcon} />
            <h1 className={classes.option2}>{endButtonText}</h1>
          </div>
        )}
      </div>
      {component}
    </div>
  );
}

const option = {
  ...CSS_HELPER.initializeFont,
  borderRadius: '17px',
  fontSize: '14px',
  padding: '11px 21px',
  fontWeight: '500',
  border: '17px',
  color: 'black',
  cursor: 'pointer',
  transition: 'all 0.3s',
};

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: 'max-content',
  },
  options: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  optionsSeperate: {
    display: 'flex',
    flexDirection: 'row',
  },
  option: {
    ...option,
  },
  option2Container: {
    borderRadius: '17px',
    backgroundColor: '#FEEEEC',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    paddingLeft: 21,
  },
  option2: {
    ...option,
    paddingLeft: 10,
    color: colors.orange,
  },
  optionActive: {
    ...option,
    color: 'white',
    backgroundColor: '#6A67D3',
  },
  endIcon: {
    height: 16,
    width: 16,
  },
}));
