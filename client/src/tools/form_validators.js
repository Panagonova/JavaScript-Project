
const number_validation = (el, value) => {
    if(value && /\D/.test(value)) {
        return Promise.reject("Please enter a valid number");
    }

    return Promise.resolve()
};

const email_validation = (el, value) => {
    if (!value)
        return Promise.reject("Please enter email address");
    if(value && !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
        return Promise.reject("Please enter a valid email");
    }

    return Promise.resolve()
};

const float_validation = (el, value) => {
    if(value && !/^((\+|-)?(0|([1-9][0-9]*))(\.[0-9]+)?)$/.test(value)) {
        return Promise.reject("Please enter a valid number");
    }

    return Promise.resolve()
};

const validate_pass = (el, value) => {
    if (!value)
        return Promise.reject("Please enter your password");
    if(value && value.length < 8) {
        return Promise.reject("At least 8 symbols");
    }
    else if (value && !/[0-9]/.test(value)){
        return Promise.reject("Must contains at least 1 number");
    }
    else if (value && !/[A-Z,А-Я]/.test(value)){
        return Promise.reject("Must contains at least 1 uppercase alphabet");
    }
    else if (value && !/[a-z,а-я]/.test(value)) {
        return Promise.reject("Must contains at least 1 lowercase alphabet");
    }

    return Promise.resolve()
};

const methods = {
    number_validation,
    email_validation,
    float_validation,
    validate_pass
}

export default methods;
