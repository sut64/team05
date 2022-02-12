import React from 'react';
import NavBar from './NavBar';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from "@material-ui/core/Grid";

import pic1 from '../pictures/SonicFixComputer.png';
import pic2 from '../pictures/istockphoto-1159368222-612x612.jpg';
import pic22 from '../pictures/WorkReceive.png';
import pic3 from '../pictures/Various-Computer-Parts.jpg';
import pic4 from '../pictures/Reciept.png';
import pic5 from '../pictures/warrantee.png';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },

    container: {
      marginTop: theme.spacing(3),
      paddingBottom: theme.spacing(4),
    },

    root: {
      maxWidth: 'auto',
    },

  })
);

export default function HomeEmployee() {
  const classes = useStyles();
  const [expanded1, setExpanded1] = React.useState(false);
  const handleExpandClick1 = () => {
    setExpanded1(!expanded1);
  };

  const [expanded2, setExpanded2] = React.useState(false);
  const handleExpandClick2 = () => {
    setExpanded2(!expanded2);
  };

  const [expanded3, setExpanded3] = React.useState(false);
  const handleExpandClick3 = () => {
    setExpanded3(!expanded3);
  };

  const [expanded4, setExpanded4] = React.useState(false);
  const handleExpandClick4 = () => {
    setExpanded4(!expanded4);
  };

  const [expanded5, setExpanded5] = React.useState(false);
  const handleExpandClick5 = () => {
    setExpanded5(!expanded5);
  };

  const [expanded6, setExpanded6] = React.useState(false);
  const handleExpandClick6 = () => {
    setExpanded6(!expanded6);
  };

 

  return (
    <div>
      <NavBar />
      <div className={classes.drawerHeader} />

      <Container className={classes.container} maxWidth="lg">
      <Typography component="div" style={{ height: '5vh' }} />
        <h1 style={{ textAlign: "center" }}>ระบบแจ้งซ่อมคอมพิวเตอร์</h1>
        <Typography component="div" style={{ height: '1vh' }} />


        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Card className={classes.root} >
              <CardHeader
                title="ระบบบันทึกการขอแจ้งซ่อมคอมพิวเตอร์"
                subheader="นายชินาธิป ชนะราวี"
              />
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="200"
                  image={pic2}
                  title="Contemplative Reptile"
                />
                <CardContent>

                  <Typography variant="body2" color="textPrimary" component="p">
                  ระบบบันทึกการขอแจ้งซ่อมคอมพิวเตอร์ เมื่อทำการ Login เข้าไปใช้งานในฐานะลูกค้าแล้วจะสามารถทำการแจ้งซ่อมคอมพิวเตอร์ได้โดย
                  จะขึ้นชื่อลูกค้าให้เห็นและมีข้อมูลที่ให้กรอกข้อมูลในส่วนต่างๆ เช่น อุปกรณ์ที่นำมาซ่อม, อายุของอุปกรณ์ที่นำมาซ่อม, ปัญหาการแจ้งซ่อม 
                  และในส่วนของข้อมูลประเภทการแจ้งซ่อมและความเร่งด่วนมีให้เลือกตามความต้องการได้ และวันที่ทำการแจ้งซ่อมนั้นจะบันทึกให้เองเป็นเวลาตอน
                  ที่ทำการกดปุ่มบันทึกเพื่อขอแจ้งซ่อม เมื่อทำการกดปุ่มบันทึกแล้วระบบจะทำการบันทึกข้อมูลที่ได้กรอกไว้ลงไปในรายการการขอแจ้งซ่อม
                  ซึ่งจะเก็บไว้เป็นงานแจ้งซ่อมไว้เพื่อทำการซ่อมคอมพิวเตอร์ต่อไป
                  </Typography>
                </CardContent>
              </CardActionArea>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded1,
                })}
                onClick={handleExpandClick1}
                aria-expanded={expanded1}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
              <Collapse in={expanded1} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    ในบทบาทของ ลูกค้าที่เป็นสมาชิก<br />
                    ฉันต้องการ ให้ระบบสามารถลงบันทึกข้อมูลการขอแจ้งซ่อมคอมพิวเตอร์ลงในรายการงานแจ้งซ่อม<br />
                    เพื่อ ให้ลูกค้าสามารถทำการขอแจ้งซ่อมคอมพิวเตอร์ได้</Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>


          <Grid item xs={4}>
            <Card className={classes.root}>
              <CardHeader
                title="ระบบรับงานซ่อมคอมพิวเตอร์" 

                subheader="นายภานุวัฒน์ สุวรรณ์"
              />
              <br />
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="200"
                  image={pic22}
                  title="Contemplative Reptile"
                />
                <CardContent>

                  <Typography variant="body2" color="textPrimary" component="p">
                    ระบบรับงานซ่อมคอมพิวเตอร์ เป็นระบบที่พนักงานของร้านสามารถ log in เข้ามาในฐานะ พนักงานร้านซ่อมคอมพิวเตอร์เพื่อเลือกรับงานซ่อมต่างๆ
                    ที่ได้รับแจ้งมาจากลูกค้านำไปดำเนินการซ่อมได้ โดยพนักงานสามารถเลือกงานที่จะทำการซ่อมจากรายการงานซ่อมได้ผ่านระบบ 
                    โดยการเลือกงานที่จะซ่อม งานที่ได้รับเลือกมาซ่อมไปแล้วจะไม่ปรากฎเป็นข้อมูลงานส่วนที่สามารถเลือกรับได้ 
                    เลือกลักษณะการทำงาน ระบุวันที่จะงานจะเสร็จ 
                    ระบุค่าบริการ พร้อมกรอกพร้อมกรอกรหัสการซ่อมงานให้กับงานนั้นๆ เสร็จแล้วช่างซ่อมก็สามารถดำเนินการซ่อมงานที่รับมาได้
                    
                    <br /><br /><br />
                    
                  </Typography>
                </CardContent>
              </CardActionArea>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded2,
                })}
                onClick={handleExpandClick2}
                aria-expanded={expanded2}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
              <Collapse in={expanded2} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    ในบทบาทของ พนักงานร้านซ่อมคอมพิวเตอร์<br />
                    ฉันต้องการ ให้ระบบสามารถบันทึกการรับงานซ่อมได้<br />
                    เพื่อ เลือกงานที่ยังไม่ได้รับการซ่อมนำมาทำการซ่อมได้</Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>


          <Grid item xs={4}>
            <Card className={classes.root}>
              <CardHeader
                title="ระบบบันทึกการใช้อะไหล่ในการซ่อมคอมพิวเตอร์"
                subheader="นายภัทรพงษ์ พิมหอม"
              />
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="200"
                  image={pic3}
                  title="Contemplative Reptile"
                />
                <CardContent>

                  <Typography variant="body2" color="textPrimary" component="p">
                    ระบบบันทึกการใช้อะไหล่ในการซ่อมคอมพิวเตอร์นั้นผู้ใช้จะต้องทำการ login เข้าสู่ระบบเป็น พนักงาน
                    ร้านซ่อมคอมพิวเตอร์ โดยระบบนี้พนักงานจะสามารถเลือกงานการซ่อมที่ต้องการบันทึกได้ โดยงานนั้นจะต้องมีช่างที่ได้รับงานนั้นแล้ว ทำการเลือกอะไหล่จากอะไหล่ทั้งหมดที่มีในคลัง กรอกจำนวนที่ใช้ และราคารวมทั้งหมด
                    ของรายการนี้  โดยเมื่อทำการบันทึกระบบจะทำการบันทึก พนักงานที่ทำการบันทึก และเวลาที่ทำการบันทึก ไปด้วยพร้อมกับข้อมูลที่กรอกไปก่อนหน้า โดยจะมีตารางที่แสดงรายละเอียดคราวๆ ชื่ออุปกรณ์ที่แจ้งซ่อม, ปัญหา
                    ของการแจ้งซ่อม, ช่างที่รับซ่อมงานนี้ เพื่อให้ง่ายต่อการเลือกงานที่ช่างซ่อมคอมพิวเตอร์มีในระบบ
                  </Typography>
                </CardContent>
              </CardActionArea>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded3,
                })}
                onClick={handleExpandClick3}
                aria-expanded={expanded3}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
              <Collapse in={expanded3} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    ในบทบาทของ พนักงานร้านซ่อมคอมพิวเตอร์<br />
                    ฉันต้องการ ระบบที่สามารถบันทึกการใช้อะไหล่ในการซ่อมคอมพิวเตอร์ในแต่ละงาน<br />
                    เพื่อ ให้พนักงานสามารถรู้ได้ว่างานซ่อมแต่ละงานนั้นได้ใช้อะไหล่ใดบ้างในงานซ่อมคอมพิวเตอร์</Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>


          <Grid item xs={4}>
            <Card className={classes.root}>
              <CardHeader
                title="ระบบบันทึกใบเสร็จรับเงิน"
                subheader="นายบุญญฤทธิ์ สุขมงคล"
              />
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  alt="RecieptHistory"
                  image={pic4}
                  title="RecieptHistory"
                />
                <CardContent>

                  <Typography variant="body2" color="textPrimary" component="p">
                  ระบบบันทึกใบเสร็จรับเงินของร้าน SE Computer เป็นระบบที่ให้พนักงานร้านซ่อมคอมพิวเตอร์ซึ่งเป็นสมาชิกของระบบสามารถ Login 
                  เข้าระบบเพื่อบันทึกใบเสร็จรับเงิน ในระบบบันทึกใบเสร็จรับเงินจะมีข้อมูลชื่อของพนักงานที่ออกใบเสร็จ 
                  ข้อมูลงานที่ถูกซ่อมของลูกค้า และช่องทางการชำระเงินของลูกค้าตามที่ลูกค้าชำระเงินกับทางร้าน 
                  นอกจากนี้พนักงานร้านซ่อมคอมพิวเตอร์จะสามารถออกหมายเลขใบเสร็จได้ด้วย 
                  โดยหมายเลขใบเสร็จจะมีรหัสที่ขึ้นต้นด้วย R
                  และสามารถกรอกราคาที่ลูกค้าชำระเงินให้ทางร้านได้ด้วย อีกทั้งยังสามารถระบุวันที่ที่ออกใบเสร็จได้อีกด้วย 
                  เมื่อพนักงงานร้านซ่อมคอมพิวเตอร์ได้บันทึกข้อมูลเรียบร้อยแล้ว ข้อมูลที่พนักงานร้านซ่อมคอมพิวเตอร์บันทึกจะถูกจัดเก็บที่ประวัติบันทึกใบเสร็จรับเงิน
                  <br /><br /><br />
                  </Typography>
                </CardContent>
              </CardActionArea>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded4,
                })}
                onClick={handleExpandClick4}
                aria-expanded={expanded4}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
              <Collapse in={expanded4} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    ในบทบาทของ  พนักงานร้านซ่อมคอมพิวเตอร์<br />
                    ฉันต้องการ	  ให้ระบบสามารถบันทึกใบเสร็จรับเงินเก็บในประวัติบันทึกใบเสร็จรับเงินได้<br />
                    เพื่อ 		    ให้ฉันสามารถตรวจสอบใบเสร็จรับเงินที่ฉันบันทึกไว้ได้ </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>


          <Grid item xs={4}>
            <Card className={classes.root}>
              <CardHeader
                title="ระบบบันทึกข้อมูลรับประกันการซ่อม"
                subheader="นายรชพล พงศ์กิตติศักดิ์"
              />
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="200"
                  image={pic5}
                  title="Contemplative Reptile"
                />
                <CardContent>

                  <Typography variant="body2" color="textPrimary" component="p">
                    ระบบบันทึกข้อมูลรับประกันการซ่อมนี้เป็นระบบที่ให้พนักงานร้านซ่อมคอมพิวเตอร์ที่เป็นสมาชิกของ
                    ระบบสามารถ login เข้าระบบเพื่อใช้ในการจัดการเรื่องบันทึกข้อมูลรับประกันการซ่อมให้กับ
                    ลูกค้าที่มาใช้บริการซ่อม ซึ่งรายละเอียดข้อมูลที่พนักงานพนักงานต้องบันทึกในการ
                    รับประกันการซ่อมจะประกอบไปด้วย งานที่ซ่อมของลูกค้า วงเงินประกันสูงสุดที่ลูกค้าจะได้จากการประกัน
                    ระยะเวลาของการรับประกันการซ่อม ชื่อของพนักงานที่เป็นผู้บันทึกข้อมูลรับประกันการซ่อม 
                    และสุดท้ายก็คือ รูปแบบของการประกัน ซึ่งจะเป็นในรูปแบบให้การประกันอะไหล่ หรือให้การประกันค่าแรง หรือจะเป็นการให้
                    การประกันทั้ง 2 รูปแบบก็ได้เช่นกัน แต่ในกรณีที่รูปแบบการประกันมีอะไหล่ จะต้องระบุอะไหล่ที่
                    ให้การประกันได้ และในกรณีที่การประกันมีเพียงค่าแรง การระบุอะไหล่ที่ให้การประกันได้จะระบุเป็นไม่มี
                    <br/><br/>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded5,
                })}
                onClick={handleExpandClick5}
                aria-expanded={expanded5}
                aria-label="show more"
              >
              <ExpandMoreIcon />
              </IconButton>
              <Collapse in={expanded5} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    ในบทบาทของ พนักงานร้านซ่อมคอมพิวเตอร์<br/>
                    ฉันต้องการ    ให้ระบบบันทึกข้อมูลรับประกันการซ่อม<br/>
                    เพื่อ         ให้ฉันสามารถรับประกันงานของลูกค้า ตามรายการข้อมูลรับประกันการซ่อมได้<br/>
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>


          <Grid item xs={4}>
            <Card className={classes.root}>
              <CardHeader
                title="ระบบบันทึกการซ่อมคอมพิวเตอร์"
                subheader="นางสาวรินรดา วัฒนชนสรณ์"
              />
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="RepairHistory"
                  height="200"
                  image={pic1}
                  title="RepairHistory"
                />
                <CardContent>

                  <Typography variant="body2" color="textPrimary" component="p">
                  ระบบบันทึกการซ่อมคอมพิวเตอร์ เป็นระบบที่สามารถให้พนักงานร้านซ่อมคอมพิวเตอร์เข้ามา
                  บันทึกประวัติการซ่อมคอมพิวเตอร์ลงในระบบ หลังจากการซ่อมคอมพิวเตอร์ และอุปกรณ์
                  ที่เกี่ยวข้องเสร็จแต่ละครั้งได้ ซึ่งข้อมูลนี้จะมีลักษณะคล้ายผลรายงานการปฏิบัติงานอย่างย่อ
                  โดยจะบันทึกผลการปฏิบัติงานซ่อม ปัญหาที่เกิดขึ้น และวิธีการซ่อมคอมพิวเตอร์หรืออุปกรณ์ครั้งนั้น ๆ เก็บไว้ในระบบ
                  ข้อมูลที่บันทึกนี้จะถือเป็นประวัติย้อนหลังการซ่อมคอมพิวเตอร์ของลูกค้าที่เข้ามาใช้บริการแต่ละครั้ง 
                  และถือเป็นประโยชน์ ให้สามารถใช้เป็นข้อมูลประกอบการตัดสินใจแนวทางการซ่อมคอมพิวเตอร์ในอนาคต
                  <br /><br /><br /><br /><br />
                  </Typography>
                </CardContent>
              </CardActionArea >
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded6,
                })}
                onClick={handleExpandClick6}
                aria-expanded={expanded6}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
              <Collapse in={expanded6} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    ในบทบาทของ พนักงาน<br />
                    ฉันต้องการ ให้ระบบสามารถบันทึกประวัติการซ่อมคอมพิวเตอร์แต่ละรายการย้อนหลังได้<br />
                    เพื่อ เป็นข้อมูลย้อนหลังการซ่อมของลูกค้า และนำไปใช้เป็นแนวทางการซ่อมคอมพิวเตอร์ในอนาคต</Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}