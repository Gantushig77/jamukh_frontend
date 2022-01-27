import React, { useState } from 'react';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Title from '../../../components/title/title';
import Background from '../../../assets/background/background.png';
import Avatar from '../../../assets/images/avatar.jpg'
import './Section.css'


export default function Section2(props) {

  const classes = useStyles(props);
  const [tab, setTab] = useState('Энгийн');
  const [tabButton, setTabButton] = useState('member');
  const [count, setCount] = useState(0);

  const data = [
    {
      description:'Зах зээлийн өрсөлдөөнд манлайлахад хөтөч тань болно',
      subDescription:'“Үнэ цэнээ хэзээ ч алдахгүй өвлөгдөн үлдэх эд таны гарт”'
    },
   {
      description:'Мэдрэмжтэй чадварлаг гишүүд,үнэ цэнэтэй мэдээлэлээр хангах.',
      subDescription:'“МЭДРЭМЖ ХУРД ТАНЫГ АМЖИЛТАНД ХӨТЛӨНӨ”'
    },
   {
      description:'Тогтвортой сүлжээг хөгжүүлэх, талуудын харилцан ашигтай түншлэл бий болгох.',
      subDescription:'“ТАНЫГ АМЖИЛТАНД ХӨТЛӨХ ТОГТВОРТОЙ СҮЛЖЭЭ”'
    },
    {
      description:'Чадварлаг оролцогчдын чанартай бүтээгдэхүүнийг гишүүд үйлчлүүлэгчдэд нийлүүлж, олон талын дэмжлэг үзүүлнэ.',
      subDescription:'“ЧАДВАРЛАГ ОРОЛЦОГЧ ЧАНАРТАЙ БҮТЭЭГДЭХҮҮН”'
    },
    {
      description:'Үнэ цэнэтэй бараа бүтээгдэхүүнийг, үнэ цэнэтэй харилцаанд тулгуурлан бүтээх.',
      subDescription:'“ҮНЭ ЦЭНЭТЭЙ БАРАА  ҮНЭ ЦЭНЭТЭЙ ХАРИЛЦАА”'
    },
   {
      description:'Бизнесийн олон талын хамтын ажиллагааг хангах, тогтвортой сүлжээг бүрдүүлж, харилцан ашигтай түншлэлийг бэхжүүлнэ.',
      subDescription:'Бизнесийн олон талын хамтын ажиллагааг хангах, тогтвортой сүлжээг бүрдүүлж, харилцан ашигтай түншлэлийг бэхжүүлнэ.'
    },
  ];
  return (
    <div className={classes.root}>
      <Title name="Зэрэглэл" />
      {props?.parentId ? (
        <></>
      ) : (
        <>
          <Container className={classes.container}>
            <div className={classes.members}>
              <div className={classes.tabs}>
                <div className={tab === 'Энгийн' ? classes.tabActive : classes.tab} onClick={() => {return setTab('Энгийн') ,setCount(0) }}>
                  Энгийн
                </div>
                <div className={tab === 'Bronze' ? classes.tabActive : classes.tab} onClick={() => { return setTab('Bronze'),setCount(1) }}>
                  Bronze
                </div>
                <div className={tab === 'Silver' ? classes.tabActive : classes.tab} onClick={() => { return setTab('Silver'),setCount(2) }}>
                  Silver
                </div>
                <div className={tab === 'Gold' ? classes.tabActive : classes.tab} onClick={() => { return setTab('Gold'),setCount(3) }}>
                  Gold
                </div>
                <div className={tab === 'Platinium' ? classes.tabActive : classes.tab} onClick={() => { return setTab('Platinium'),setCount(4) }}>
                  Platinium
                </div>
                <div className={tab === 'Vip' ? classes.tabActive : classes.tab} onClick={() => { return setTab('Vip'),setCount(5) }}>
                  Vip
                </div>
              </div>
              <div className={classes.subTitle}>
                <div className={classes.tabButtons}>
                  <div className={tabButton === 'member' ? classes.tabButtonActive : classes.tabButton} onClick={() => { setTabButton('member') }}>
                    Гишүүд
                  </div>
                  <div className={tabButton === 'request' ? classes.tabButtonActive : classes.tabButton} onClick={() => { setTabButton('request') }}>
                    Хүсэлтүүд
                  </div>
                </div>
                <div className={classes.counterMember}>{tab} зэрэглэлийн 132 гишүүд байна</div>
              </div>
              <div className={classes.membersContainer}>
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
                <Member />
              </div>
              <div className={classes.info}>
                <div className={classes.rowNumber}><div className={classes.number}>1</div>  <div className={classes.numberDes}>“Жамух пропертиз”-н гишүүнчлэл нь дараах үндсэн 6 сонголттой байна: VIP, Platinium, Gold, Silver, Bronze ба Member. Сонирхогч хувь хүн, эсхүл байгууллага, нь Гишүүнчлэлийн төрлөөс өөрийн хэрэгцээ, сонирхолд  тулгуурлан  сонголтоо  хийх  эрхтэй  ба  хураамжийг  Төлбөрийн  нөхцөлийн  дагуу барагдуулах үүрэгтэй.</div></div>
                <div className={classes.rowNumber}><div className={classes.number}>2</div>  <div className={classes.numberDes}> Гишүүнчлэлийн хугацаа нийт 12 сар байх ба гишүүний хураамж төлсөн өдрөөс эхлэн “Жамух пропертиз”- н  Гишүүнээр  тооцогдон, “Жамух пропертиз”-зохион  байгуулж  буй  нэр  заасан арга хэмжээ, үйл  ажиллагаа, гишүүдийн дотоод мэдээлэл \ангилал бүрээр\, үзүүлдэг  үйлчилгээний  талаарх  мэдээлэл,  борлуулагдаж буй бүтээгдэхүүн мэдээлэл хийсэн судалгаа, бусад гишүүдийн хүсэж буй бараа бүтээгдэхүүн зэргийн мэдээллийг авах эрх эдэлнэ.</div></div>
                <div className={classes.rowNumber}><div className={classes.number}>3</div>  <div className={classes.numberDes}> Гишүүнчлэлийн төрлөө шатлал шатлалаар ахиулах эрхийг гишүүн бүр тэгш эдэлнэ.</div></div>
                <div className={classes.rowNumber}><div className={classes.number}>4</div>  <div className={classes.numberDes}>Гишүүн  нь  “Жамух пропертиз”-н  үйл  ажиллагаанд  идэвхтэй  оролцох,   санал  сэтгэгдлээ  чөлөөтэй илэрхийлэх, хамтран ажиллах/туслах, түүнчлэн Сонирхогч болон олон нийтэд байгууллагын үйл ажиллагааг сурталчлах, тэднийг уриалах зэрэг эрх, үүргийг эдэлнэ</div></div>
           
               
              </div>
            </div>
            <div className={classes.request}>
               
               <div className={classes.description}> 
                 {data[count].description}
                </div>
                <div className={classes.subDescription}> 
                 {data[count].subDescription}
                </div>
                <div className={classes.reqButton}>
                    Хүсэлт илгээх
                </div>  
            </div>
          </Container>

        </>
      )}
    </div>
  );
}

