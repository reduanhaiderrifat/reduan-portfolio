"use client";
import { Nosifer } from "next/font/google";
import emailjs from "emailjs-com";
import React, { useState } from "react";
import { BiLogoGmail } from "react-icons/bi";
import { MdAddCall } from "react-icons/md";

import usePublic from "@/hooks/usePublic";
import { useSession } from "next-auth/react";
import Link from "next/link";
import CustomToast from "../shared/CustomToast";
import { toast } from "react-toastify";
import ErrorToast from "../shared/ErrorToast";

const nosifer = Nosifer({ weight: ["400"], subsets: ["latin"] });

const Contact = ({ section5Ref }) => {
  const [loading, setLoading] = useState(false);
  const axiosPublic = usePublic();
  const session = useSession();
  const handleMessage = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = e.target;
    const name = formData.name.value;
    const message = formData.message.value;
    const subject = formData.subject.value;
    const address = formData.address.value;

    const templateParams = {
      from_name: name,
      message: message,
    };
    const messageData = {
      name,
      message,
      subject,
      address,
      email: session.data.user.email,
    };

    emailjs
      .send(
        "service_yb391cz",
        "template_76nsuso",
        templateParams,
        "6KVq2LtJsMEpyNLyC"
      )
      .then(async () => {
        await axiosPublic.post("/api/message", messageData);

        setLoading(false);
        toast(
          <CustomToast title="Success!" message="Message successfully sent" />,
          {
            autoClose: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            className: "border-2 border-white",
            theme: "dark",
          }
        );
        formData.reset();
      })
      .catch(() => {
        setLoading(false);
        toast(<ErrorToast title="Error!" message="Message Failed to sent." />, {
          autoClose: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          className: "border-2 border-red-500 ",
          theme: "dark",
        });
      });
  };

  return (
    <div ref={section5Ref} className="p-8">
      <h2
        className={`text-4xl font-bold text-center mb-8 text-white ${nosifer.className}`}
      >
        Contact Me
      </h2>
      <div className="grid grid-cols-1 lg:flex items-start justify-between gap-8 mt-12 ">
        <div className="lg:w-1/2 text-white space-y-4">
          <h1 className="text-4xl font-bold">Let&#39;s Work Together</h1>
          <p>
            I am excited to collaborate on creating exceptional web experiences!
            Whether you need a dynamic website, a user-friendly interface, or
            innovative solutions for your digital presence, I am here to help.
            Let is bring your vision to life and achieve your goals together.
            Your success is my priority!
          </p>
          <p>
            Email:{" "}
            <a
              href="mailto:reduanhaiderrifat@gmail.com"
              className="flex items-center gap-1"
            >
              <BiLogoGmail /> reduanhaiderrifat@gmail.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a href="tel:+8801537140067" className="flex items-center gap-1">
              <MdAddCall /> 01537140067
            </a>
          </p>
        </div>

        <div className="lg:w-1/2">
          <form
            onSubmit={handleMessage}
            className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-lg text-black"
          >
            <div className="form-control">
              <label className="label-text text-white">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                defaultValue={session?.data?.user?.name}
                name="name"
                className="input input-bordered text-white bg-black/40 border border-white w-full p-2 rounded-md"
                required
              />
            </div>
            <div className="form-control">
              <label className="label-text text-white">Address</label>
              <input
                type="text"
                name="address"
                placeholder="Your Address"
                className="input input-bordered text-white bg-black/40 border border-white w-full p-2 rounded-md"
                required
              />
            </div>
            <div className="form-control">
              <label className="label-text text-white">Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject (Optional)"
                className="input input-bordered text-white bg-black/40 border border-white w-full p-2 rounded-md"
              />
            </div>
            <div className="form-control">
              <label className="label-text text-white">Message</label>
              <textarea
                placeholder="Type your message here..."
                name="message"
                className="textarea textarea-bordered text-white bg-black/40 border border-white w-full p-2 rounded-md h-32"
                required
              />
            </div>

            <div className="form-control mt-6">
              {session.data ? (
                <button
                  type="submit"
                  className="btn w-full p-2 rounded-full bg-transparent text-white"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Message"}
                </button>
              ) : (
                <Link href="/login">
                  <button
                    type="button"
                    className="btn w-full p-2 rounded-full bg-transparent text-white"
                  >
                    Login to Message
                  </button>
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
