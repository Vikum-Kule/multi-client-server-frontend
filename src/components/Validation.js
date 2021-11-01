

const Validation=(values)=> {
    let errors={}
    const re = /^[0-9\b]+$/;

    if(!values.fullname){
        errors.fullname = "Full Name is required."
    }
    if(!values.username){
        errors.username = "Username is required. "
    }
    if(!values.record){
        errors.record = "Record is required. "
    }
    if(!values.age){
        errors.age = "Age is required."
    }
    if(!values.p_name){
        errors.p_name = "Patient Name is required."
    }
    if(!values.password){
        errors.password = "Password is required."
    }else if(values.password.lenght <5){
        errors.password="Password must be more than five characters."
    }
    

    // if value is not blank, then test the regex

    if (!values.phone) {
        errors.phone="Empty input"
    }else if(!re.test(values.phone)){
        errors.phone="Should be valid number input"
    }

    return errors;
}

export default Validation
