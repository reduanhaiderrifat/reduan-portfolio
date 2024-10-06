"use client";
import { Nosifer } from "next/font/google";
import emailjs from "emailjs-com"; // Import EmailJS
import React, { useState } from "react"; // Import useState hook
import { BiLogoGmail } from "react-icons/bi";
import { MdAddCall } from "react-icons/md";
import Notify from "simple-notify";
import "simple-notify/dist/simple-notify.css";
import usePublic from "@/hooks/usePublic";
import { useSession } from "next-auth/react";
import Link from "next/link";

const nosifer = Nosifer({ weight: ["400"], subsets: ["latin"] }); // Initialize the font

const Contact = () => {
  const [loading, setLoading] = useState(false); // State to track loading status
  const axiosPublic = usePublic();
  const session = useSession();
  const handleMessage = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when form is submitted
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
    // Sending email using EmailJS
    emailjs
      .send(
        "service_yb391cz", // Replace with your service ID
        "template_76nsuso", // Replace with your template ID
        templateParams,
        "6KVq2LtJsMEpyNLyC" // Replace with your user ID or public key
      )
      .then(async () => {
        await axiosPublic.post("/api/message", messageData);

        setLoading(false); // Stop loading after successful submission
        new Notify({
          title: "Email sent successfully!",
          text: "You have successfully sent the mail.",
          status: "success",
          autoclose: false,
          position: "bottom right",
          effect: "slide",
        });
        formData.reset(); // Reset form after successful submission
      })
      .catch(() => {
        setLoading(false); // Stop loading if an error occurs
        new Notify({
          title: "Mail Sent Error",
          text: "Can't send the mail.",
          status: "error",
          autoclose: false,
          position: "bottom right",
          effect: "slide",
        });
      });
  };

  return (
    <div className="p-8">
      <h2
        className={`text-4xl font-bold text-center mb-8 text-white ${nosifer.className}`}
      >
        Contact Me
      </h2>
      <div className="flex items-start justify-between gap-8 mt-14 ">
        {/* Left Section: Contact Info */}
        <div className="w-1/2 text-white space-y-4">
          <h1 className="text-4xl font-bold">Let is Work Together</h1>
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

        {/* Right Section: Contact Form */}
        <div className="w-1/2">
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
                className="input input-bordered w-full p-2 rounded-md"
                required
              />
            </div>
            <div className="form-control">
              <label className="label-text text-white">Address</label>
              <input
                type="text"
                name="address"
                placeholder="Your Address"
                className="input input-bordered w-full p-2 rounded-md"
                required
              />
            </div>
            <div className="form-control">
              <label className="label-text text-white">Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject (Optional)"
                className="input input-bordered w-full p-2 rounded-md"
              />
            </div>
            <div className="form-control">
              <label className="label-text text-white">Message</label>
              <textarea
                placeholder="Type your message here..."
                name="message"
                className="textarea textarea-bordered w-full p-2 rounded-md h-32"
                required
              />
            </div>

            <div className="form-control mt-6">
              {session.data ? (
                <button
                  type="submit"
                  className="btn w-full p-2 rounded-full bg-transparent text-white"
                  disabled={loading} // Disable button when loading
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
