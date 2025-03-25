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


export { isValidEmail, isValidPassword, isValidName };