const Member = (props) => {
  const classes = useStyles(props.phone);
  return (
    <div className={classes.cardRoot}>
      <img src={Avatar} className={classes.imageCard} alt={''} />
      <div className={classes.lastName}>
        Jamukha
      </div>
      <div className={classes.firstName}>
        Jadraan
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'relative',
    paddingTop: '90px',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: '100'
  },
  title:{
    color:'#C19D65',
    fontSize:'25px',
    fontWeight:'300'
  },

  rowNumber:{
    display:'flex',
    width:'100%',
    alignItems:'center',
    marginBottom:'10px',
  },
  number:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    fontWeight:'300',
    color:'#C19D65',
    borderRadius:'100%',
    border:'1px solid #C19D65',
    marginRight:'10px',
    height:'40px',
    width:'40px',
  },
  numberDes:{
    width: 'calc(100% - 40px)'
  },
  description:{
    color:'white',
    fontSize:'20px',
    marginTop:'30px',
  },
  subDescription:{
    display:'flex',
    justifyContent:'flex-end',
    color:'#C19D65',
    fontSize:'20px',
    marginTop:'30px'
  },
  reqButton:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#C19D65',
    color:'white',
    fontSize:'22px',
    padding:'8px',
    marginTop:'30px',
    borderRadius:'5px',
  },

  membersContainer: {
    display: 'flex',
    margin: '20px 0px',
    flexWrap: 'wrap',
  },
  info: {
    marginTop:'60px',
    color:'white',
    padding: '20px 10px',
    width:'100%',
    fontSize:'16px',
    border:'1px solid #C19D65',
    textAlign:'justify',
    backgroundColor:'#161515e3',
    borderRadius:'10px'
  },
  container: {
    display: 'flex',
    maxWidth: (props) => (props.phone ? '100%' : '1300px'),
    flexDirection: (props) => (props.phone ? 'column' : 'row'),
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    position: 'relative',
    backgroundImage: `url(${Background})`,
    padding: "20px",
    marginTop: '20px',
    border: '1px solid #C6824D',
  },
  members: {
    width: '68%',
    marginRight: '5px'
  },
  request: {
    display:'flex',
    flexDirection:'column',
    width: '25%',
    padding:'10px',
    border:'1px solid #C19D65',
    textAlign:'center',
    backgroundColor:'#161515e3'
  },
  tabs: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid white',
    padding: '15px 0px'
  },
  tab: {
    fontSize: '25px',
    paddingRight: '15px',
    color: 'white',
    cursor: 'pointer',
  },
  tabActive: {
    fontSize: '25px',
    paddingRight: '15px',
    color: '#C19D65',
    cursor: 'pointer'
  },
  subTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '20px'
  },
  tabButtons: {
    display: 'flex',
    alignItems: 'center',

  },
  tabButton: {
    color: 'white',
    cursor: 'pointer',
    margin: '10px',
  },
  tabButtonActive: {
    backgroundColor: '#C19D65',
    padding: "8px",
    borderRadius: "5px",
    cursor: 'pointer',
    margin: '10px',
  },
  counterMember: {
    color: 'white',
    fontSize: '18px'
  },

  cardRoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '20%',
    color: 'white',
    fontSize: '18px',
    marginTop: '10px'
  },
  imageCard: {
    width: '120px',
    height: '120px',
    borderRadius: '100%',
  },
  lastName: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: '12px'
  },
  firstName: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
});
