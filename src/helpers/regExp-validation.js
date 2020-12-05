const emailValid = value => !/[a-z0-9.]+@[a-z]+\.[a-z]+/.test(value.toLowerCase().trim());
const oneLowercaseChar = value => !/^(?=.*[a-z])/.test(value);
const oneUppercaseChar = value => !/^(?=.*[A-Z])/.test(value);
const oneNumber = value => !/^(?=.*[0-9])/.test(value);
const oneSpecialChar = value => !/^(?=.*\W)/.test(value);
const masterNodeValidation = value => !/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/.test(value);
const isNumber = value => /^\d+$/.test(value);

export {
    emailValid,
    oneLowercaseChar,
    oneUppercaseChar,
    oneNumber,
    oneSpecialChar,
    masterNodeValidation,
    isNumber,
};
