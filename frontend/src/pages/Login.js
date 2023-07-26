import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../Styles/Register.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  RegisterUser,
  SignInUser,
  SignInWithGoogle,
  setAddress,
  setBusiness,
  setValue,
} from "../slices/userSlice";
import google from "../assets/google.svg";
import { Link } from "react-router-dom";
import { notification } from "antd";
import Loader from "../components/Loader";
import { validateLogin } from "../utils/utilsNew";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const intialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(intialValues);
  const loading = useSelector((state) => state.isLoading);
  const maxLen = 50;
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  ////////////////////notification
  const [api, contextHolder] = notification.useNotification();
  let msg = useState("");
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: msg,
    });
  };
  //////////////////////////

  const handleChange = (e) => {
    const { name, value } = e.target;

    //handling errors
    setFormErrors((prev) => {
      return {
        ...prev,
        [name]: "",
      };
    });

    //////////////
    const isNumber = /^[0-9]+$/.test(value);

    if (isNumber && value.length > 10) {
      setFormValues((prev) => {
        return {
          ...prev,
          email: value.slice(0, 10).trim(),
        };
      });
    } else {
      setFormValues((prev) => {
        return {
          ...prev,
          [name]: value.trim(),
        };
      });
    }
  };

  // click on register button
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validateLogin(formValues));
    setIsSubmit(true);
  };

  // validates erros and calls the function when there is no error
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(SignInUser(formValues))
        .unwrap()
        .then((result) => {
          if (result.status == 200) {
            msg = "Success!";
            openNotificationWithIcon("success");
          } else if (result.status == 204) {
            msg = "No Such Email Exists!";
            openNotificationWithIcon("warning");
          } else {
            msg = "Wrong Password!";
            openNotificationWithIcon("error");
          }
        })
        .catch((error) => {
          msg = "Something Went Wrong!";
          openNotificationWithIcon("error");
        });
    }
  }, [formErrors]);

  /// google sign in using firebase
  const handleGoogleSignIn = async () => {
    dispatch(SignInWithGoogle())
      .unwrap()
      .then((result) => {
        dispatch(RegisterUser(result))
          .unwrap()
          .then((res) => {
            
              dispatch(setValue(res));
              dispatch(setBusiness(res.data.business))
              dispatch(setAddress(res.data.address.at(0)));
              navigate("/homepage")
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        msg = "Error, Reason : User clicked outside of Pop up during login!";
        openNotificationWithIcon("error");
      });
  };

  return (
    <div className="register">
      {contextHolder}
      <Navbar />
      <div className="imgContainer">
        <img
          src="https://assets.burberry.com/is/image/Burberryltd/MyAccount.jpg?$BBY_V2_BASIC$&wid=1875&hei=375"
          alt=""
        />
        <span>SIGN IN</span>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>ACCOUNT</h1>
          <div className="inputDetails">
            <input
              type="text"
              name="email"
              placeholder="Enter Email/Phn Number.."
              value={formValues.email}
              onChange={handleChange}
              maxLength={maxLen}
            />
            <p className="error">{formErrors?.email}</p>
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password..."
              value={formValues.password}
              onChange={handleChange}
            />
            <p className="error">{formErrors?.password}</p>

            {loading ? <Loader /> : <button type="submit">SIGN IN</button>}
          </div>
          <div className="otherSignInOptions">
            <div onClick={handleGoogleSignIn}>
              <img src={google} alt="" />
              <span>Google</span>
            </div>
          </div>
          <div className="registerFooter">
            <span>Don't Have An Account?</span>
            <Link to="/register">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
