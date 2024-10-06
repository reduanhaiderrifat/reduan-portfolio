"use client";
import OtpInput from "react-otp-input";
import { useState } from "react";
import usePublic from "@/hooks/usePublic";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import emailjs from "emailjs-com";
import Link from "next/link";
import Notify from "simple-notify";
import "simple-notify/dist/simple-notify.css";
import Social from "@/components/social/Social";
import { useRouter } from "next/navigation";
const SignupPage = () => {
  const axiosPublic = usePublic();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState();
  const [generatedOtp, setGeneratedOtp] = useState(""); // State to store generated OTP
  const [isOtpSent, setIsOtpSent] = useState(false); // State to track OTP input visibility
  const [otp, setOtp] = useState(""); // State to store user-entered OTP
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to generate OTP manually (6-digit OTP)
  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
  };

  // Function to handle form submission and send OTP
  const onSubmit = async (data) => {
    const uid = uuidv4(); // Generate a new UID
    const createdAt = new Date().toISOString();
    const userData = { ...data, uid, createdAt };
    setUserDetails(userData);

    // Generate OTP
    const otpCode = generateOtp(); // Custom OTP generator
    setGeneratedOtp(otpCode); // Store OTP in state

    // Email template parameters
    const templateParams = {
      user_name: data.name,
      user_email: data.email, // Make sure this matches your template variable
      otp_code: otpCode, // Ensure that the template has {{otp_code}} in it
    };

    try {
      await emailjs.send(
        "service_kujzdib", // Your service ID
        "template_29cgxqm", // Your template ID
        templateParams,
        "6KVq2LtJsMEpyNLyC" // Your public key or user ID
      );
      console.log("OTP email sent successfully");
      setIsOtpSent(true); // Show OTP input after email is sent
    } catch (error) {
      console.error(
        "Error sending email via EmailJS:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  // Function to handle OTP verification
  const handleOtp = async () => {
    setLoading(true);
    if (generatedOtp === otp) {
      try {
        // If OTP is correct, submit user details to the server
        const res = await axiosPublic.post("/signup/api", userDetails);
        console.log(res.data); // Log the response from the server

        // Clear OTP states after successful signup
        setIsOtpSent(false);
        setOtp("");
        if (res.status === 200) {
          router.push("/");
          new Notify({
            title: "Signup Successful",
            text: "You have successfully signed up.",
            status: "success",
            autoclose: false,
            position: "bottom right",
            effect: "slide",
          });
        } else {
          new Notify({
            title: "Signup Failed",
            text: "This email is already in use.",
            status: "error",
            autoclose: false,
            position: "bottom right",
            effect: "slide",
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
    <div className="hero bg-[#282828] min-h-screen">
      <div className="hero-content ">
        <div className="card bg-[#282828] w-full max-w-lg border-2 border-white shrink-0 shadow-2xl">
          <form
            onSubmit={handleSubmit(isOtpSent ? handleOtp : onSubmit)}
            className="card-body"
          >
            {/* User input fields */}
            {!isOtpSent && (
              <>
                <div className="form-control">
                  <label className="label">
                    <p className="label-text text-white">Name</p>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
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
                    className="input input-bordered"
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
                    className="input input-bordered"
                    {...register("password", {
                      required: true,
                      minLength: 8, // Adjusted to match the minimum length of the regex pattern
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

            {/* OTP input field */}
            {isOtpSent && (
              <div className="form-control">
                <label className="label">
                  <p className="label-text">Enter OTP</p>
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6} // 6 digits for the OTP
                  containerStyle
                  renderSeparator={<p>-</p>}
                  inputStyle={{
                    color: "black", // Set text color to black
                    border: "1px solid #ccc", // Optional: you can customize the border as well
                    borderRadius: "4px", // Optional: border radius
                    width: "50px", // Optional: width of each input box
                    height: "40px", // Optional: height of each input box
                    textAlign: "center", // Optional: center the text
                  }}
                  renderInput={(props) => (
                    <input {...props} className="input input-bordered " />
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
          <p className="text-white">
            Already hane account{" "}
            <Link className="btn-link" href={"/login"}>
              login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
