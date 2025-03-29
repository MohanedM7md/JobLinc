const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const nameRegex = /^[a-zA-Z][a-zA-Z_]*(?:\s[a-zA-Z_]+)*$/;


function isValidEmail(email: string): boolean {
    return emailRegex.test(email);
}

function isValidPassword(pass: string): boolean {
    return pass.length >= 6;
}


function isValidName(name: string) {
    return nameRegex.test(name);
}


const countryPhoneRegex: { [key: string]: RegExp } = {
    "Egypt": /^(\+20)?1[0-9]{9}$/,   // Egypt: Starts with +20 (optional) followed by 10 digits (mobile numbers start with 1)
    "Palestine": /^(\+970)?5[6-9][0-9]{7}$/ // Palestine: Starts with +970 (optional) followed by 9 digits (mobile starts with 56-59)
};


function isValidPhoneNo(country: string, phoneNumber: string): boolean {
    const regex = countryPhoneRegex[country];
    return regex.test(phoneNumber);
}


export { isValidEmail, isValidPassword, isValidName, isValidPhoneNo };