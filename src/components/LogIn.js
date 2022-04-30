import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="signUp-container">
      <div className="svg-icon">
        <img width={"600px"} src={pic} alt="pic" />
      </div>

      <div className="container">
        <Formik
          initialValues={SignInInitialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => setData(values)}
        >
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

            <button className="submitBtn" type="submit">
              Login
            </button>
            <div className="switch">
              <p>
                Dont have an account ? <Link to="/">SignUp</Link>
              </p>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LogIn;
