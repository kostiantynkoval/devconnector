export function validateForm(data: any) {
    // Define array that will store each falsy check
    const checkResults = [];
    // Define object that will contain error messages
    const errObj: any = {};
    Object.keys(data).forEach(key => errObj[key] = '');

    // Validating email address
    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!emailReg.test(String(data.email).toLowerCase())) {
        errObj.email = 'This email is not valid';
        checkResults.push(false);
    }

    // Password validation (8-30 chars, 1 small, 1 capital, 1 number)
    const passReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,30}$/;
    if(!passReg.test(String(data.password))) {
        errObj.password = 'Password should contain from 8 to 30 chars, at least 1 small letter, 1 number and 1 capital'
        checkResults.push(false);
    }

    // Password matching validation (if there is password2 field in data object)
    if( data.hasOwnProperty('password2') && data.password !== data.password2) {
        errObj.password2 = 'Passwords should match'
        checkResults.push(false);
    }


    // Checking each input for emptyness
    Object.keys(data).forEach((name: string) => {
        if(data[name] === '') {
            errObj[name] = 'This field is required';
            checkResults.push(false);
        }
    });

    // return object { isValid, errorData }
    return { isValid: !(checkResults.length > 0), errors: errObj }
}