import React from "react";
import { isValidName } from "./Validations";

interface UserDetailsProps {
    labelText: string;
    name: string;
    val: string;
    setVal: React.Dispatch<React.SetStateAction<string>>;
    showErrorEmpty: boolean;
    setShowErrorEmpty: React.Dispatch<React.SetStateAction<boolean>>;
    showErrorInvalid: boolean;
    setShowErrorInvalid: React.Dispatch<React.SetStateAction<boolean>>;
}

const NameFieldNormal: React.FC<UserDetailsProps> = ({labelText, val, name, setVal, showErrorEmpty, setShowErrorEmpty, showErrorInvalid, setShowErrorInvalid}) =>
{

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
        setVal(value);

        setShowErrorEmpty(false);
        setShowErrorInvalid(false);
    }

    function handleFocusOut(event: React.FocusEvent<HTMLInputElement>) {
        const { value } = event.target;
       setShowErrorEmpty(value.length === 0);
       setShowErrorInvalid(value.length !== 0 && !isValidName(value));
    }

    return(
        
        <div className="flex flex-col w-full">
            <label htmlFor={name} className="text-[14px] text-charcoalBlack font-bold">{labelText}</label>
            <input 
                value={val} 
                name={name} 
                onBlur={handleFocusOut} 
                onChange={handleChange} 
                required 
                id={name}
                className="w-full outline-[0.7px] text-[14px] text-charcoalBlack h-10 px-2 rounded-sm border border-gray-300 focus:outline-black focus:outline-[1.5px]"
            />
            {showErrorEmpty && <p className="text-red-800 text-[10px]">Please enter your {name}.</p>}
            {showErrorInvalid && <p data-testid="errorFirstName" className="text-red-800 text-[10px]">Please enter a valid {name}.</p>}

        </div>
    );
}

export default NameFieldNormal;