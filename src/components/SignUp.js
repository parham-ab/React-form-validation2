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
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  regulations: false,
};
// validate function
const validationSchema = Yup.object({
  name: Yup.string().trim().required("Name Required !"),
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
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match !")
    .required("Confirm Password !"),
  regulations: Yup.boolean().oneOf([true], "Accept Our Regulations !"),
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
      notify("success", "Signed Up successfully !");
    })
    .catch((error) => notify("error", "Something went wrong !"));
};

const SignUp = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="signUp-container">
      <div className="svg-icon">
        <img width={"600px"} src={pic} alt="pic" />
      </div>

      <div className="container">
        <div>
          <h1 className="title">Signup</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="field-container">
            <div>
              <label htmlFor="name">Name</label>
            </div>
            <input
              className="customField"
              type="text"
              id="name"
              name="name"
              {...formik.getFieldProps("name")}
            />
            <div>
              <span className="errorMsg">
                {formik.errors.name &&
                  formik.touched.name &&
                  formik.errors.name}
              </span>
            </div>
          </div>

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

          <div className="field-container">
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
            </div>
            <input
              className="customField"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              {...formik.getFieldProps("confirmPassword")}
            />
            <div>
              <span className="errorMsg">
                {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword}
              </span>
            </div>
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
                <input
                  className="customField"
                  type="checkbox"
                  id="regulations"
                  name="regulations"
                  {...formik.getFieldProps("regulations")}
                />
              </div>
            </div>
            <span className="errorMsg">
              {formik.errors.regulations &&
                formik.touched.regulations &&
                formik.errors.regulations}
            </span>
          </div>

          <button className="submitBtn" type="submit">
            Submit
          </button>
          <div className="switch">
            <p>
              Have an account already ? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
