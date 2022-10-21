import React from "react";
import "./signupStyle.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userSignup } from "../../store/Reducers/SignUpReducer";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data, e) => {
    e.preventDefault();
    dispatch(userSignup(data));
  };
  const { success } = useSelector((state) => state.signup);
  if (success) {
    navigate("/signin");
  }
  return (
    <div className="log-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("username", {
            required: "Username is required",
          })}
          name="username"
          type="text"
          title="username"
          placeholder="username"
        />
        {errors.username && (
          <p className="error_message">{errors.username.message}</p>
        )}
        <input
          {...register("email", {
            required: "Email is required",
          })}
          name="email"
          type="text"
          title="email"
          placeholder="email"
        />
        {errors.email && (
          <p className="error_message">{errors.email.message}</p>
        )}
        <input
          {...register("password", {
            required: "Password is required",
          })}
          name="password"
          type="password"
          title="password"
          placeholder="password"
        />
        {errors.username && (
          <p className="error_message">{errors.password.message}</p>
        )}
        <button type="submit" className="btn">
          Sign Up
        </button>
        <a className="forgot" href="/signin">
          Already Have Account?
        </a>
      </form>
    </div>
  );
};

export default SignUp;
