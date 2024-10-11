"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import React, { useEffect } from "react";

const Social = () => {
  const router = useRouter();
  const session = useSession();
  const handlesosial = (provider) => {
    const res = signIn(provider, { redirect: false });
    console.log(res);
  };
  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/"); // Redirect to home page on successful login
    }
  }, [session.status, router]); // Dependency array includes status and router
  return (
    <div className="flex items-center gap-4 justify-center">
      <div className="">
        <button
          onClick={() => handlesosial("google")}
          className="btn bg-transparent text-white hover:bg-transparent"
        >
          <FcGoogle size={24} /> Google
        </button>
      </div>
    </div>
  );
};

export default Social;
