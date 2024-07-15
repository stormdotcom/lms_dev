import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useNavigate } from "react-router-dom";
import { FormController, Button } from "../../../../common/components";

import LoginWall from "../../../../assets/images/login_wall.webp";
import { SignUpValidation } from "../validate";
import { useDispatch } from "react-redux";
import { actions as commonActions } from "../../../common/slice";
import { register } from "../actions";
const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(commonActions.setNavigator(navigate));
    }, []);
    const {
        handleSubmit,
        control
    } = useForm({
        resolver: yupResolver(SignUpValidation)
    });

    const onSubmit = (data) => dispatch(register(data));


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
                <div className="hidden md:flex md:w-1/2 bg-[#c8d1c5] items-center justify-center">

                    <div className="text-white text-left">

                        <img src={LoginWall} alt="Login-Wall" className="w-48 mx-auto mb-4" style={{ width: "100%", height: "100%" }} />

                    </div>
                </div>
                <div className="w-full md:w-1/2 p-8 bg-white">
                    <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
                        Account Register
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormController
                            controlType="input"
                            control={control}
                            name="firstName"
                            placeholder="First Name"
                        />
                        <FormController
                            controlType="input"
                            control={control}
                            name="lastName"
                            placeholder="Last Name"
                        />
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
                        <FormController
                            controlType="input"
                            control={control}
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                        />

                        <div className="flex justify-end">
                            <Button
                                variant="contained-primary"
                                type="submit"
                            >
                                Register
                            </Button>
                        </div>
                    </form>
                    <div className="flex justify-center mt-6">
                        <p className="text-gray-700">Already have an account?</p>
                        <button
                            type="button"
                            className="text-blue-600 hover:underline ml-2"
                            onClick={() =>
                                navigate("../login", { state: { from: "register" } })
                            }
                        >
                            Login
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
