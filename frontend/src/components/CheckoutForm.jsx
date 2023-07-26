import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../utils/utils';
import { setAddress } from '../slices/userSlice';
import "../Styles/UserForm.scss"
import Loader from './Loader';

const CheckoutForm = () => {
    const user = useSelector(state=>state.currentUser);
    const initial = user?.address
        const [formValues,setFormvalues]  = useState({...user?.address});
        const [click,setClick] = useState(false);
        const dispatch = useDispatch();
        const [loading,setLoading] = useState(false);

          // validation fields
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  // validation
  const validate = (values) => {
    const errors = {};
    let re=/^-?[0-9]+$/;

    if (!values.street) {
      errors.street = "Street required!";
    }else if(values.street.length>30){
        errors.street = "Street Name Too Long!";
    }
    if (!values.city) {
      errors.city = "Enter Your City Name!";
    }else if(values.city.length>15){
        errors.city = "Invalid City Name!";
    }

    if (!values.state) {
      errors.state = "State Name Required!";
    }else if(values.state.length>25){
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
    return errors;
  };

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormvalues((prev)=>{
            return {
                ...prev,
                [name] : value.trim()
            }
        })
    }

    const handleSave=async()=>{
        //validation
        setLoading(true);
        setFormErrors(validate(formValues));
        setIsSubmit(true);

    }


// validates erros and calls the function when there is no error
  useEffect(() => {
    const setData = async () => {
        const id = user.id
        
        try {
            const res = await updateUser(id,{address : [formValues]});
            dispatch(setAddress(formValues));
            setLoading(false); 
            setFormvalues(formValues);
            setClick(false);
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



    const dis = click ? "flex" : "none";
    const editDis = click ? "none" : "inline"

  return (
   <>
   <h1>CHECKOUT</h1>
   <div className='formContainer' style={{width : "800px"}}>
        <div className="div"> 
        <div className="head">
        <span>Shipping Address</span>
        <span className='edit' onClick={()=>setClick(true)} style={{display : editDis}}>Edit</span>
        </div>
        <input type="text" name="street" id="" placeholder='Enter Street...' onChange={handleChange} value={formValues?.street} disabled={!click}/>
        <p className="error">{formErrors?.street}</p>
        <input type="text" name="city" id="" placeholder='Enter City...' onChange={handleChange} value={formValues?.city} disabled={!click}/>
        <p className="error">{formErrors?.city}</p>
        <input type="text" name="state" id="" placeholder='Enter State...' onChange={handleChange} value={formValues?.state} disabled={!click}/>
        <p className="error">{formErrors?.state}</p>
        <input type="number" name="pin" id="" placeholder='Enter PinCode...' onChange={handleChange} value={formValues?.pin} disabled={!click}/>
        <p className="error">{formErrors?.pin}</p>
        </div>

        {/* button */}
        <div className="buttons" style={{display : dis}}>
            <button onClick={()=>{
                setFormvalues({...initial});
                setFormErrors({});
                setClick(false);
            }}>CANCEL</button>
           {
            loading ? <Loader /> :  <button onClick={handleSave}>EDIT</button>
           }
        </div>
        {/* button */}
    </div>
   </>
  )
}

export default CheckoutForm