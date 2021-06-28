import React from 'react';
import { Add } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
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
    height: '100%',
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: '0.75rem',
  },
  avatar: {
    fontFamily: 'Ubuntu',
    fontSize: '0.875rem',
    backgroundColor: '#6d7efc',
  },
  join: {
    background: 'linear-gradient(to top, #638ef0, #82e7fe)',
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
  newRoom,
  toJoin,
}) => {
  const styles = useStyles();
  const iconBtnStyles = useSizedIconButtonStyles({ padding: 6 });

  const btnStyles = useGraphicBtnStyles();
  return (
    <div className={styles.root}>
      <Column className={styles.card}>
        <Row p={4} gap={2}>
          <Info position={'middle'} useStyles={useApexInfoStyles}>
            <InfoTitle>{title}</InfoTitle>
            <InfoSubtitle>{subtitle}</InfoSubtitle>
          </Info>
        </Row>
        <Box
          pb={1}
          px={2}
          color={'grey.600'}
          fontSize={'0.875rem'}
          fontFamily={'Ubuntu'}
        >
          {description}
        </Box>
        <Row p={4} gap={1} position={'bottom'}>
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
          <Item position={'middle-right'}>
           <Button
           className={styles.join}
           classes={btnStyles}
           variant={'contained'}
           color={'primary'}
           disableRipple
           onClick={newRoom}
         > {toJoin}
         </Button>
          </Item>
        </Row>
      </Column>
    </div>
  );
};

export default CustomCard;