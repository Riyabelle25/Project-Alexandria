import React from 'react';
import { Add } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
// import Grid from '@material-ui/core/Grid';
import { Column, Row, Item } from '@mui-treasury/components/flex';
import { Info, InfoSubtitle, InfoTitle } from '@mui-treasury/components/info';
import { useApexInfoStyles } from '@mui-treasury/styles/info/apex';
import { useGraphicBtnStyles } from '@mui-treasury/styles/button/graphic';
import { useSizedIconButtonStyles } from '@mui-treasury/styles/iconButton/sized';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    transition: '0.3s',
    position: 'relative',
    '&:before': {
      transition: '0.2s',
      position: 'absolute',
      width: '100%',
      height: '100%',
      content: '""',
      display: 'block',
      backgroundColor: 'rgba(0,0,0,0.08)',
      borderRadius: '1.5rem',
      zIndex: 0,
      bottom: 0,
    },
    '&:hover': {
        transform: 'translateY(-4px)',
      backgroundColor:"rgb(127, 136, 187)",
      borderRadius: '1.5rem',
      '&:before': {
        bottom: -6,
        backgroundColor: 'rgba(0,0,0,0.08)',
      },
      '& $card': {
        // boxShadow: '-8px 8px 56px 0 #bcc3d6',
      },
    },
  },
  card: {
    zIndex: 1,
    position: 'relative',
    borderRadius: '1rem',
    // boxShadow: '0 6px 20px 0 #dbdbe8',
    backgroundColor: 'rgba(0,0,0,0.08)',
    transition: '0.4s',
    width: "36vw",
    height: "27vh",
  },
  logo: {
    width: "70px",
    height: "60px",
    borderRadius: '0.75rem',

  },
  avatar: {
    fontFamily: 'Ubuntu',
    fontSize: '0.875rem',
    backgroundColor: '#6d7efc',
  },
  join: {
    fontWeight:"bold",
    background: 'linear-gradient(to top, #81c784, #388e3c)',
    color:'azure',
    width:'140px',
    height: '60px',
    marginTop: '10px',
    borderRadius: '1rem',
    alignContent: 'flex-end',
    // marginLeft: '600px',
    // background: 'linear-gradient(to top, #638ef0, #82e7fe)',
    '& > *': {
      textTransform: 'none !important',
    },
  },
  action: {
    backgroundColor: '#fff',
    boxShadow: '0 1px 4px 0 rgba(0,0,0,0.5)',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#000',
    },
  },
}));

const CustomCard = ({
  thumbnail,
  title,
  subtitle,
  description,
}) => {
  const styles = useStyles();
  const iconBtnStyles = useSizedIconButtonStyles({ padding: 6 });

  const btnStyles = useGraphicBtnStyles();
  return (
    <div className={styles.root}>
      <Column className={styles.card}>
        <Row p={3} px={5}>
          {/* <Avatar className={styles.logo} variant={'rounded'} src={thumbnail} /> */}
          <Info position={'middle'} useStyles={useApexInfoStyles} style={{paddingLeft:"10px"}}>
            <InfoTitle style={{fontSize:"140%", fontWeight:"100",color:"azure", marginLeft:-1}}>{title}</InfoTitle>
            <InfoSubtitle style={{fontSize:"80%", fontWeight:"400",color:"grey", marginLeft:-1}}>{subtitle}</InfoSubtitle>
          </Info>
        </Row>
        <Box
          px={6}
          color={'grey.600'}
          fontSize={'100%'}
          fontFamily={'Ubuntu'}
        >
          {description}
        </Box>
        <Row p={1} justifyContent={"flex-end"}>
          {/* <Item>
            <AvatarGroup max={4} classes={{ avatar: styles.avatar }}>
              {new Array(5).fill(0).map((_, index) => (
                <Avatar
                  key={index}
                  src={`https://i.pravatar.cc/300?img=${Math.floor(
                    Math.random() * 30
                  )}`}
                />
              ))}
            </AvatarGroup>
          </Item> */}
          <Item alignContent={"flex-end"} paddingRight={"2%"}>
          <Button
           className={styles.join}
           classes={btnStyles}
           variant={'contained'}
           color={'success'}
           disableRipple
           onClick={event=>window.location.href=`/room/${title}`}
         > Enter
         {/* <a href={`/room/$`}>
          
         </a> */}
         </Button>
          </Item>
        </Row>
      </Column>
    </div>
  );
};

export default CustomCard;