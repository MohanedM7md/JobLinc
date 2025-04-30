import React from 'react';
import { isValidPassword } from './Validations';
interface PasswordFieldNormalProps {
    labelText: string;
    passwordText: string;
    setPasswordText: React.Dispatch<React.SetStateAction<string>>;
    showErrorPassEmpty: boolean;
    setshowErrorPassEmpty: React.Dispatch<React.SetStateAction<boolean>>;
    showErrorPassInvalid: boolean;
    setshowErrorPassInvalid: React.Dispatch<React.SetStateAction<boolean>>;
    showErrorPassIncorrect?: boolean;
    setShowErrorPassIncorrect?: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordFieldNormal: React.FC<PasswordFieldNormalProps> = ({ labelText, passwordText, setPasswordText, showErrorPassEmpty, setshowErrorPassEmpty, showErrorPassInvalid, setshowErrorPassInvalid, showErrorPassIncorrect, setShowErrorPassIncorrect }) => {

    const [isHidden, setHidden] = React.useState(true);

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        setHidden(prevVal => !prevVal);
        event.preventDefault();
    }
    
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
        setPasswordText(value);
        setshowErrorPassInvalid(false);
        setshowErrorPassEmpty(false);
        setShowErrorPassIncorrect && setShowErrorPassIncorrect(false);
    }

    function handleFocusOut() {
        if (passwordText.length === 0) {
            setshowErrorPassEmpty(true);
            setshowErrorPassInvalid(false);
        }
        else {
            setshowErrorPassInvalid(!isValidPassword(passwordText));
        }
    }

    return (
        <div className="flex flex-col relative w-full">
            <label htmlFor="password" className="text-[14px] text-charcoalBlack font-bold">{labelText}</label>
            <input value={passwordText} name="password" type={isHidden ? "password" : "text"} onBlur={handleFocusOut} onChange={handleChange} required id={labelText} 
            className={`outline-[0.7px] text-[14px] text-charcoalBlack h-8 pl-2 pr-10 rounded-sm hover:cursor-text hover:outline-[1px] hover:bg-gray-100 focus:outline-black focus:outline-[1.5px] ${(showErrorPassEmpty || showErrorPassInvalid) && "outline-red-700 hover:outline-red-900"}`}  ></input>
            {showErrorPassEmpty && <p className="text-red-800 text-[10px]">Please enter your password.</p>}
            {showErrorPassInvalid && <p data-testid="errorPass" className="text-red-800 text-[10px]">Password must be 6 characters or more.</p>}
            {showErrorPassIncorrect && <p data-testid="errorIncorrectPass" className="text-red-800 text-[10px]">Incorrect password entered</p>}
            <button onClick={handleClick} className="z-2 absolute top-7.5 right-0 rounded-2xl text-[10px] border-0 px-1.5 text-charcoalBlack font-semibold hover:cursor-pointer">{isHidden ? "Show" : "Hide"}</button>
        </div>
    );
}

export default PasswordFieldNormal;