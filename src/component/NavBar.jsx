import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import GTranslateIcon from '@mui/icons-material/GTranslate';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles ({
    wrapper: {
      width: '100%'
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between"
    },
    brandText: {
      paddingLeft: 15
      //fontFamily: //theme.title.titleFontFamily,
      //fontWeight: "fontWeightBold" //float: 'right'
    }
});


const TypographyList = classes => 
  <div>
    <GTranslateIcon  sx={{ fontSize: 35 }}/>
    <Typography
      variant="h5"
      className={classes.brandText}
      fontWeight="fontWeightBold"
      display="inline"
      color="#FFFFFF"
    >
      Easy Translator
    </Typography>
  </div>;


const NavBar = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const classes = useStyles();
    
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    return (
      <div className={classes.wrapper}>
        <AppBar position="fixed" style={{backgroundColor: scrollPosition>=100? 'rgba(0, 1, 1, .8)':'rgba(1, 98, 143, 1)'}}>
            <Toolbar className={classes.toolbar}>
              {TypographyList(classes)}
            </Toolbar>
        </AppBar>
      </div>  
    );
};
  
export default NavBar;