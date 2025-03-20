import React, { ChangeEvent, MouseEvent } from "react";

interface PasswordFieldWithMovingLabelProps {
    passText: string;
    setPassText: (value: string) => void;
    showErrorPassInvalid: boolean;
    setshowErrorPassInvalid: (value: boolean) => void;
}

const PasswordFieldWithMovingLabel: React.FC<PasswordFieldWithMovingLabelProps> = ({ passText, setPassText, showErrorPassInvalid, setshowErrorPassInvalid }) => {
    const [isHidden, setHidden] = React.useState(true);
    const [isFocusedPass, setFocusedPass] = React.useState(false);

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
        setHidden((prevVal) => !prevVal);
        event.preventDefault();
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
        setPassText(value);
        setshowErrorPassInvalid(false);
    }

    function handleFocus() {
        setFocusedPass(true);
    }

    function handleFocusOut() {
        setFocusedPass(false);
    }

    return (
        <div className="relative w-full">
            <div className="relative mb-13 w-full">
                <input
                    value={passText}
                    type={isHidden ? "password" : "text"}
                    name="password"
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleFocusOut}
                    id="password"
                    placeholder=" "
                    className="peer z-1 border w-full h-11 rounded-sm absolute pl-2 pr-12 hover:cursor-text focus:outline-black transition-all"
                    required
                />
                <label
                    htmlFor="password"
                    className={`absolute left-2 text-mutedSilver transition-all px-1 ${
                        passText || isFocusedPass ? "top-[0px] text-[10px]" : "top-2 text-base"
                    }`}
                >
                    Password
                </label>
                <button onClick={handleClick} className="z-2 absolute top-3 right-1 rounded-2xl text-[12px] border-0 px-1.5 text-warmBlack hover:cursor-pointer">
                    {isHidden ? "Show" : "Hide"}
                </button>
            </div>
            {showErrorPassInvalid && <p className="text-red-800 text-[12px]">The password must have at least 6 characters.</p>}
        </div>
    );
};

export default PasswordFieldWithMovingLabel;