import React from 'react';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import colors from '../../../constants/colors';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { DropzoneDialogBase } from 'material-ui-dropzone';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import AddIcon from '@mui/icons-material/Add';

export default function Section2(props) {
  const classes = useStyles(props);
  const [open, setOpen] = React.useState(false);
  const [fileObjects, setFileObjects] = React.useState([]);
  const [amount, setAmount] = React.useState('');

  const handleChange = (e) => {
    setAmount(e);
  };

  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
      label: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
    { label: 'Fight Club', year: 1999 },
    {
      label: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
    },
    {
      label: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
    },
    { label: 'Forrest Gump', year: 1994 },
    { label: 'Inception', year: 2010 },
    {
      label: 'The Lord of the Rings: The Two Towers',
      year: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { label: 'Goodfellas', year: 1990 },
    { label: 'The Matrix', year: 1999 },
    { label: 'Seven Samurai', year: 1954 },
    {
      label: 'Star Wars: Episode IV - A New Hope',
      year: 1977,
    },
    { label: 'City of God', year: 2002 },
    { label: 'Se7en', year: 1995 },
    { label: 'The Silence of the Lambs', year: 1991 },
    { label: "It's a Wonderful Life", year: 1946 },
    { label: 'Life Is Beautiful', year: 1997 },
    { label: 'The Usual Suspects', year: 1995 },
    { label: 'Léon: The Professional', year: 1994 },
    { label: 'Spirited Away', year: 2001 },
    { label: 'Saving Private Ryan', year: 1998 },
    { label: 'Once Upon a Time in the West', year: 1968 },
    { label: 'American History X', year: 1998 },
    { label: 'Interstellar', year: 2014 },
    { label: 'Casablanca', year: 1942 },
    { label: 'City Lights', year: 1931 },
    { label: 'Psycho', year: 1960 },
    { label: 'The Green Mile', year: 1999 },
    { label: 'The Intouchables', year: 2011 },
    { label: 'Modern Times', year: 1936 },
    { label: 'Raiders of the Lost Ark', year: 1981 },
    { label: 'Rear Window', year: 1954 },
    { label: 'The Pianist', year: 2002 },
    { label: 'The Departed', year: 2006 },
    { label: 'Terminator 2: Judgment Day', year: 1991 },
    { label: 'Back to the Future', year: 1985 },
    { label: 'Whiplash', year: 2014 },
    { label: 'Gladiator', year: 2000 },
    { label: 'Memento', year: 2000 },
    { label: 'The Prestige', year: 2006 },
    { label: 'The Lion King', year: 1994 },
    { label: 'Apocalypse Now', year: 1979 },
    { label: 'Alien', year: 1979 },
    { label: 'Sunset Boulevard', year: 1950 },
    {
      label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
      year: 1964,
    },
    { label: 'The Great Dictator', year: 1940 },
    { label: 'Cinema Paradiso', year: 1988 },
    { label: 'The Lives of Others', year: 2006 },
    { label: 'Grave of the Fireflies', year: 1988 },
    { label: 'Paths of Glory', year: 1957 },
    { label: 'Django Unchained', year: 2012 },
    { label: 'The Shining', year: 1980 },
    { label: 'WALL·E', year: 2008 },
    { label: 'American Beauty', year: 1999 },
    { label: 'The Dark Knight Rises', year: 2012 },
    { label: 'Princess Mononoke', year: 1997 },
    { label: 'Aliens', year: 1986 },
    { label: 'Oldboy', year: 2003 },
    { label: 'Once Upon a Time in America', year: 1984 },
    { label: 'Witness for the Prosecution', year: 1957 },
    { label: 'Das Boot', year: 1981 },
    { label: 'Citizen Kane', year: 1941 },
    { label: 'North by Northwest', year: 1959 },
    { label: 'Vertigo', year: 1958 },
    {
      label: 'Star Wars: Episode VI - Return of the Jedi',
      year: 1983,
    },
    { label: 'Reservoir Dogs', year: 1992 },
    { label: 'Braveheart', year: 1995 },
    { label: 'M', year: 1931 },
    { label: 'Requiem for a Dream', year: 2000 },
    { label: 'Amélie', year: 2001 },
    { label: 'A Clockwork Orange', year: 1971 },
    { label: 'Like Stars on Earth', year: 2007 },
    { label: 'Taxi Driver', year: 1976 },
    { label: 'Lawrence of Arabia', year: 1962 },
    { label: 'Double Indemnity', year: 1944 },
    {
      label: 'Eternal Sunshine of the Spotless Mind',
      year: 2004,
    },
    { label: 'Amadeus', year: 1984 },
    { label: 'To Kill a Mockingbird', year: 1962 },
    { label: 'Toy Story 3', year: 2010 },
    { label: 'Logan', year: 2017 },
    { label: 'Full Metal Jacket', year: 1987 },
    { label: 'Dangal', year: 2016 },
    { label: 'The Sting', year: 1973 },
    { label: '2001: A Space Odyssey', year: 1968 },
    { label: "Singin' in the Rain", year: 1952 },
    { label: 'Toy Story', year: 1995 },
    { label: 'Bicycle Thieves', year: 1948 },
    { label: 'The Kid', year: 1921 },
    { label: 'Inglourious Basterds', year: 2009 },
    { label: 'Snatch', year: 2000 },
    { label: '3 Idiots', year: 2009 },
    { label: 'Monty Python and the Holy Grail', year: 1975 },
  ];
  const dialogTitle = () => (
    <>
      <span>Upload file</span>
      <IconButton
        style={{ right: '12px', top: '8px', position: 'absolute' }}
        onClick={() => setOpen(false)}
      >
        <CloseIcon />
      </IconButton>
    </>
  );
  const send = () => {
    console.log('user', open);
  };

  return (
    <Container disableGutters maxWidth={false} className={classes.root}>
      <div className={classes.titleNews}>Зар нэмэх</div>

      <Container disableGutters maxWidth={false} className={classes.container}>
        <div className={classes.editRow}>
          <div className={classes.editRowTitle}>Зарын гарчиг*</div>
          <TextField id='outlined-basic' label='Гарчгийн нэр' variant='outlined' />
        </div>
        <div className={classes.editRow}>
          <div className={classes.editRowTitle}>Утасны дугаар*</div>
          <TextField id='outlined-basic' label='Утасны дугаар' variant='outlined' />
        </div>
        <div className={classes.editRow}>
          <div className={classes.editRowTitle}>Е-Мэйл хаяг*</div>
          <TextField id='outlined-basic' label='Е-Мэйл хаяг' variant='outlined' />
        </div>
        <div className={classes.editRow}>
          <div className={classes.editRowTitle}>Зарын төрөл*</div>
          <Autocomplete
            disablePortal
            id='combo-box-demo'
            autoHighlight
            options={top100Films}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} label='Төрөл' />}
          />
        </div>
        <div className={classes.editRow}>
          <div className={classes.editRowTitle}>Таг*</div>
          <Autocomplete
            multiple
            disablePortal
            id='combo-box-demo'
            options={top100Films}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} label='Төрөл' />}
          />
        </div>
        <div className={classes.editRow}>
          <div className={classes.editRowTitle}>Зураг оруулах*</div>
          <div>
            <Button
              style={{ backgroundColor: '#AA7654', height: '80px', width: '80px' }}
              variant='contained'
              color='primary'
              onClick={() => setOpen(true)}
            >
              <AddIcon style={{ height: '50px', width: '50px' }} />
            </Button>
            <DropzoneDialogBase
              dialogTitle={dialogTitle()}
              acceptedFiles={['image/*']}
              fileObjects={fileObjects}
              cancelButtonText={'cancel'}
              submitButtonText={'submit'}
              maxFileSize={5000000}
              open={open}
              onAdd={(newFileObjs) => {
                console.log('onAdd', newFileObjs);
                setFileObjects([].concat(fileObjects, newFileObjs));
              }}
              onDelete={(deleteFileObj) => {
                console.log('onDelete', deleteFileObj);
              }}
              onClose={() => setOpen(false)}
              onSave={() => {
                console.log('onSave', fileObjects);
                setOpen(false);
              }}
              showPreviews={true}
            />
          </div>
        </div>
        <div className={classes.editRow}>
          <div className={classes.editRowTitle}>Үнэ*</div>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor='outlined-adornment-amount'>Төгрөг</InputLabel>
            <OutlinedInput
              id='outlined-adornment-amount'
              value={amount}
              onChange={(e) => handleChange(e.target.value)}
              endAdornment={<InputAdornment position='start'>₮</InputAdornment>}
              label='Төгрөг'
            />
          </FormControl>
        </div>

        <div className={classes.btnSend}>
          <Button
            variant='contained'
            color='primary'
            className={classes.send}
            onClick={() => {
              send();
            }}
          >
            Илгээх
          </Button>
        </div>
      </Container>
    </Container>
  );
}

