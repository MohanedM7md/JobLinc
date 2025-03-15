import { use, useState } from "react";
import { AuthenticationSignInButton } from "./AuthenticationButtons";
import SignHeader from "./SignHeader";
import Modal from "./Modal";
import { Link } from "react-router-dom";

function UserDetails() {
    const [userDetails, setUserDetails] = useState({ firstName: "", lastName: "" });
    const [showErrorFirstNameEmpty, setShowErrorFirstNameEmpty] = useState(false);
    const [showErrorFirstNameInvalid, setShowErrorFirstNameInvalid] = useState(false);
    const [showErrorLastNameEmpty, setShowErrorLastNameEmpty] = useState(false);
    const [showErrorLastNameInvalid, setShowErrorLastNameInvalid] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("Egypt"); // Default country
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isValidPhone, setIsValidPhone] = useState(true);

    const countryCodes: { [key: string]: string } = {
        "Egypt": "+20",
        "USA": "+1",
        "UK": "+44",
        "Palestine": "+970"
    };

    const countryPhoneRegex: { [key: string]: RegExp } = {
        "Egypt": /^(\+20)?1[0-9]{9}$/,   // Egypt: Starts with +20 (optional) followed by 10 digits (mobile numbers start with 1)
        "USA": /^(\+1)?[2-9][0-9]{9}$/,  // USA: Starts with +1 (optional) followed by 10 digits (area codes 2-9)
        "UK": /^(\+44)?7[0-9]{9}$/,      // UK: Starts with +44 (optional) followed by 10 digits (mobile numbers start with 7)
        "Palestine": /^(\+970)?5[6-9][0-9]{7}$/ // Palestine: Starts with +970 (optional) followed by 9 digits (mobile starts with 56-59)
    };

    const nameRegex = /^[a-zA-Z][a-zA-Z_]*(?:\s[a-zA-Z_]+)*$/;

    function isValidName(name: string) {
        return nameRegex.test(name);
    }

    function isValidPhoneNo(country: string, phoneNumber: string): boolean {
        const regex = countryPhoneRegex[country];
        return regex ? regex.test(phoneNumber) : false;
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setUserDetails((prevState) => ({ ...prevState, [name]: value }));

        if (name === "firstName") {
            setShowErrorFirstNameEmpty(false);
            setShowErrorFirstNameInvalid(false);
        } else {
            setShowErrorLastNameEmpty(false);
            setShowErrorLastNameInvalid(false);
        }
    }

    function handleFocusOut(event: React.FocusEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        if (name === "firstName") {
            setShowErrorFirstNameEmpty(value.length === 0);
            setShowErrorFirstNameInvalid(value.length > 0 && !isValidName(value));
        } else {
            setShowErrorLastNameEmpty(value.length === 0);
            setShowErrorLastNameInvalid(value.length > 0 && !isValidName(value));
        }
    }

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const firstNameValid = isValidName(userDetails.firstName);
        const lastNameValid = isValidName(userDetails.lastName);

        setShowErrorFirstNameEmpty(userDetails.firstName.length === 0);
        setShowErrorFirstNameInvalid(!firstNameValid);
        setShowErrorLastNameEmpty(userDetails.lastName.length === 0);
        setShowErrorLastNameInvalid(!lastNameValid);

        if (firstNameValid && lastNameValid) {
            setIsModalOpen(true); // Open modal on valid form submission
        }
    }

    function handleSubmitPhoneNo()
    {
        // Check validity of phone number
        event?.preventDefault();        
        if (isValidPhoneNo(selectedCountry, phoneNumber)) {
            // Do Something here with the valid phone number
        }
        else {
            setIsValidPhone(false);
        }
        return 0;

        // if valid
        // dispatch phone number
        // Open another modal to get more info
    }

    return (
        <div className="flex flex-col gap-4 w-full h-screen items-center justify-center">
            <SignHeader />
            <h1 className="text-[25px] font-bold">Make the most of your professional life</h1>
            <div className="flex flex-col gap-3 bg-lightGray p-5 rounded-xl w-full max-w-md">
                <form onSubmit={handleSubmit} className="flex flex-col w-full items-start gap-4">
                    {/* First Name Input */}
                    <div className="flex flex-col w-full">
                        <label htmlFor="first-name" className="text-[14px] text-charcoalBlack font-bold">First name</label>
                        <input 
                            value={userDetails.firstName} 
                            name="firstName" 
                            onBlur={handleFocusOut} 
                            onChange={handleChange} 
                            required 
                            id="first-name"
                            className="w-full outline-[0.7px] text-[14px] text-charcoalBlack h-10 px-2 rounded-sm border border-gray-300 focus:outline-black focus:outline-[1.5px]"
                        />
                        {showErrorFirstNameEmpty && <p className="text-red-800 text-[10px]">Please enter your first name.</p>}
                        {showErrorFirstNameInvalid && <p className="text-red-800 text-[10px]">Please enter a valid first name.</p>}
                    </div>

                    {/* Last Name Input */}
                    <div className="flex flex-col w-full">
                        <label htmlFor="last-name" className="text-[14px] text-charcoalBlack font-bold">Last name</label>
                        <input 
                            value={userDetails.lastName} 
                            name="lastName" 
                            onBlur={handleFocusOut} 
                            onChange={handleChange} 
                            required 
                            id="last-name"
                            className="w-full outline-[0.7px] text-[14px] text-charcoalBlack h-10 px-2 rounded-sm border border-gray-300 focus:outline-black focus:outline-[1.5px]"
                        />
                        {showErrorLastNameEmpty && <p className="text-red-800 text-[10px]">Please enter your last name.</p>}
                        {showErrorLastNameInvalid && <p className="text-red-800 text-[10px]">Please enter a valid last name.</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="flex w-full flex-col items-center justify-center">
                        <AuthenticationSignInButton text="Continue" />
                    </div>
                </form>
            </div>

            {/* Modal Component */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form onSubmit={handleSubmitPhoneNo} className="flex flex-col items-start gap-4 w-full">
                    <h2 className="font-bold text-[18px]">Security Verification</h2>
                    <p className="text-[18px]">Just a quick security check</p>
                    <p className="text-[16px]">As an extra security step, we'll need to give you a verification code to register. <Link className="text-crimsonRed font-semibold" to="/LearnMore">Learn more</Link></p>

                    {/* Country Selection */}
                    <div className="flex flex-col w-full gap-2">
                        <label htmlFor="countries" className="text-[12px]">Select country</label>
                        <select 
                            id="countries" 
                            value={selectedCountry} 
                            onChange={(e) => setSelectedCountry(e.target.value)} 
                            className="w-full border border-gray-300 h-10 px-2 rounded-sm"
                        >
                            {Object.keys(countryCodes).map((country) => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                    </div>

                    {/* Phone Number Input */}
                    {/* Phone Number Input with Label */}
                    {/* Phone Number Input with Label */}
                    <div className="flex flex-col w-full gap-2">
                        <label htmlFor="phone-number" className="text-[12px]">Phone number</label>
                        <div className="flex w-full gap-2 border border-gray-300 rounded-sm overflow-hidden h-10">
                            {/* Country Code Display */}
                            <div className="flex items-center px-3 bg-gray-200 text-gray-700 text-[14px] font-semibold">
                                {countryCodes[selectedCountry]}
                            </div>
                            {/* Phone Input */}
                            <input 
                                type="tel" 
                                id="phone-number"
                                value={phoneNumber} 
                                onChange={(e) => {
                                    const onlyNumbers = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                                    setIsValidPhone(true);
                                    setPhoneNumber(onlyNumbers);
                                }} 
                                className="w-full px-2 text-[14px] text-charcoalBlack focus:outline-none" 
                                placeholder="Enter your phone number"
                            />
                        </div>
                        {!isValidPhone && <p className="text-red-800 text-[12px]">Please enter a valid Phone Number</p>}
                    </div>


                    <AuthenticationSignInButton text="Continue"/>
                </form>
            </Modal>
        </div>
    );
}

export default UserDetails;
