import React, { useState, useEffect } from 'react';
import { Grid, Backdrop, Box, Typography, IconButton } from "@mui/material";
import { BsArrowLeftRight } from 'react-icons/bs';
import TextInputArea from "./component/TextInputArea";
import axios from 'axios';
import { createUseStyles } from 'react-jss';
import language from './utils/language';
import DropDown from './component/DropDown';
import Spinner from './component/spinner';

const useStyles = createUseStyles({
    wrapper: {
        width: 'inherit',
        minHeight: 380, 
        marginTop: 180,
        paddingLeft: 50,
        paddingRight: 50,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    dropDown: {
        width: '100%',
        marginBottom: 25
    },
});


const Main = props => {
  const classes = useStyles();
  const [optionsList, setOptionsList] = useState([]);
  const [queryId, setQueryId] = useState(null);
  const [lang, setLang] = useState({lang1: null, lang2: null});
  const [stateObj, setStateObj] = useState({query: '', source: null, target: null});
  const [messageOne, setMessageOne] = useState(null);
  const [messageTwo, setMessageTwo] = useState(null);
  const [disableTextOne, setDisableTextOne] = useState(false);
  const [disableTextTwo, setDisableTextTwo] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let list = [];
    language.map(item => list.push({ 
      value: item.Code, 
      label: <Typography gutterBottom variant="body" component="p">{item.Name}</Typography>}));
    setOptionsList(list);
  }, []);


  const updateValueObj = (id, val) => {
    if(!queryId) {  
      if(id==='lang1') setLang({...lang, lang1: val});
      if(id==='lang2') setLang({...lang, lang2: val});
    } else {
      if(queryId==='text1') {
        if(id==='lang1') setStateObj({...stateObj, source: val});
        if(id==='lang2') setStateObj({...stateObj, target: val});
      }
      if(queryId==='text2') {
        if(id==='lang1') setStateObj({...stateObj, target: val});
        if(id==='lang2') setStateObj({...stateObj, source: val});
      }
    }
  };

  const updateTextValue = (id, val) => { 
    setStateObj({...stateObj, query: val!=null? val:''});
    if(id==="text1") setQueryId("text1");
    if(id==="text2") setQueryId("text2");
  };


  useEffect(()=>{
    if(queryId==='text1') {
      if(lang.lang1) setStateObj({...stateObj, source: lang.lang1});
      if(lang.lang2) setStateObj({...stateObj, target: lang.lang2});
    }
    if(queryId==='text2') {
      if(lang.lang1) setStateObj({...stateObj, target: lang.lang1});
      if(lang.lang2) setStateObj({...stateObj, source: lang.lang2});
    } 
  }, [queryId]);

  const url = `https://easy-translate-api.herokuapp.com/translate`;

  async function apiCall() { 
    try {
      setOpen(true);
      let res = await axios.post(url, 
        {
          query: stateObj.query,
          source: stateObj.source,
          target: stateObj.target
        }, 
        {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
      let data = await res.data;
      console.log(data);
      if(data) {
        if(queryId==='text2') setMessageOne(data.data.translations.translatedText);
        if(queryId==='text1') setMessageTwo(data.data.translations.translatedText);
        setDisableTextOne(false);
        setDisableTextTwo(false);
        setOpen(false);
      } 
    } catch (error) {
      console.log(error);
      setOpen(false);
    } 
  };


  const clearMessage = (id) => {
    if(id==="text1") setMessageOne(null);
    if(id==="text2") setMessageTwo(null);
  };

  const disableTextArea = (id) => {
    if(id==="text1") setDisableTextTwo(true);
    if(id==="text2") setDisableTextOne(true);
  }

  const handleClick = () => {
    console.log('query' + ' ' + stateObj.query);
    console.log('source' + ' ' + stateObj.source);
    console.log('target' + ' ' + stateObj.target);
    if(stateObj.query!=null && stateObj.source!=null && stateObj.target!=null) apiCall();
  };

  return (
    <div className={classes.wrapper}>
       <Box sx={{display: 'flex', justifyContent: 'center', marginBottom: 10}}> 
        <Typography className={classes.typography} gutterBottom variant="h5" component="p">
           Translate 
        </Typography>
       </Box>
       <Grid container space={2} sx={{display: 'flex', alignItems: 'center'}}>
         <Grid item xs={12} sm={12} md={5} sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
            <DropDown 
               className={classes.dropDown}
               id="lang1"
               options={optionsList}
               updateValueObj={updateValueObj}
            />
            <TextInputArea
               id="text1" 
               placeholder="Text here"
               maxLength={150}
               disabled={disableTextOne}
               updateTextValue={updateTextValue}
               clearMessage={clearMessage}
               disableTextArea={disableTextArea}
               message={messageOne}
            />
         </Grid>
         <Grid item xs={12} sm={12} md={2} 
            sx={{
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                padding: 5
            }}
          >
            <IconButton onClick={handleClick}>
                <BsArrowLeftRight size='50' color='rgba(1, 98, 143, 1)' stroke-width='1'/>
            </IconButton>  
         </Grid>
         <Grid item xs={12} sm={12} md={5}>
            <DropDown 
               className={classes.dropDown}
               id="lang2"
               options={optionsList}
               updateValueObj={updateValueObj}
            />
           <TextInputArea 
               id="text2"
               placeholder="Translate text"
               maxLength={150}
               disabled={disableTextTwo}
               updateTextValue={updateTextValue}
               clearMessage={clearMessage}
               disableTextArea={disableTextArea}
               message={messageTwo}   
           />
         </Grid>
       </Grid> 
       <Backdrop open={open} sx={{ backgroundColor: 'rgba(0, 0, 0, .7)', zIndex: 10000}}>
          <Spinner size={15} />
       </Backdrop>
    </div>
  );

};

export default Main; 