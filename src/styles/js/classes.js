import { makeStyles } from '@mui/styles';
import colors from '../../constants/colors';

const useAppStyles = makeStyles({
  loading: {
    color: '#6A67D3',
    height: window.screen.availHeight - 64,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  chatContainer: {
    marginTop: '-100px',
    zIndex: 9999,
    height: 100,
    width: 100,
    left: '91%',
    right: 20,
    bottom: 20,
    position: 'sticky',
  },
  body: {
    marginBottom: 50,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  toggleButton: {
    backgroundColor: 'rgba(106, 103, 211, 0.25)',
    marginBottom: 10,
  },
  colCardTitle: {
    fontFamily: 'SF Pro Display',
    fontSize: 27,
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
  },
  titleToggleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '1px solid lightgray',
    marginBottom: 30,
    marginTop: 30,
  },
  cardRoot: {
    maxWidth: 210,
    maxHeight: 400,
    height: 400,
    width: '100%',
    marginBottom: 20,
    textAlign: 'left',
    borderRadius: 17,
    border: '1px solid lightgray',
    marginLeft: 20,
    marginRight: 20,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'SF Pro Display',
  },
  cardDesc: {
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'SF Pro Display',
    color: 'gray',
    paddingRight: 32,
    margin: 0,
    height: 130,
  },
  cardSold: {
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'SF Pro Display',
    color: 'gray',
    paddingRight: 32,
  },
  cardPriceContainer: {
    display: 'flex',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  cardPrice: {
    fontSize: 17,
    fontWeight: '500',
    fontFamily: 'SF Pro Display',
    color: '#6A67D3',
    paddingRight: 5,
  },
  cardUnit: {
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'SF Pro Display',
    color: 'gray',
  },
  media: {
    height: 140,
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
  qrScannerContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    borderRadius: 21,
    padding: 0,
    backgroundColor: 'white',
    maxWidth: 450,
    width: '100%',
    maxHeight: '100%',
    outline: 'none',
    border: 'none',
    overflow: 'hidden',
  },
  qrScannerContainerHome: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1,
    borderRadius: 21,
    padding: 0,
    backgroundColor: 'white',
    maxWidth: 450,
    width: 450,
    maxHeight: '100%',
    outline: 'none',
    border: 'none',
    overflow: 'hidden',
  },
  orderRegisterModalBody: {
    height: '100%',
    textAlign: 'left',
    padding: '30px',
    '& .MuiFormLabel-root': {
      fontSize: 14,
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 11,
      fontSize: 14,
      backgroundColor: colors.lightGray,
    },
  },
  addOrderUsername: {
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 17,
    marginTop: 25,
  },
  kilCounterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  modalButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: '100%',
    position: 'sticky',
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
  shopMeatText: {
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    paddingLeft: 20,
    color: 'black',
    opacity: '0.5',
  },
  possibleKilo: {
    fontStyle: 'italic',
    textAlign: 'left',
    color: 'black',
    opacity: '0.5',
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: 'SF Pro Display',
    fontSize: 14,
  },
});

export default useAppStyles;
