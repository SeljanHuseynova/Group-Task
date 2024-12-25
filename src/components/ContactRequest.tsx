import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendContactRequest } from "../redux/contactSlice";
import { AppDispatch } from "../redux/store";
import { toast } from "react-toastify";

const ContactRequest = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

 
    validateInput(name, value);
  };

  const validateInput = (name: string, value: string) => {
    let error = "";

    if (name === "name") {
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(value)) {
        error = "Name must contain only letters and spaces.";
      }
    } else if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (!emailRegex.test(value)) {
        error = "Email must be a valid Gmail address.";
      }
    } else if (name === "phoneNumber") {
      const phoneRegex = /^\+994\d{9}$/;
      if (!phoneRegex.test(value)) {
        error = "Phone number must follow the format +994XXXXXXXXX.";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Final validation before submission
    const { name, email, phoneNumber } = formData;
    validateInput("name", name);
    validateInput("email", email);
    validateInput("phoneNumber", phoneNumber);

    // Check for any validation errors
    if (errors.name || errors.email || errors.phoneNumber) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    dispatch(sendContactRequest(formData)).then(() => {
      toast.success("Your Message was sent!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });

    setFormData({
      name: "",
      email: "",
      message: "",
      phoneNumber: "",
    });
  };

  return (
    <div className="contact">
      <form onSubmit={handleSubmit}>
        <label>Your Full Name</label>
        <input
          type="text"
          name="name"
          className="name"
          onChange={handleChange}
          value={formData.name}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <label>Your Email</label>
        <input
          type="text"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Your Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          onChange={handleChange}
          value={formData.phoneNumber}
        />
        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}

        <label>Your Message</label>
        <textarea
          value={formData.message}
          name="message"
          className="message"
          onChange={handleChange}
        ></textarea>
        <button>SEND</button>
      </form>
    </div>
  );
};

export default ContactRequest;
