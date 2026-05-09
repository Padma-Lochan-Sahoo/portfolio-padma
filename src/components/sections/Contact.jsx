import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import ParticlesBackground from "../common/ParticlesBackground";
import { AstraImg } from "../../assets";
import { isValidEmail } from "../../utils/helpers";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

const INITIAL_FORM = { name: "", email: "", message: "" };

const InputField = ({ label, name, type = "text", value, onChange, error, ...rest }) => (
  <div className="flex flex-col">
    <label className="mb-1">
      {label} <span className="text-red-500">*</span>
    </label>
    {type === "textarea" ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        className={`p-3 rounded-md bg-white/10 border ${
          error ? "border-red-500" : "border-gray-500"
        } text-white focus:outline-none focus:border-blue-500 h-32 resize-none`}
        {...rest}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        className={`p-3 rounded-md bg-white/10 border ${
          error ? "border-red-500" : "border-gray-500"
        } text-white focus:outline-none focus:border-blue-500`}
        {...rest}
      />
    )}
    {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
  </div>
);

const Contact = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    ["name", "email", "message"].forEach((field) => {
      if (!formData[field].trim()) newErrors[field] = "This field is required";
    });
    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all required fields ❌");
      return;
    }
    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { ...formData, from_name: formData.name, reply_to: formData.email },
        PUBLIC_KEY
      );
      toast.success("Message sent successfully 🚀");
      setStatus("success");
      setFormData(INITIAL_FORM);
    } catch (err) {
      toast.error("Failed to send message ❌");
      setStatus("error");
      console.error("Email sending error:", err);
    }
  };

  return (
    <section
      id="contact"
      className="w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10"
    >
      <ParticlesBackground />

      <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-10">
        {/* Illustration */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.img
            src={AstraImg}
            alt="Contact illustration"
            className="w-72 md:w-[35rem] rounded-2xl shadow-lg object-cover"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            loading="lazy"
          />
        </motion.div>

        {/* Form */}
        <motion.div
          className="w-full md:w-1/2 bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-6">
            Let's work Together <br />
          </h2>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
            <InputField
              label="Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <InputField
              label="Your Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <InputField
              label="Your Message"
              name="message"
              type="textarea"
              value={formData.message}
              onChange={handleChange}
              error={errors.message}
            />

            <motion.button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-3 rounded-md transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
