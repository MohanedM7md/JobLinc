import { useEffect, useState } from "react";

function SignUpInformation() {
    const [isEmpty, setEmpty] = useState({ email: true, password: true });
    const [isFocusedEmail, setFocusedEmail] = useState(false);
    const [isFocusedPass, setFocusedPass] = useState(false);
    
    const [showErrorEmail, setShowErrorEmail] = useState(false);
    const [showErrorPass, setShowErrorPass] = useState(false);

    const [isHidden, setHidden] = useState(true);
    
    useEffect(() => {
        if (!isEmpty.email) {
            setShowErrorEmail(false);
        }
        if (!isEmpty.password) {
            setShowErrorPass(false);
        }
    }, [isEmpty]);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setEmpty(prevVal => {
            if (name === "email") {
                return { email: value.length === 0, password: prevVal.password };
            } else if (name === "password") {
                return { email: prevVal.email, password: value.length === 0 };
            }
            return prevVal;
        });
    }

    function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
        const { name } = event.target;
        name === "email" ? setFocusedEmail(true) : setFocusedPass(true);
    }

    function handleFocusOut(event: React.FocusEvent<HTMLInputElement>) {
        const { name } = event.target;
        if (name === "email") {
            if (isEmpty.email) {
                setShowErrorEmail(true);
            }
        } else {
            if (isEmpty.password) {
                setShowErrorPass(true);
            }
        }
        name === "email" ? setFocusedEmail(false) : setFocusedPass(false);
    }

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        setHidden(prevVal => !prevVal);
        event.preventDefault();
    }

    return (
        <form className="flex flex-col w-60 items-start gap-2">
            <div className="flex flex-col ml-1">
                <label htmlFor="email" className="text-[12px] font-semibold">Email</label>
                <input name="email" onFocus={handleFocus} onBlur={handleFocusOut} onChange={handleChange} required id="email" className={`outline-[0.7px] text-[10px] w-[150px] h-5 px-2 rounded-sm hover:cursor-pointer hover:outline-[1px] hover:bg-gray-100 ${showErrorEmail && "outline-red-700 hover:outline-red-900"}`}></input>
                {showErrorEmail && <p className="text-red-800 text-[10px]">Please enter your email address.</p>}
            </div>

            <div className="flex flex-col ml-1 relative">
                <label htmlFor="password" className="text-[12px] font-semibold">Password</label>
                <input name="password" type={isHidden ? "password" : "text"} onFocus={handleFocus} onBlur={handleFocusOut} onChange={handleChange} required id="password" className={`outline-[0.7px] text-[10px] w-[150px] h-5 px-2 rounded-sm hover:cursor-pointer hover:outline-[1px] hover:bg-gray-100 ${showErrorPass && "outline-red-700 hover:outline-red-900"}`}></input>
                {showErrorPass && <p className="text-red-800 text-[10px]">Please enter your password.</p>}
                <button onClick={handleClick} className="z-2 absolute top-5 right-0 rounded-2xl text-[10px] border-0 px-1.5 text-blue-700 font-semibold hover:cursor-pointer">Show</button>
            </div>
        </form>
    );
}

export default SignUpInformation;
