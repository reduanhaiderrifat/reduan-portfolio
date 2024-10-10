"use client";

import Social from "@/components/social/Social";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import React, { useState } from "react"; // Import useState
import { toast } from "react-toastify";
import CustomToast from "@/components/shared/CustomToast";
import ErrorToast from "@/components/shared/ErrorToast";

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false); // Create loading state

  const onSubmit = async (data) => {
    const { email, password } = data;

    // Set loading to true when the login attempt starts
    setLoading(true);

    // Attempt to sign in
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    // Handle response
    if (!res || res.error) {
      // Show error notification if sign-in fails
      toast(
        <ErrorToast
          title="Error!"
          message="Login Failed Email or password not matched."
        />,
        {
          autoClose: false, // Disable auto-close
          closeOnClick: true,
          draggable: true,
          progress: undefined, // Stop the progress bar
          className: "border-2 border-red-500 ", // Add border and styling for error
          theme: "dark", // Set theme to dark
        }
      );

      setLoading(false); // Reset loading state
      return; // Stop further execution
    }

    // If sign-in is successful, redirect or show success notification
    router.push("/");
    toast(<CustomToast title="Success!" message="Login successfully" />, {
      autoClose: false, // Disable auto-close
      closeOnClick: true,
      draggable: true,
      progress: undefined, // Stop the progress bar
      className: "border-2 border-white",
      theme: "dark", // Set theme to dark
    });
  };

  return (
    <div className="hero bg-black min-h-screen">
      <div className="hero-content">
        <div className="card w-full max-w-lg border-2 border-white shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <p className="label-text text-white">Email</p>
              </label>
              <input
                type="email"
                placeholder="email"
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
                placeholder="password"
                className="input input-bordered"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-red-500">This field is required</p>
              )}{" "}
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Loading..." : "Login"}{" "}
                {/* Change button text based on loading state */}
              </button>
            </div>
          </form>
          <Social />
          <p className="text-white">
            Signup{" "}
            <Link href="/signup" className="btn-link">
              here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
