"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import React, { useEffect } from "react";

const Social = () => {
  const router = useRouter();
  const session = useSession();
  const handlesosial = async (provider) => {
    await signIn(provider, { redirect: false });
  };
  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [session.status, router]);
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
