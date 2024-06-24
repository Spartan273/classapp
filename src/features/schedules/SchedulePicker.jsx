import { Button } from "@mui/joy";
import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useClass } from "../classes/useClass";

const ScheadulePickerDiv = styled.div`
  display: flex;
`;

export default function SchedulePicker({ onQuery }) {
  const { isLoading, result, error } = useClass();

  const [optionList, setOptionList] = useState();

  const options = [
    "Option 1",
    "Option 2",
    //{ label: "Class A", id: 1 },
    //{ label: "Class B", id: 2 },
  ];

  const { filter } = useParams();
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState("");

  function getSeances() {
    //console.log("getSeances");
    const comboBox = document.getElementById('comboBoxClasses');
    //console.log(" value", value);
    onQuery(value);

    //console.log(comboBox);
    //console.log(comboBox.Value);
    //console.log("value", inputValue);
    //alert(inputValue);
  }

  let list = result?.map((option)=>{
    return {label: option.code , id: option.id}

  })
  useEffect(() => {
    //console.log("result", result);
    //setOptionList(result);
    ///let list = [];
    
    setOptionList(list);
    //console.log('list', list);
    //console.log("optionList", optionList);
    
  }, [result]);

  return (
    <>
      {optionList && result && (
        <ScheadulePickerDiv>
          <Autocomplete
            disablePortal
            id="comboBoxClasses"
            options={optionList}
            sx={{ width: 200 }}
            defaultValue={optionList[0]}
            //value={value}
            inputValue={inputValue}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} label={filter} />}
          />

          <Button
            onClick={() => getSeances()}
            variant="outlined"
            color="neutral"
          >
            Search
          </Button>
        </ScheadulePickerDiv>
      )}
    </>
  );
}
