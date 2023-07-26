import React, { useEffect, useState } from 'react'
import "../Styles/UserForm.scss"
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../utils/utils';
import { setAddress, setValue } from '../slices/userSlice';
import Loader from "../components/Loader"

const UserForm = (props) => {

    const [loading,setLoading] = useState(false);

    const user = useSelector(state=>state.currentUser);
    const initial = user?.address;

    const [formValues,setFormvalues]  = useState(user?.address);
    const [name,setName] = useState(user?.name);
    const click = props.state?.click;
    const dispatch = useDispatch();

      // validation fields
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

      // validation
  const validate = (values) => {
    const errors = {};
    let re=/^-?[0-9]+$/;
    const special = /[!@#$%^&*(),.?":{}|<>]/g
    const lowerCase = /[a-z]/g;
    const upperCase = /[A-Z]/g;
    const numbers = /[0-9]/g;

    if (!values?.street) {
      errors.street = "Street required!";
    }else if(values?.street?.length>30){
        errors.street = "Street Name Too Long!";
    }
    if (!name) {
      errors.name = "Enter Your Name...!";
    }else if(name?.length>25){
        errors.name = "Input Too Long : Invalid Name!";
    }

    if (!values?.city) {
      errors.city = "Enter Your City Name!";
    }else if(values?.city?.length>15){
        errors.city = "Invalid City Name!";
    }

    if (!values?.state) {
      errors.state = "State Name Required!";
    }else if(values?.state?.length>25){
        errors.state = "State Name Too Long!";
    }
    if (!values.pin) {
      errors.pin = "Enter Pin-Code!";
    }else if(values.pin<0){
      errors.pin = "Invalid Pin-Code : Pin-Code cannot be negative!";
    }else if(!re.test(values.pin)){
      errors.pin = "Invalid Pin-Code!";
    }else if(values.pin.length!=6){
        errors.pin = "Enter 6 digit Pin-Code!";
    }

    if (Object.keys(errors).length != 0) {
      setLoading(false);
    }

    return errors;
  };
/////////// end of validation

    const handleChange = (e)=>{
        const {name,value} = e.target;

        setFormErrors((prev)=>{
            return {
                ...prev,
                [name]: ""
            }
        })

        setFormvalues((prev)=>{
            return {
                ...prev,
                [name] : value.trim()
            }
        })
    }

    const handleSave=async()=>{
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        setLoading(true);
    }


 // validates erros and calls the function when there is no error
 useEffect(() => {
    const setData = async () => {
              //validation
              const id = user.id
              const add = {
                  email : user.email,
                  address : [formValues],
                  name : name,
              }
              try {
                  const res = await updateUser(id,add);
                  dispatch(setAddress(formValues));
                  dispatch(setValue(res.data));
                  
                  setLoading(false);
      
                  setFormvalues({});
                  props.state?.setClick(!click);
              } catch (error) {
                  setLoading(false);
                  console.log(error);
              }
    };
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setData();
    }else{
        setLoading(false);
    }
  }, [formErrors]);

  return (
    <div className='formContainer'>
        <h1>Edit Details</h1>
        <div className='div'>
        <span>Email</span>
        <input type="text" name="" id="" value={user.email}/>
        </div>
        <div className='div'>
        <span>Name</span>
        <input type="text" name="" id="" value={name} onChange={(e)=>setName(e.target.value.trim())} placeholder='Enter Your Name...'/>
        <p className="error">{formErrors?.name}</p>
        </div>
        <div className='div'>
        <span>Address</span>
        <input type="text" name="street" id="" placeholder='Enter Street...' onChange={handleChange} value={formValues?.street}/>
        <p className="error">{formErrors?.street}</p>
        <input type="text" name="city" id="" placeholder='Enter City...' onChange={handleChange} value={formValues?.city}/>
        <p className="error">{formErrors?.city}</p>
        <input type="text" name="state" id="" placeholder='Enter State...' onChange={handleChange} value={formValues?.state}/>
        <p className="error">{formErrors?.state}</p>
        <input type="number" name="pin" id="" placeholder='Enter PinCode...' onChange={handleChange} value={formValues?.pin}/>
        <p className="error">{formErrors?.pin}</p>
        </div>

        <div className="buttons">
            <button onClick={()=>{
                setFormvalues({initial});
                props.state?.setClick(!click);
            }}>CANCEL</button>
            {
                loading ? <Loader /> : <button onClick={handleSave}>SAVE</button>
            }
        </div>
    </div>
  )
}

export default UserForm