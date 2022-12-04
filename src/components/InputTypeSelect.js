import React from "react";

import "../App.css";
import { inputTypes } from "../constants";

function RadioButton(props) {
    const { id, selectedType } = props;
    const inputLabel = id.charAt(0).toUpperCase() + id.substr(1);
    return (
        <React.Fragment key={id}>
            <input readOnly={true} checked={selectedType === id} type="radio" id={id} name={inputLabel} value={id} />
            <label htmlFor={id}>{inputLabel}</label><br></br>
        </React.Fragment>
    );
}

function InputTypeSelect(props) {
    const { onChangeInputType, selectedType } = props;
    return (
        <div className="InputTypeSelect" onChange={onChangeInputType}>
            <RadioButton id={inputTypes.origin} selectedType={selectedType} />
            <RadioButton id={inputTypes.destination} selectedType={selectedType} />
            <RadioButton id={inputTypes.obstacle} selectedType={selectedType} />
        </div>
    );
}

export default InputTypeSelect;