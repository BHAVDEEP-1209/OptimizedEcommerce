import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../Styles/Register.scss";
import RoleRadio from "../components/RoleRadio";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../slices/userSlice";
import { Link } from "react-router-dom";
import { notification, Space } from "antd";
import Loader from "../components/Loader";
import { validateRegister } from "../utils/utilsNew";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const intialValues = { role: "", name: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(intialValues);
  const loading = useSelector((state) => state.isLoading);
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
    setFormErrors(validateRegister(formValues));
    setIsSubmit(true);
  };

  // validates erros and calls the function when there is no error
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {

      // calling register user action
      dispatch(RegisterUser(formValues)).unwrap()
        .then((result) => {
          if (result.status == 201) {
            msg = "Success!";
            openNotificationWithIcon("success");

            setTimeout(() => {
              navigate("/login");
            }, 500);
          } else {
            msg = "Already Email Exists!";
            openNotificationWithIcon("warning");
          }
        })
        .catch((error) => {
          msg = "Error While Signing Up!";
          openNotificationWithIcon("error");
        });
    }
  }, [formErrors]);

  return (
    <div className="register">
      {contextHolder}
      <Navbar />
      <Space></Space>
      <div className="imgContainer">
        <img
          src="https://assets.burberry.com/is/image/Burberryltd/MyAccount.jpg?$BBY_V2_BASIC$&wid=1875&hei=375"
          alt=""
        />
        <span>REGISTER</span>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>ACCOUNT</h1>
          <div className="inputDetails">
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name..."
              value={formValues.name}
              onChange={handleChange}
            />
            <p className="error">{formErrors?.name}</p>
            <input
              type="text"
              name="email"
              placeholder="Enter Email/Phn Number..."
              value={formValues.email}
              onChange={handleChange}
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
            <RoleRadio state={{ formValues, setFormValues }} />
            <p className="error">{formErrors?.role}</p>
            {loading ? <Loader /> : <button type="submit">REGISTER</button>}
          </div>
          <div className="registerFooter">
            <span>Already Have An Account?</span>
            <Link to="/">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
