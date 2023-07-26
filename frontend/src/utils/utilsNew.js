 // validation
 export const validateRegister = (values) => {
    const errors = {};
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      const special = /[!@#$%^&*(),.?":{}|<>]/g
      const lowerCase = /[a-z]/g;
      const upperCase = /[A-Z]/g;
      const numbers = /[0-9]/g;

    if (!values.name) {
      errors.name = "Name required!";
    }
    if (!values.role) {
      errors.role = "Role required!";
    }

    if (!values.email) {
      errors.email = "Input required!";
    } else {
      const isNumber = /^[0-9]+$/.test(values.email);

      if(isNumber){
        if (values.email.length != 10) {
              errors.email = "Invalid Phn Number!";
        }
      }else {
        if (!regex.test(values.email)) {
          errors.email = "Invalid Email Address!";
        }
      }
    }
    if (!values.password) {
      errors.password = "Password required!";
    } else if (values.password.length < 6) {
      errors.password = "Password too short!";
    }    if(!values.password){
      errors.password = "Password required!";
    }else if(!values.password.match(lowerCase)){
      errors.password = "Password should contain lowercase letters!";
    }else if(!values.password.match(upperCase)){
      errors.password = "Password should contain uppercase letters!";
    }else if(!values.password.match(special)){
      errors.password = "Password should contain a special character!";
    }else if(!values.password.match(numbers)){
      errors.password = "Password should contain numbers!";
    } else if (values.password.length>15) {
      errors.password = "Password too long!";
    }

    return errors;
  };


//validate login
  // validation
  export const validateLogin = (values) => {
    const errors = {};
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!values.email) {
      errors.email = "Input required!";
    } else {
      const ch = values.email.at(0);
      if (ch >= "0" && ch <= "9") {
        if (values.email.length != 10) {
          errors.email = "Invalid Phn Number!";
        }
      } else {
        if (!regex.test(values.email)) {
          errors.email = "Invalid Email Address!";
        }
      }
    }
    if (!values.password) {
      errors.password = "Password required!";
    } else if (values.password.length < 6) {
      errors.password = "Password too short!";
    }

    return errors;
  };