const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function isValidEmail(email: string): boolean {
    return emailRegex.test(email);
}

function isValidPassword(pass: string): boolean {
    return pass.length >= 6;
}

export { isValidEmail, isValidPassword };