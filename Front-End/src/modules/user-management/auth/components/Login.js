import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useNavigate } from "react-router-dom";
import { FormController, Button } from "../../../../common/components";

import LoginWall from "../../../../assets/images/login_wall.webp";
import { loginValidation } from "../validate";
import { useDispatch } from "react-redux";
import { actions as commonActions } from "../../../common/slice";
import { login } from "../actions";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(commonActions.setNavigator(navigate));
  }, []);

  const {
    handleSubmit,
    control
  } = useForm({
    resolver: yupResolver(loginValidation)
  });

  const onSubmit = (data) => dispatch(login(data));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
        <div className="hidden md:flex md:w-1/2 bg-[#c8d1c5] items-center justify-center">

          <div className="text-white text-left">

            <img src={LoginWall} alt="Login-Wall" className="w-48 mx-auto mb-4" style={{ width: "100%", height: "100%" }} />
            <div className="px-3">
              <h2 className="text-2xl font-bold mb-2  text-gray-700">Welcome Back!</h2>
              <p className="text-lg  text-gray-700">Please login to your account</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-8 bg-white">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
            Account Login
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormController
              controlType="input"
              control={control}
              name="email"
              placeholder="Email"
            />
            <FormController
              controlType="input"
              control={control}
              name="password"
              type="password"
              placeholder="Password"
            />
            <div className="flex items-center mb-4">
              <Controller
                name="savePassword"
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    {...field}
                    className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                  />
                )}
              />
              <label className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="flex justify-between items-center mb-6">
              <button
                type="button"
                className="text-sm text-blue-600 hover:underline"
                onClick={() =>
                  navigate("../reset-password", { state: { from: "resetPassword" } })
                }
              >
                Forgot password?
              </button>
            </div>
            <div className="flex justify-end">
              <Button
                variant="contained-primary"
                type="submit"
              >
                Login
              </Button>
            </div>
          </form>
          <div className="flex justify-center mt-6">
            <p className="text-gray-700">Don't have an account?</p>
            <button
              type="button"
              className="text-blue-600 hover:underline ml-2"
              onClick={() =>
                navigate("../register", { state: { from: "login" } })
              }
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
