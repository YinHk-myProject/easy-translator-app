import React, { useState, useEffect } from 'react';
import { TextField } from "@mui/material";
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    wrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
});


const TextInputArea = props => { 
   const { id, maxLength, placeholder, updateTextValue, message, disabled } = props;
   const [text, setText] = useState(null);
   const classes = useStyles();

   const handleChange = e => {
    let {clearMessage, disableTextArea} =props;
    clearMessage(id);
    disableTextArea(id);
    e.target.value===''? setText(null):setText(e.target.value);
   }
   
   const handleBlur = () => {
    updateTextValue && updateTextValue(id, text);
   };

   return (
    <div className={classes.wrapper}>
            <TextField
                id={id} 
                rows={10}
                multiline
                sx={{width: '100%'}}
                value={text || message}
                disabled={disabled}
                autoCapitalize="off"
                placeholder={placeholder}
                onChange={handleChange}
                onBlur={handleBlur}
                inputProps={{ maxLength: maxLength }}
            />
    </div>
   );
}

export default TextInputArea;