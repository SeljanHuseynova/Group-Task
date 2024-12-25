import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendContactRequest } from "../redux/contactSlice";
import { AppDispatch } from "../redux/store";
import { toast } from "react-toastify";
import { IContact } from "../model";

const ContactRequest = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<IContact>({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const validate = () => {
    const newErrors = { name: "", email: "", phoneNumber: "", message: "" };
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const phoneRegex = /^\+994\d{9}$/;

    if (!formData.name || !nameRegex.test(formData.name)) {
      newErrors.name = "Name must contain only letters.";
    }
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Email must be valid.";
    }
    if (!formData.phoneNumber || !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "Phone number must be in the format +994XXXXXXXXX.";
    }
    if (!formData.message) {
      newErrors.message = "Message must be between 10 and 400 characters.";
    }

    setErrors(newErrors);
    return (
      !newErrors.name &&
      !newErrors.email &&
      !newErrors.phoneNumber &&
      !newErrors.message
    );
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    dispatch(sendContactRequest(formData))
      .then(() => {
        toast.success("Your message was sent successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          message: "",
        });
      })
      .catch((error) => {
        toast.error("Failed to send your message. Please try again.");
        console.error("Error:", error);
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
        <input
          value={formData.message}
          name="message"
          className="message"
          onChange={handleChange}
        ></input>
        {errors.message && <p className="error">{errors.message}</p>}

        <button>SEND</button>
      </form>
    </div>
  );
};

export default ContactRequest;
