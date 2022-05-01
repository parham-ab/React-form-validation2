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
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  regulations: false,
};
const validationSchema = Yup.object({
  name: Yup.string().trim().required("Name Required !"),
  email: Yup.string().email("Invalid email").required("Email Required !"),
  password: Yup.string()
    .min(8, "Password must be 8 or mor chars !")
    .matches(/(?=.*[0-9])/, "Password must contain a number.")
    .required("Password Required !"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match !")
    .required("Confirm Password !"),
  regulations: Yup.boolean().oneOf([true], "Accept Our Regulations !"),
});

const SignUp = () => {
  const [userData, setUserData] = useState([]);
  const [vals, setVals] = useState([]);
  const postHandle = () => {
    axios
      .post(`https://jsonplaceholder.typicode.com/posts`, {
        userData: vals,
      })
      .then((response) => {
        setUserData(response.data);
        notify("success", "Signed Up successfully !");
      })
      .catch((error) => notify("error", "Something went wrong !"));
  };

  return (
    <div className="signUp-container">
      <div className="svg-icon">
        <img width={"600px"} src={pic} alt="pic" />
      </div>

      <div className="container">
        <Formik
          initialValues={SignInInitialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => setUserData(values)}
        >
          {(Formik) => {
            setVals(Formik.values);
            return (
              <Form>
                <div>
                  <h1 className="title">SignUp</h1>
                </div>

                <div className="field-container">
                  <div>
                    <label htmlFor="name">Name</label>
                  </div>
                  <Field
                    className="customField"
                    type="text"
                    name="name"
                    id="name"
                  />
                  <ErrorMessage name="name" component={ValidationError} />
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

                <div className="field-container">
                  <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                  </div>
                  <Field
                    className="customField"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                  />

                  <ErrorMessage
                    name="confirmPassword"
                    component={ValidationError}
                  />
                </div>

                <div className="field-container">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <label htmlFor="regulations">Accept privacy Policy</label>
                    </div>
                    <div>
                      <Field
                        type="checkbox"
                        name="regulations"
                        id="regulations"
                      />
                    </div>
                  </div>
                  <ErrorMessage
                    name="regulations"
                    component={ValidationError}
                  />
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
                  SignUp
                </button>
                <div className="switch">
                  <p>
                    Have an account already ? <Link to="/login">Login</Link>
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

export default SignUp;
