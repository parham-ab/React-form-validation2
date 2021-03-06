import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
// react toastify
import { ToastContainer } from "react-toastify";
import { notify } from "../functions/toast";
// components
import ValidationError from "./ValidationError";
// img
import pic from "../assets/img/pic1.svg";
// formik settings for SignIn
const SignInInitialValues = {
  email: "",
  password: "",
};
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email Required"),
  password: Yup.string()
    .min(8, "Password must be 8 or mor chars !")
    .matches(/(?=.*[0-9])/, "Password must contain a number.")
    .required("Password Required"),
});

const LogIn = () => {
  const [userDataLogin, setUserDataLogin] = useState([]);
  const [vals, setVals] = useState([]);
  const postHandle = () => {
    axios
      .post(`https://jsonplaceholder.typicode.com/posts`, {
        userData: vals,
      })
      .then((response) => {
        setUserDataLogin(response.data);
        notify("success", "Logged In successfully !");
      })
      .catch((error) => notify("error", "Something went wrong !"));
  };

  return (
    <div className="login-container">
      <div className="svg-icon">
        <img width={"600px"} src={pic} alt="pic" />
      </div>

      <div className="container">
        <Formik
          initialValues={SignInInitialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => setUserDataLogin(values)}
        >
          {(Formik) => {
            setVals(Formik.values);
            return (
              <Form>
                <div>
                  <h1 className="title">Login</h1>
                </div>

                <div className="field-container">
                  <div>
                    <label htmlFor="email">Email</label>
                  </div>
                  <Field
                    className="customField"
                    type="email"
                    name="email"
                    id="email"
                  />
                  <ErrorMessage name="email" component={ValidationError} />
                </div>

                <div className="field-container">
                  <div>
                    <label htmlFor="password">Password</label>
                  </div>
                  <Field
                    className="customField"
                    type="password"
                    name="password"
                    id="password"
                  />
                  <ErrorMessage name="password" component={ValidationError} />
                </div>

                <button
                  className="submitBtn"
                  disabled={
                    (!Formik.isValid && Object.keys(Formik.errors).length) ||
                    Formik.values.name === "" ||
                    Formik.values.email === "" ||
                    Formik.values.password === "" ||
                    Formik.values.confirmPassword === ""
                  }
                  onClick={postHandle}
                  type="submit"
                >
                  Login
                </button>
                <div className="switch">
                  <p>
                    Dont have an account ? <Link to="/">SignUp</Link>
                  </p>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
        {/* react toastify component */}
        <ToastContainer />
    </div>
  );
};

export default LogIn;
