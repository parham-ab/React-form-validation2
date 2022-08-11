// react router dom
import { Link } from "react-router-dom";
// axios
import axios from "axios";
// formik
import { useFormik } from "formik";
import * as Yup from "yup";
// react toastify
import { ToastContainer } from "react-toastify";
import { notify } from "../functions/toast";
// img
import pic from "../assets/img/pic1.svg";
// initialValues
const initialValues = {
  email: "",
  password: "",
};
// validate function
const validationSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i,
      "invalid Email address"
    )
    .required("Email Required"),
  password: Yup.string()
    .min(8, "Password must be 8 or mor chars !")
    .matches(/(?=.*[0-9])/, "Password must contain a number.")
    .required("Password Required !"),
});
// submit
const onSubmit = (values) => {
  console.log("values", values);
  axios
    .post(`https://jsonplaceholder.typicode.com/posts`, {
      userData: values,
    })
    .then((response) => {
      console.log(response.data);
      notify("success", "Logged In successfully !");
    })
    .catch((error) => notify("error", "Something went wrong !"));
};

const Login = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="login-container">
      <div className="svg-icon">
        <img width={"600px"} src={pic} alt="pic" />
      </div>

      <div className="container">
        <div>
          <h1 className="title">Login</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="field-container">
            <div>
              <label htmlFor="email">Email</label>
            </div>
            <input
              className="customField"
              type="text"
              id="email"
              name="email"
              {...formik.getFieldProps("email")}
            />
            <div>
              <span className="errorMsg">
                {formik.errors.email &&
                  formik.touched.email &&
                  formik.errors.email}
              </span>
            </div>
          </div>

          <div className="field-container">
            <div>
              <label htmlFor="password">Password</label>
            </div>
            <input
              className="customField"
              type="password"
              id="password"
              name="password"
              {...formik.getFieldProps("password")}
            />
            <div>
              <span className="errorMsg">
                {formik.errors.password &&
                  formik.touched.password &&
                  formik.errors.password}
              </span>
            </div>
          </div>

          <button className="submitBtn" type="submit">
            Submit
          </button>
          <div className="switch">
            <p>
              Dont have an account ? <Link to="/signup">SignUp</Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
