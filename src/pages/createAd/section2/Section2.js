import React, {  useState  } from 'react';
import { makeStyles } from '@mui/styles';
import Title from '../../../components/title/title'
import Background1 from '../../../assets/background/background.png'
import Car from '../../../components/create/car'
import Antique from '../../../components/create/antique'
import Painting from '../../../components/create/painting'
import Land from '../../../components/create/land'
import Property from '../../../components/create/property'


export default function Section2(props) {
  const classes = useStyles(props);
  const [tab, setTab] = useState('Эртний эдлэл');

  return (
    <div className={classes.root}>
     
      <Title name="Зар нэмэх"/>
        <div className={classes.container}>
            <div className={classes.tabs}>
              <div className={tab === 'Эртний эдлэл' ? classes.activeTab:classes.tab} onClick={()=>{setTab('Эртний эдлэл')}}>
                  Эртний эдлэл
              </div>  

              <div className={tab === 'Үл хөдлөх' ? classes.activeTab:classes.tab} onClick={()=>{setTab('Үл хөдлөх')}}>
                  Үл хөдлөх 
              </div>  
              <div className={tab === 'Машин' ? classes.activeTab:classes.tab} onClick={()=>{setTab('Машин')}}>
                  Машин
              </div>  
              <div className={tab === 'Газар' ? classes.activeTab:classes.tab} onClick={()=>{setTab('Газар')}}>
                  Газар
              </div>  
              <div className={tab === 'Уран зураг' ? classes.activeTab:classes.tab} onClick={()=>{setTab('Уран зураг')}}>
                  Уран зураг
              </div>  
            </div>  
            <div className={classes.categoryInfo}>
                Категорио сонгоно уу
            </div>  
            <div className={classes.info}>
                Ижил зар оруулахыг хориглоно. <br/>
                Хэрвээ Та ижил зар өмнө нь оруулсан бол <br/>
                сайтны дээд хэсэгт байрлах «Миний зарууд»-аас харна уу.
            </div>  
            {
              tab === "Эртний эдлэл"?
              <Antique/>
              :
              tab ==="Үл хөдлөх"
              ?<Property/>
              : tab ==="Машин"?
              <Car/>
              : tab ==="Уран зураг"?<Painting/>
              : tab ==="Газар"?<Land/>:""
            }
        </div>  

    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
    paddingTop:'80px',
    width: '100%',
    zIndex: '1',
    fontFamily: 'Roboto, sans-serif',
    minHeight:'100vh',
    color:'white',
    fontWeight:'100'
  },
  categoryInfo:{
    display:'flex',
    fontSize:'20px',
    marginTop:'20px'
  },
  info:{
    display:'flex',
    justifyContent:'center',
    marginTop:'30px',
    fontSize:'18px',
    textAlign:'center',
    color: '#C19D65'
  },
  container:{
    width:(props) => (props.phone ? '100%' : '1300px'),
    marginTop:'50px',
    backgroundImage:`url(${Background1})`,
    backgroundPosition:"center",
    backgroundSize:'cover',
    backgroundRepeat:'no-repeat',
    padding:(props) => (props.phone ? '10px 0px' : '15px 30px'),
  },
  tab: {
    width: 'auto',
    padding: (props) => (props.phone ? '5px' : '5px 30px'),
    fontSize: (props) => (props.phone ? '12px' : '22px'),
    cursor:'pointer',
    marginBottom:'10px',
    borderBottom:'2px solid rgba(0, 0, 0, 0)',
  },

  tabs: {
    display: 'flex',
    width:'100%',
    justifyContent:'space-between',
    borderBottom:'1px solid white'
  },
  activeTab:{ 
    width: 'auto',
    padding: (props) => (props.phone ? '5px' : '5px 30px'),
    fontSize: (props) => (props.phone ? '12px' : '22px'),
    cursor:'pointer',
    color:'#C19D65',
    borderBottom:'2px solid #C19D65',
    marginBottom:'10px'
  },
});
