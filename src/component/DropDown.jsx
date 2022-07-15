import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const DropDown = props => {
    const { className, id, options, ...rest } = props;
    const [stateObj, setStateObj] = useState({ selectedOption: '', selectedList: null });

    const selectStyles = {
        control: (css, state) => ({
          ...css,
          width: '60%',
          '&:hover': {
            borderColor: state.isFocused ? '#1565c0':'#424242'
          },
          borderColor: state.isFocused ? '#1565c0': '#bdbdbd',
          display: 'flex',
          flexDirection: 'row',
        }),
        container: provided => ({
            ...provided,
            display: 'flex',
            'justify-content': 'center'
          
        }),
        input: base => ({
          ...base,
          '& input': {
              font: 'inherit'
          }
        }),
        placeholder: provided => ({
          ...provided,
          fontSize: 10,
          width: '100%',
          float: 'left'
        }),
        singleValue: provided => ({
          ...provided,
          paddingLeft: 8,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: 'calc(100% - 14px)'
        }),
        valueContainer: provided => ({
          ...provided,
          display: 'flex',
          flexWrap: 'wrap',
          flex: 1,
          alignItems: 'center',
          overflow: 'hidden',
          color:'black',
          height: '100%'
        }),
        menu: provided => ({
          ...provided,
          height: 'auto',
          width: '100%'
        }),
        menuList: provided => ({
          ...provided,
          width: '100%'
        }),
        option: (provided, state) => {
          return {
            ...provided,
            backgroundColor: state.isSelected ? '#2f89d6' : null,
            '&:hover': {
              backgroundColor: state.isSelected ? '#28518f':'#e0e0e0'
            }
          };
        }
    };

    const handleChange = e => {
      let { updateValueObj } = props;
      if(e!=null) { 
        setStateObj({ ...stateObj, selectedOption: e.value, selectedList: e });
        (id==="lang1") && updateValueObj('lang1', e.value);
        (id==="lang2") && updateValueObj('lang2', e.value);
      } else {
        setStateObj({ ...stateObj, selectedOption: '', selectedList: null });
        (id==="lang1") && updateValueObj('lang1', null);
        (id==="lang2") && updateValueObj('lang2', null);
      }
    };


    return (
      <div className={className} {...rest}>
        <Select 
            id={id}
            autosize={false}
            options={options}
            value={stateObj.selectedList}
            isSearchable={false}
            isClearable
            placeholder=""
            onChange={handleChange}
            styles={selectStyles}  
            menuPlacement="auto"
            menuPortalTarget={document.querySelector('body')}
        />
      </div>
    );
};

export default DropDown;