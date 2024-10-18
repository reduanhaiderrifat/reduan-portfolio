"use client";
import OtpInput from "react-otp-input";
import { useState } from "react";
import usePublic from "@/hooks/usePublic";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import emailjs from "emailjs-com";
import Link from "next/link";

import Social from "@/components/social/Social";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import CustomToast from "@/components/shared/CustomToast";
import ErrorToast from "@/components/shared/ErrorToast";
const SignupPage = () => {
  const axiosPublic = usePublic();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState();
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
  };

  const onSubmit = async (data) => {
    const uid = uuidv4();
    const createdAt = new Date().toISOString();
    const userData = { ...data, uid, createdAt };
    setUserDetails(userData);

    const otpCode = generateOtp();
    setGeneratedOtp(otpCode);

    const templateParams = {
      user_name: data.name,
      user_email: data.email,
      otp_code: otpCode,
    };

    try {
      await emailjs.send(
        "service_kujzdib",
        "template_29cgxqm",
        templateParams,
        "6KVq2LtJsMEpyNLyC"
      );
      console.log("OTP email sent successfully");
      setIsOtpSent(true);
    } catch (error) {
      console.error(
        "Error sending email via EmailJS:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOtp = async () => {
    setLoading(true);
    if (generatedOtp === otp) {
      try {
        const res = await axiosPublic.post("/signup/api", userDetails);
        console.log(res.data);

        setIsOtpSent(false);
        setOtp("");
        if (res.status === 200) {
          router.push("/");

          toast(<CustomToast title="Success!" message="Sigup successfully" />, {
            autoClose: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            className: "border-2 border-white",
            theme: "dark",
          });
        } else {
          toast(<ErrorToast title="Error!" message="Sigup Failed." />, {
            autoClose: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            className: "border-2 border-red-500 ",
            theme: "dark",
          });
        }
      } catch (error) {
        console.error(
          "Error during signup:",
          error.response ? error.response.data : error.message
        );
      }
    } else {
      alert("Invalid OTP! Please try again.");
    }
  };

  return (
    <div className="hero bg-black min-h-[calc(100vh-236px)]">
      <div className="hero-content ">
        <div className="card bg-transparent w-full max-w-lg border-2 border-white shrink-0 shadow-2xl">
          <form
            onSubmit={handleSubmit(isOtpSent ? handleOtp : onSubmit)}
            className="card-body"
          >
            {!isOtpSent && (
              <>
                <div className="form-control">
                  <label className="label">
                    <p className="label-text text-white">Name</p>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered text-white bg-black/40 border border-white"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <p className="text-red-500">This field is required</p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <p className="label-text text-white">Email</p>
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered text-white bg-black/40 border border-white"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <p className="text-red-500">This field is required</p>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <p className="label-text text-white">Password</p>
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered text-white bg-black/40 border border-white"
                    {...register("password", {
                      required: true,
                      minLength: 8,
                      maxLength: 20,
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
              </>
            )}

            {isOtpSent && (
              <div className="form-control">
                <label className="label">
                  <p className="label-text text-white">Enter OTP</p>
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  containerStyle
                  renderSeparator={<p>-</p>}
                  inputStyle={{
                    color: "white",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    width: "50px",
                    height: "40px",
                    textAlign: "center",
                  }}
                  renderInput={(props) => (
                    <input
                      {...props}
                      className="input input-bordered text-white bg-black/40 border border-white"
                    />
                  )}
                />
              </div>
            )}

            <div className="form-control mt-6">
              <button className="btn btn-primary">
                {loading ? "Loading..." : isOtpSent ? "Verify OTP" : "Sign Up"}
              </button>
            </div>
          </form>
          <Social />
          <p className="text-white flex justify-center my-4">
            Already hane account. Please{" "}
            <Link className="btn-link ml-1" href={"/login"}>
              login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