const useStyles = makeStyles({
  root: {
    minHeight: (props) => (props.phone ? 780 : 560),
    width: '100%',
    zIndex: '1',
    fontFamily: 'Roboto Condensed',
  },
  btnSend: {
    display: 'flex',
    justifyContent: 'center',
  },
  send: {
    backgroundColor: '#AA7654',
    marginTop: '40px',
  },
  rec: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#252525',
    flexDirection: 'column',
    padding: '20px',
    textAlign: 'center',
  },
  recPhoneButton: {
    marginTop: '5px',
    color: 'white',
    width: '100%',
    padding: '8px 5px',
    background:
      'linear-gradient(178.42deg, #F8D4A0 -60.84%, #E49461 1.15%, #954D1D 75.77%, #C0703D 139.77%)',
  },
  editRow: {
    display: 'flex',
    flexDirection: 'column',
  },
  recPhone: {
    color: 'white',
    fontSize: '15px',
    marginTop: '25px',
  },
  recMkv: {
    color: 'white',
    fontSize: '22px',
    fontWeight: '700',
    marginTop: '5px',
  },
  recSale: {
    color: 'white',
    fontSize: '15px',
    marginTop: '25px',
  },
  recCompany: {
    color: 'white',
    fontSize: '15px',
    marginTop: '5px',
  },
  recImg: {
    height: '150px',
    width: '150px',
  },
  recName: {
    color: '#D38F63',
    fontWeight: 'bold',
    fontSize: '25px',
    marginTop: '10px',
  },
  like: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: '20px',
    width: '100%',
  },
  likeTitle: {
    fontSize: '30px',
    fontWeight: 'bold',
    marginTop: '30px',
    color: '#D38F63',
  },
  newsGallery: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  tabContainer: {
    display: 'grid',
    height: '200px',
    gridTemplate: 'repeat(4, 1fr) / repeat(4, 1fr)',
    gap: '20px 5px',
  },
  btnContainer: {
    marginTop: '10px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  tab: {
    width: 'auto',
    padding: '10px 30px',
  },
  activeTab: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#D38F63',
    color: 'white',
    padding: '10px 30px',
  },
  tabs: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '50px',
    justifyContent: 'flex-start',
    marginBottom: '10px',
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    fontSize: '16px',
    background:
      'linear-gradient(178.42deg, #F8D4A0 -60.84%, #E49461 1.15%, #954D1D 75.77%, #C0703D 139.77%)',
    padding: '5px 10px',
  },

  trBottom: {
    textAlign: 'left',
  },
  trNormal: {
    textAlign: 'left',
    fontWeight: '300!important',
    borderBottom: '1px solid #F0F0F0',
  },
  tr: {
    color: '#D38F63',
    textAlign: 'left',
  },
  newsText: {
    textAlign: 'justify',
    fontWeight: '300',
    lineHeight: '25px',
  },
  containerRec: {
    display: 'flex',
    flexDirection: 'column',
  },
  infoTitle: {
    color: '#D38F63',
    fontSize: '20px',
    fontWeight: 'bold',
    borderRadius: '2px',
    marginBottom: '10px',
    padding: '5px',
  },
  containerNews: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '80%',
    height: '100px',
    paddingRight: '30px',
  },
  container: {
    display: 'flex',
    width: (props) => (props.phone ? '100%' : '1100px'),
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: (props) => (props.phone ? '10px' : '0px'),
  },
  titleNews: {
    fontWeight: 'bold',
    fontSize: '40px',
    lineHeight: '70px',
    color: '#D38F63',
    textAlign: 'center',
  },
  editRowTitle: {
    fontWeight: '300',
    fontSize: '25px',
    lineHeight: '70px',
    color: '#D38F63',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '20px',
  },
  calendar: {
    fontWeight: '400',
    fontSize: '12px',
    textAlign: 'center',
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: '25px',
    lineHeight: '70px',
    color: '#D38F63',
  },
  textContainer: {
    width: '100%',
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'flex-start',
    minHeight: '250px',
    paddingTop: '20px',
    marginBottom: '70px',
    paddingLeft: (props) => (props?.phone ? '10%' : '10%'),
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: '#AA7654',
    marginTop: (props) => (props?.phone ? '10px' : '80px  '),
  },
  avatarColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontWeight: '700',
    fontSize: (props) => (props?.phone ? 8 : 18),
    marginLeft: 8,
  },
  column: {
    display: 'flex',
    alignItems: 'center',
  },
  area: {
    display: 'flex',
    alignItems: 'center',
    color: colors.brandTextColor,
    fontWeight: '700',
    marginRight: '10px',
    fontSize: (props) => (props?.phone ? 8 : 18),
  },
  avatarColumnTime: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontWeight: '300',
    color: 'white',
    fontSize: (props) => (props?.phone ? 4 : 12),
  },
  title: {
    display: 'flex',
    alignItems: 'flex-end',
    fontSize: (props) => (props?.phone ? 20 : 30),
    fontWeight: '700',
    textAlign: 'left',
    color: 'white',
    maxWidth: '300px',
    minHeight: 30,
  },
  description: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 15,
    fontWeight: '300',
    textAlign: 'left',
    maxWidth: '350px',
    color: 'white',
    minHeight: 64,
  },
  button: {
    backgroundColor: colors.brandTextColor,
    width: 100,
    '&:hover': {
      backgroundColor: colors.brandTextColor,
      color: 'white',
    },
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    '&:hover': {
      color: 'white',
    },
  },
  thirtyPercentSquare: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 140,
    position: 'absolute',
    bottom: '-1%',
    right: '25%',
    borderRadius: 27,
    zIndex: 999,
    backgroundColor: colors.orange,
  },
  thirtyPercentRound: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 140,
    position: 'absolute',
    bottom: '-1%',
    right: '25%',
    borderRadius: 70,
    zIndex: 10,
    backgroundColor: colors.orange,
  },
  saleText: {
    color: 'white',
    fontSize: 36,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  saleLine: {
    backgroundColor: 'white',
    height: 3,
    width: 45,
  },
  saleLineLong: {
    marginTop: 8,
    backgroundColor: 'white',
    height: 3,
    width: 60,
  },
  dots_container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  dot: {
    height: 15,
    width: 15,
    backgroundColor: 'white',
    opacity: '30%',
    borderRadius: 7,
    margin: 5,
    marginBottom: 10,
    cursor: 'pointer',
  },
  dot_active: {
    height: 15,
    width: 30,
    backgroundColor: colors.brandTextColor,
    opacity: '100%',
    borderRadius: 7,
    margin: 5,
    marginBottom: 10,
    cursor: 'pointer',
  },
  dots_seperator: {
    height: 3,
    width: 50,
    backgroundColor: 'white',
    opacity: '30%',
    borderRadius: 7,
    margin: 5,
    marginBottom: 10,
    cursor: 'pointer',
  },
  dots_seperator_active: {
    height: 3,
    width: 50,
    backgroundColor: 'white',
    opacity: '100%',
    borderRadius: 7,
    margin: 5,
    marginBottom: 10,
    cursor: 'pointer',
  },
});
