"use client";

import Social from "@/components/social/Social";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
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

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const { email, password } = data;

    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res || res.error) {
      toast(
        <ErrorToast
          title="Error!"
          message="Login Failed Email or password not matched."
        />,
        {
          autoClose: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          className: "border-2 border-red-500 ",
          theme: "dark",
        }
      );

      setLoading(false);
      return;
    }

    router.push("/");
    toast(<CustomToast title="Success!" message="Login successfully" />, {
      autoClose: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      className: "border-2 border-white",
      theme: "dark",
    });
  };

  return (
    <div className="hero bg-black min-h-[calc(100vh-236px)]">
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
                placeholder="password"
                className="input input-bordered text-white bg-black/40 border border-white"
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
              </button>
            </div>
          </form>
          <Social />
          <p className="text-white flex justify-center my-4">
            Do not have account click{" "}
            <Link href="/signup" className="btn-link ml-1">
              here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
