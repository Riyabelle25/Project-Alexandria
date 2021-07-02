import React from 'react';
// import GoogleFontLoader from 'react-google-font-loader';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';
import Chat from './Chat';
import { Button, IconButton } from '@material-ui/core';
const useStyles = makeStyles((width) => ({
  card: {
    display: "inline-block",
    backgroundColor:"rgb(13, 1, 27)",
    paddingBottom:0.5,
    position: 'relative',
    boxShadow: '0 8px 24px 0 rgba(0,0,0,0.12)',
    overflow: 'visible',
    borderRadius: '1.5rem',
    transition: '0.4s',
    '&:hover': {
      transform: 'translateY(-2px)',
      backgroundColor:"rgb(127, 136, 187)",
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      zIndex: 0,
      display: 'block',
      width: '100%',
      bottom: -1,
      height: '100%',
      borderRadius: '1.5rem',
      backgroundColor: 'rgba(0,0,0,0.08)',
    },
  },
  main: {
    overflow: 'hidden',
    borderTopLeftRadius: '1.5rem',
    borderTopRightRadius: '1.5rem',
    borderBottomLeftRadius: '1.5rem',
    borderBottomRightRadius: '1.5rem',
    zIndex: 1,
    '&:after': {
      content: '""',
      position: 'relative',
      bottom: 0,
      display: 'block',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(to top, #014a7d, rgba(0,0,0,0))',
    },
    paddingTop:'2rem',
  },
  content: {
    position: 'relative',
    bottom: 0,
    width: '100%',
    zIndex: 1,
    padding: '2rem 1.5rem 1rem',
  },
  title: {
    fontFamily: "'Sen', sans-serif",
    fontSize: '1.5rem',
    textAlign: 'center',
    fontWeight: 500,
    color: '#fff',
  },
  shadow: {
    transition: '0.2s',
    position: 'absolute',
    zIndex: 0,
    width: '88%',
    height: '100%',
    bottom: 0,
    borderRadius: '1.5rem',
    backgroundColor: "rgb(27, 8, 49);",
    left: '50%',
    transform: 'translateX(-50%)',
  },
  shadow2: {
    bottom: 0,
    width: '72%',
    backgroundColor: 'rgb(27, 8, 40);',
  },
}));

export const RoundCard = React.memo(function News3Card(props) {
  const styles = useStyles(props.width);
  const mediaStyles = useCoverCardMediaStyles();

  const handleConnect = () => {
    this.socket.emit('want-to-meet',{sender:props.sender,receiver:props.receiver, meet: props.meet});
    window.location.href=props.meet;
}   
  return (
    <>   
      <Card className={styles.card}>
      {/* <Button onClick={()=> window.location.href=`/room/${props.roomName}`} style={{minWidth:100 , maxWidth:300}} > */}
        <Box className={styles.main} minHeight={props.height} maxWidth={props.width} minWidth={props.width} position={'relative'}>
          {/* <CardMedia
            classes={mediaStyles}
            image={
              'https://images.unsplash.com/photo-1487088678257-3a541e6e3922?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbG91cnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60'
            }
          /> */}
          <div className={styles.content}>
           <Typography variant={'h2'} className={styles.title}>
              
            </Typography>
            
          </div>
        </Box>
        {/* <div className={styles.shadow} />
        <div className={`${styles.shadow} ${styles.shadow2}`} /> */}
        {/* </Button>   */}
      </Card>
    </>
  );
});
export default RoundCard;