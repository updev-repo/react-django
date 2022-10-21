import React from "react";
import "./SigninStyle.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSignIn } from "../../store/Reducers/SignInReducer";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data, e) => {
    e.preventDefault();
    dispatch(userSignIn(data));
  };
  const { success } = useSelector((state) => state.signin);
  if (success) {
    navigate("/");
  }
  return (
    <div className="log-form">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("username", { required: "Username is required" })}
          type="text"
          title="username"
          placeholder="username"
        />
        {errors.username && (
          <p className="error_message">{errors.username.message}</p>
        )}
        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          title="password"
          placeholder="password"
        />
        {errors.password && (
          <p className="error_message">{errors.password.message}</p>
        )}
        <button type="submit" className="btn">
          Sign In
        </button>
        <a className="forgot" href="/signup">
          Not registered yet?
        </a>
      </form>
    </div>
  );
};

export default SignIn;
