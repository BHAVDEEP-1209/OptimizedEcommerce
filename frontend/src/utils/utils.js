  // validation for regsiter page 
  export const validate = (values) => {
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

    if (Object.keys(errors).length != 0) {
      setLoading(false);
    }
    return errors;
  };



  // validation for Login
  export const validateLogin=(values)=>{
    const errors = {};
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    if (!values.email) {
      errors.email = "Input required!";
    } else {
      const ch = values.email.at(0);
      if (ch >= "0" && ch <= "9") {
          if(values.email.length!=10){
            errors.email = "Invalid Phn Number!";
          }
      } else {
        if (!regex.test(values.email)) {
          errors.email = "Invalid Email Address!";
        }
      }
    }
    if(!values.password){
      errors.password = "Password required!";
    }else if(values.password.length<6){
      errors.password = "Password too short!"
    }


    if (Object.keys(errors).length != 0) {
      setLoading(false);
    }
    return errors;
  }


  ///validation for add Product
export const validateAddProduct = (values) => {
      const errors = {};
      let re=/^-?[0-9]+$/;
      const len = values.name.trim().length;
      const desLength = values.description.trim().length;
  
      if (!values.name.trim()) {
        errors.name = "Product Name required!";
      }else if(len>15){
        errors.name = "Product Name Too Long!";
      }
      if (!values.description.trim()) {
        errors.description = "Write Product Description!";
      }else if(desLength>50){
        errors.description = "Description Tool Long!";
      }if (!values.price) {
        errors.price = "Enter Price!";
      }else if(values.price>=1000000){
        errors.price = "Price too High : Invalid Amount!"
      }else if(!re.test(values?.price)){
        errors.price = "Invalid Amount!"
      }else if(values.price<0){
        errors.price = "Invalid Amount : Price Cannot Be Negative!"
      }
      if(!values.stock){
        errors.stock="Enter the stock of Product!"
      }else if(!re.test(values.stock)){
        errors.stock="Invalid No Of Stock!"
      }
      else if(values.stock<0){
        errors.stock="Stock No cannot be negative!"
      }else if(values.stock.length>8){
        errors.stock="Invalid No Of Stock: Stock Amount Too Big!"
      }
      if(!values.images?.length){
        errors.images = "Upload 4 Product Images!";
      }else if(values.images.length!=4){
        errors.images = "Upload 4 Product Images!";
      }
      
      
      if (Object.keys(errors).length != 0) {
        setLoading(false);
      }
      return errors;
    };


  //base Image URL
 export const baseImgUrl =  `http://localhost:5000/images/`
