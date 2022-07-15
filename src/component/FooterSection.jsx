import * as React from 'react';
import { Typography } from "@mui/material";
import { createUseStyles } from 'react-jss'
import WaveBorder from './WaveBorder';

const useStyles = createUseStyles({
    wrapper: {
      width: '100%',
      marginTop: 150,
      bottom: 0
    },
    container: {
        background: 'linear-gradient(180deg, rgba(1, 98, 143, 1) 0%, rgba(23, 28, 36, 1) 100%)',
        minHeight: 300,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'center'
    },
    waveBorder: {
        //paddingTop: //theme.spacing(9)
    },
    typography: {
        color: "#FFFFF1"
    }   
});

const FooterSection = props => {
    const classes = useStyles();
   
    return (
      <footer className={classes.wrapper}>
        <WaveBorder 
            upperColor= '#FFFFFF'
            waveColor1= 'rgba(88, 99, 66, .7)'
            waveColor2= 'rgba(156, 173, 43, .8)'
            waveColor3= 'rgba(28, 88, 117, .7)'
            waveColor4= 'rgba(1, 98, 143, 1)'
            className={classes.waveBorder}
        />
        <div className={classes.container}>     
          <Typography className={classes.typography} paragraph>
              Application designed and developed by Ken.
          </Typography> 
          <Typography className={classes.typography} paragraph>
              &copy; {new Date().getFullYear()} YinHk. 
          </Typography>      
        </div>
      </footer>
    );
};

export default FooterSection;