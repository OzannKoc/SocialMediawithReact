import React from 'react'

 function ButtonWithSpinner(props) {
    const {onClick,disabled,buttonText,pendingApiCall,className} = props;
    return (
        <button onClick={onClick} className={className || "btn btn-primary"} disabled={disabled}>
                    {pendingApiCall && <span className="spinner-border spinner-border-sm" ></span>}{buttonText}</button>
    )
}
export default ButtonWithSpinner;
