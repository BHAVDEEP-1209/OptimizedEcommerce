import React, { useEffect, useState } from 'react'
import "../Styles/UserForm.scss"
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../utils/utils';
import { setAddress, setValue, setPassword } from '../slices/userSlice';
import Loader from "../components/Loader"

const PasswordForm = () => {
    const user = useSelector(state => state.currentUser);
    const p = user?.password ? user?.password : "";
    const [password, setPassword] = useState(p);
    const pass = user?.password ? "Change Password!" : "Set Password!";
    const [click, setClick] = useState(false);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();

    // validation fields
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const validate = () => {
        const errors = {};
        const special = /[!@#$%^&*(),.?":{}|<>]/g
        const lowerCase = /[a-z]/g;
        const upperCase = /[A-Z]/g;
        const numbers = /[0-9]/g;
    
        if (!password) {
          errors.password = "Password required!";
        }else if(!password?.match(lowerCase)){
            errors.password = "Password should contain lowercase letters!";
          }else if(!password?.match(upperCase)){
            errors.password = "Password should contain uppercase letters!";
          }else if(!password?.match(special)){
            errors.password = "Password should contain a special character!";
          }else if(!password?.match(numbers)){
            errors.password = "Password should contain numbers!";
        }else if(password?.length<6){
            errors.password = "Password too short!";
        }
        else if(password?.length>15){
            errors.password = "Password too long!";
        }
    
        if (Object.keys(errors).length != 0) {
          setLoading(false);
        }
    
        return errors;
      };
    /////////// end of validation

    const handleSave=async()=>{
        setFormErrors(validate());
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
                  password : password,
                  _id : id
              }
              try {
                  const res = await updateUser(id,add);
                  dispatch(setValue({...user,...add}))
                  setLoading(false);
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


    return (
        <div className='formContainer'>
            <div className="header">
                <h1>Edit Password</h1>
                <h1 className='editIcon' onClick={() => setClick(!click)}>Edit</h1>
            </div>

            <div className="div">
            <span>{pass}</span>
            </div>
          
            <div className={!click && "none"}>

            <div className='div'>
                <input type="text" name="" id="" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password...' />
                <p className="error">{formErrors?.password}</p>
            </div>
            <div className="buttons">
                <button onClick={() => {
                    setClick(false);
                    setPassword(p);
                }}>
                    CANCEL
                </button>
                {
                    loading ? <Loader /> : <button onClick={handleSave}>
                    SAVE
                </button>
                }
            </div>
            </div>

        </div>
    )
}

export default PasswordForm